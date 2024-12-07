import { IUserWithId } from "@/domain/entities/User";
import { TokenGenerator } from "../interfaces/utils/tokenGenerator";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export class JWTTokenGenerator implements TokenGenerator {
  generateToken(user: IUserWithId): string {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
  }

  verifyToken(token: string): string {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    return verified.id;
  }
}
