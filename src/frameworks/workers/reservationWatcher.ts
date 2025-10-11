import logger from "../../infrastructures/logger";
import { AvailabilityModel } from "../database/mongo/models/availability.model";
import { ReservationModel } from "../database/mongo/models/reservation.model";

export async function startReservationWatcher() {
  const changeStream = ReservationModel.watch([], {
    fullDocumentBeforeChange: "required",
  });

  changeStream.on("change", async (change) => {
    try {
      if (change.operationType === "delete") {
        const deletedDoc = change.fullDocumentBeforeChange;

        if (!deletedDoc) {
          logger.warn("No full Document Before Change for delete event");
          return;
        }

        const { _id, activityId, date, seats, status } = deletedDoc;

        if (status === "CONFIRMED") {
          logger.info(
            `Reservation ${_id} already confirmed, skipping seat restoration.`,
          );
          return;
        }

        logger.info(`Reservation expired: ${_id} for activity = ${activityId}`);

        const result = await AvailabilityModel.updateOne(
          {
            activityId,
            date,
          },
          { $inc: { availableSeats: seats } },
        );

        if (result.modifiedCount > 0) {
          logger.info(
            `seats updated for activity = ${activityId}, date = ${date}, seats = ${seats}`,
          );
        } else {
          logger.warn(
            `No availability record found activity=${activityId}, date=${date}`,
          );
        }
      }
    } catch (error) {
      logger.error(error);
    }
  });

  changeStream.on("error", (err) => {
    logger.error("Reservation watcher stream error: ", err);
    setTimeout(startReservationWatcher, 5000);
  });

  changeStream.on("end", () => {
    logger.warn("Resevation watcher stream ended, restarting.....");
    startReservationWatcher();
  });
}
