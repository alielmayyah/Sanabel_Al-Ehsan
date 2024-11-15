import {
  studentData,
  updateData,
  updatePassword,
  deleteData,
} from "../controllers/studentController";
import { authenticateToken } from "../middleware/auth";
const router = require("express").Router();
router.get("/data", authenticateToken, studentData);
router.put("/update", authenticateToken, updateData);
router.put("/update-password", authenticateToken, updatePassword);
router.delete("/delete", authenticateToken, deleteData);

module.exports = router;
