import crypto from "crypto";

export default function generateOTP(length = 6): string {
  return crypto.randomInt(100000, 999999).toString();
}
