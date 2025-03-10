"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schoolAndClassProcessMiddleware = void 0;
const XLSX = __importStar(require("xlsx"));
// Middleware to process the uploaded Excel file and extract data
const schoolAndClassProcessMiddleware = (req, res, next) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }
        // Read the uploaded Excel file
        const filePath = req.file.path;
        const workbook = XLSX.readFile(filePath);
        // Get all sheet names
        const sheetNames = workbook.SheetNames;
        // Process each sheet using the second row as the header
        const allSheetData = {};
        sheetNames.forEach((sheetName) => {
            const sheet = workbook.Sheets[sheetName];
            // Adjust the range to skip the first row
            const options = { header: 1, range: 1 }; // 'range: 1' skips the first row
            const rawData = XLSX.utils.sheet_to_json(sheet, options);
            if (rawData.length > 0) {
                // Use the second row (index 0 in rawData) as the header
                const headers = rawData[0];
                const rows = rawData.slice(1);
                // Convert rows to objects based on the second row's headers
                const parsedData = rows.map((row) => {
                    const rowObject = {};
                    headers.forEach((header, index) => {
                        // Split the 'Names of classes' if it's a string (by '/' and '&')
                        if (header === "Names of classes" &&
                            typeof row[index] === "string") {
                            // Split by both '/' and '&', while trimming spaces
                            rowObject[header] = row[index]
                                .split(/\s*(?:\/|\&)\s*/)
                                .map((className) => className.trim());
                        }
                        else {
                            rowObject[header] = row[index];
                        }
                    });
                    return rowObject;
                });
                allSheetData[sheetName] = parsedData;
            }
            else {
                allSheetData[sheetName] = [];
            }
        });
        // Add the processed data to the request object for further use in the next middleware or route
        req.processedData = allSheetData;
        req.sheetNames = sheetNames;
        // Call the next middleware or route handler
        next();
    }
    catch (error) {
        console.error("Error processing file:", error);
        res.status(500).send("Error processing file.");
    }
};
exports.schoolAndClassProcessMiddleware = schoolAndClassProcessMiddleware;
