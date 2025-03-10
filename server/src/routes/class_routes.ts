import multer from "multer";
import { schoolAndClassProcessMiddleware } from "../middleware/processExcelfile";
import { createClassByExcel } from "../controllers/classController";

const router = require("express").Router();
const upload = multer({ dest: "uploads/" });
router.post(
  "/create",
  upload.single("file"),
  schoolAndClassProcessMiddleware,
  createClassByExcel
);

module.exports = router;
