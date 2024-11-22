import {
  studentData,
  updateData,
  updatePassword,
  deleteData,
  appearTaskes,
  appearChallanges,
} from "../controllers/studentController";
import { authenticateToken } from "../middleware/auth";
import { checkstudent } from "../middleware/checkrole";
const router = require("express").Router();
router.get("/data", authenticateToken, checkstudent, studentData);
router.get("/student-task", authenticateToken, checkstudent, appearTaskes);
router.get(
  "/student-challenge",
  authenticateToken,
  checkstudent,
  appearChallanges
);

router.put("/update", authenticateToken, checkstudent, updateData);
router.put("/update-password", authenticateToken, checkstudent, updatePassword);
router.delete("/delete", authenticateToken, checkstudent, deleteData);

module.exports = router;
