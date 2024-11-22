"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const processExcelfile_1 = require("../middleware/processExcelfile");
const classController_1 = require("../controllers/classController");
const router = require("express").Router();
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.post("/create", upload.single("file"), processExcelfile_1.schoolAndClassProcessMiddleware, classController_1.createClassByExcel);
module.exports = router;