import { Response, Request } from "express";
import { authenticateToken } from "../middleware/auth";
import { checkTeacher } from "../middleware/checkrole";
import { appearStudent } from "../controllers/teacherController";

const router = require("express").Router();

router.get("/appear-student", authenticateToken, checkTeacher, appearStudent);

module.exports = router;
