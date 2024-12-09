import { PasswordHash } from "../interfaces/utils/passwordHash";
import bcrypt from "bcrypt";

export class BcryptPassword implements PasswordHash {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
