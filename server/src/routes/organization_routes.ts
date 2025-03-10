import multer from "multer";
import { schoolAndClassProcessMiddleware } from "../middleware/processExcelfile";
import { createOrganiztionByExcel } from "../controllers/organiztionController";

const router = require("express").Router();
const upload = multer({ dest: "uploads/" });
router.post(
  "/create",
  upload.single("file"),
  schoolAndClassProcessMiddleware,
  createOrganiztionByExcel
);

module.exports = router;
