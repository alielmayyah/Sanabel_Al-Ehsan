import crypto from "crypto";

export default function generateOTP(): string {
  return crypto.randomInt(1000, 9999).toString();
}
