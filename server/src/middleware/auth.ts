import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: 401, message: "Token required" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not set in environment variables.");
    return res
      .status(500)
      .json({ status: 500, message: "Server configuration error" });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ status: 403, message: "Token is invalid" });
    }
    req.user = user as JwtPayload; // Attach the user payload to the request
    next();
  });
};

export { authenticateToken };
