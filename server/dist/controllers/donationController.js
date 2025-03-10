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
exports.uploadReceipt = exports.createDonation = void 0;
const donation_model_1 = __importDefault(require("../models/donation.model"));
const googleDriveConfig_1 = __importDefault(require("../config/googleDriveConfig"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
// Set up multer for file uploads
const upload = (0, multer_1.default)({ dest: "uploads/" }); // Temporary storage
// Function to create a donation
const createDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
            const filePath = req.file.path; // Path to the uploaded file
            const fileMetadata = {
                name: req.file.originalname,
                mimeType: req.file.mimetype,
            };
            const media = {
                mimeType: req.file.mimetype,
                body: fs_1.default.createReadStream(filePath),
            };
            // Upload file to Google Drive
            const fileResponse = yield googleDriveConfig_1.default.files.create({
                media: media,
                fields: "id",
            });
            const fileId = fileResponse.data.id;
            // Create a donation entry in the database
            const donation = yield donation_model_1.default.create({
                amount: req.body.amount,
                studentId: req.body.studentId,
                receiptImage: `https://drive.google.com/uc?id=${fileId}`, // Generate a public URL
            });
            // Clean up temporary file
            fs_1.default.unlinkSync(filePath);
            res.status(201).json(donation);
        }
    }
    catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Failed to upload image" });
    }
});
exports.createDonation = createDonation;
// Export multer middleware
exports.uploadReceipt = upload.single("receiptImage");
