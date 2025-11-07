import QRCode from "qrcode";
import { IQrServices } from "../../entities/serviceInterfaces/qr-service.interface";
import { injectable } from "tsyringe";

@injectable()
export class QrServices implements IQrServices {
  constructor() {}
  async qrGenerate(data: string): Promise<string> {
    return QRCode.toDataURL(data);
  }
}
