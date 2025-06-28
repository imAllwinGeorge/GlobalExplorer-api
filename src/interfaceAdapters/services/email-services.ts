import { injectable } from "tsyringe";
import { IEmailSevicesInterface } from "../../entities/serviceInterfaces/email-services.interface";
import { sendMail } from "../../infrastructures/mailer/mailService";

@injectable()
export class EmailServices implements IEmailSevicesInterface {
  constructor() {}

  async sendOtp(email: string, subject: string, text: string) {
    sendMail(email, subject, text);
  }
}
