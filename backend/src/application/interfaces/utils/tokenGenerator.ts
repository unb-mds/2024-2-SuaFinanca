import { IUserWithId } from "@/domain/entities/User";

export interface TokenGenerator {
  generateToken(user: IUserWithId): string;
  verifyToken(token: string): string;
}
