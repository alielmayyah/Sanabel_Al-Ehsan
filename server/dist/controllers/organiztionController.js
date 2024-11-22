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
exports.createOrganiztionByExcel = void 0;
const oraganization_model_1 = __importDefault(require("../models/oraganization.model"));
const createOrganiztionByExcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schoolNames = req.sheetNames;
    if (!schoolNames) {
        return res.status(401).json({ data: "not found names" });
    }
    for (let names of schoolNames) {
        const scholl_exsit = yield oraganization_model_1.default.findOne({ where: { name: names } });
        if (scholl_exsit) {
            continue;
        }
        else {
            yield oraganization_model_1.default.create({ name: names });
        }
    }
    return res.status(200).json({ data: "the data added successfully" });
});
exports.createOrganiztionByExcel = createOrganiztionByExcel;
