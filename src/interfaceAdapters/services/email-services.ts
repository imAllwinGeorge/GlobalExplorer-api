import { injectable } from "tsyringe";
import { IEmailSevices } from "../../entities/serviceInterfaces/email-services.interface";
import { sendMail } from "../../infrastructures/mailer/mailService";

@injectable()
export class EmailServices implements IEmailSevices {
  constructor() {}

  async sendOtp(email: string, subject: string, text: string) {
    sendMail(email, subject, text);
  }
}
