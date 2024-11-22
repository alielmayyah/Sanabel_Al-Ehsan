"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.updatePassword = exports.updateData = exports.studentData = void 0;
const student_model_1 = __importDefault(require("../models/student.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const studentData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "User data not found in request" });
    }
    try {
        const student = yield student_model_1.default.findOne({
            where: { userId: user.id },
            include: [
                {
                    model: user_model_1.default,
                    as: "user", // use the alias defined in the association
                    attributes: ["firstName", "lastName", "email"],
                },
            ],
        });
        res.status(200).json({ data: student });
    }
    catch (error) {
        console.error("Error fetching student data:", error);
        res.status(500).json({ message: "Error fetching student data" });
    }
});
exports.studentData = studentData;
const updateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { firstName, lastName, grade } = req.body;
    if (!user) {
        return res.status(401).json({ message: "User data not found in request" });
    }
    const student = yield student_model_1.default.findOne({ where: { userId: user.id } });
    const userRecord = yield user_model_1.default.findOne({ where: { id: user.id } });
    if (!student || !userRecord) {
        return res.status(404).json({ message: "User or Student not found" });
    }
    yield userRecord.update({ firstName, lastName });
    yield student.update({ grade });
    res
        .status(200)
        .json({ message: "User and Student data updated successfully" });
});
exports.updateData = updateData;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "User data not found in request" });
    }
    const userRecord = yield user_model_1.default.findOne({ where: { id: user.id } });
    if (!userRecord) {
        return res.status(404).json({ message: "User data not found in request" });
    }
    const { old_password, new_password } = req.body;
    if (!bcryptjs_1.default.compareSync(old_password, userRecord.password)) {
        return res.status(401).json({ message: "Incorrect current password" });
    }
    const hashedPassword = bcryptjs_1.default.hashSync(new_password, 10);
    yield userRecord.update({ password: hashedPassword });
    return res.status(200).json({ message: "Password updated successfully" });
});
exports.updatePassword = updatePassword;
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "User data not found in request" });
    }
    const student = yield student_model_1.default.findOne({ where: { userId: user.id } });
    const userRecord = yield user_model_1.default.findOne({ where: { id: user.id } });
    if (!student || !userRecord) {
        return res.status(404).json({ message: "User or Student not found" });
    }
    // Delete student first, then delete user
    yield student.destroy();
    yield userRecord.destroy();
    res
        .status(200)
        .json({ message: "User and Student data deleted successfully" });
});
exports.deleteData = deleteData;
