"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateOTP;
const crypto_1 = __importDefault(require("crypto"));
function generateOTP(length = 4) {
    return crypto_1.default.randomInt(1000, 9999).toString();
}
