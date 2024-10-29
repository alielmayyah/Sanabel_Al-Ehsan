import crypto from "crypto";

<<<<<<< HEAD
export default function generateOTP(): string {
=======
export default function generateOTP(length = 4): string {
>>>>>>> 01f795ad2b8e7fa742c22cde3d42a150fb75c29c
  return crypto.randomInt(1000, 9999).toString();
}
