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
const usermodel_1 = __importDefault(require("../model/usermodel"));
const jwt = require("jsonwebtoken");
const JWT_SECRET = "4162d909646608c545e3cd92ddc47b3756b3bfe3e1983339feab7fe69221f244";
const create_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const new_data = yield usermodel_1.default.create({
            email: email,
            password: password,
        });
        const token = jwt.sign({ id: new_data.id, email: new_data.email, role: new_data.role }, JWT_SECRET, { expiresIn: "1h" });
        new_data.token = token;
        yield new_data.save();
        return res.json({ user: new_data, token });
    }
    catch (error) {
        res.status(500).json({ status: 500, data: "the account is used before" });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const account = yield usermodel_1.default.findOne({
        where: { email: email },
    });
    if (account) {
        if (account.password == password) {
            res.status(200).json({ status: 200, data: account });
        }
        else {
            res.status(401).json({ status: 401, data: "the password is incorrect " });
        }
    }
    else {
        res.status(401).json({ status: 401, data: "the account is incorrect " });
    }
});
module.exports = { create_user, login };
