import { injectable } from "tsyringe";
import { IBcrypt } from "../../entities/security/bcrypt.interface";
import bcrypt from "bcrypt";

@injectable()
export class PasswordBcrypt implements IBcrypt {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async compare(current: string, original: string): Promise<boolean> {
    return await bcrypt.compare(current, original);
  }
}
