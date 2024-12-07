import { NextFunction, Request, Response } from "express";

import { JWTTokenGenerator } from "@/application/utils/authUtils";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  const jWTTokenGenerator = new JWTTokenGenerator();

  if (!token) {
    res.status(401).json({ message: "Unauthorized - No token provided" });
    return;
  }

  try {
    const decoded = jWTTokenGenerator.verifyToken(token);
    req.userId = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};
