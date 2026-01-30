import logger from "../../infrastructures/logger";
import { AvailabilityModel } from "../database/mongo/models/availability.model";
import { ReservationModel } from "../database/mongo/models/reservation.model";

export async function startReservationWatcher() {
  const availabilityStream = AvailabilityModel.watch([], {
    fullDocument: "updateLookup",
  });

  availabilityStream.on("change", (change) => {
    console.log("Availability change:", change.operationType);
    if (change.fullDocument) {
      console.log("Full doc:", change.fullDocument);
    }
  });
  const changeStream = ReservationModel.watch([], {
    fullDocumentBeforeChange: "required",
  });

  changeStream.on("change", async (change) => {
    try {
      // if (change.operationType === "delete") {
      //   const deletedDoc = change.fullDocumentBeforeChange;

      //   if (!deletedDoc) {
      //     logger.warn("No full Document Before Change for delete event");
      //     return;
      //   }

      //   const { _id, activityId, date, seats, status } = deletedDoc;

      //   if (status === "CONFIRMED") {
      //     logger.info(
      //       `Reservation ${_id} already confirmed, skipping seat restoration.`,
      //     );
      //     return;
      //   }

      //   logger.info(`Reservation expired: ${_id} for activity = ${activityId}`);

      //   const result = await AvailabilityModel.updateOne(
      //     {
      //       activityId,
      //       date,
      //     },
      //     { $inc: { availableSeats: seats } },
      //   );

      //   if (result.modifiedCount > 0) {
      //     logger.info(
      //       `seats updated for activity = ${activityId}, date = ${date}, seats = ${seats}`,
      //     );
      //   } else {
      //     logger.warn(
      //       `No availability record found activity=${activityId}, date=${date}`,
      //     );
      //   }
      // }

      if (change.operationType !== "delete") return;

      const reservation = change.fullDocumentBeforeChange;
      if (!reservation) return;

      // ❗ Only restore if PENDING
      if (reservation.status !== "PENDING") return;

      logger.info(`Reservation expired: ${reservation.activityId}`);

      const result = await AvailabilityModel.updateOne(
        {
          activityId: reservation.activityId,
          date: reservation.date,
        },
        { $inc: { availableSeats: reservation.seats } },
      );

      if (result.modifiedCount > 0) {
        logger.info(
          `Seats updated for activity = ${reservation.activityId} seats = ${reservation.seats}`,
        );
      } else {
        logger.warn(
          `No availabilty record found activity = ${reservation.activityId}`,
        );
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
