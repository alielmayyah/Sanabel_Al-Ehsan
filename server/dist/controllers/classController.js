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
exports.createClassByExcel = void 0;
const oraganization_model_1 = __importDefault(require("../models/oraganization.model"));
const class_model_1 = __importDefault(require("../models/class.model"));
const createClassByExcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const processedData = req.processedData; // Assuming processed data is available in req
        // Iterate over each school in the processed data
        for (const schoolName in processedData) {
            if (processedData.hasOwnProperty(schoolName)) {
                const schoolData = processedData[schoolName];
                // Check if the organization (school) exists or create it
                let organization = yield oraganization_model_1.default.findOne({
                    where: { name: schoolName },
                });
                // If organization doesn't exist, create it
                if (!organization) {
                    organization = yield oraganization_model_1.default.create({
                        name: schoolName,
                    });
                }
                // Now, for each category of the school, we need to create classes
                for (const categoryData of schoolData) {
                    const category = categoryData["Category "];
                    const classNames = categoryData["Names of classes"];
                    // Check if classNames is an array before proceeding
                    if (Array.isArray(classNames)) {
                        for (const className of classNames) {
                            // Validate that className is not null or empty
                            if (!className) {
                                console.warn(`Skipping class due to empty name in category "${category}"`);
                                continue;
                            }
                            // Check if a class with the same name, category, and organization already exists
                            const existingClass = yield class_model_1.default.findOne({
                                where: {
                                    classname: className,
                                    category,
                                    organizationId: organization.id,
                                },
                            });
                            if (existingClass) {
                                console.log(`Class "${className}" in category "${category}" for organization "${schoolName}" already exists. Skipping.`);
                                continue; // Skip creating this class if it already exists
                            }
                            try {
                                yield class_model_1.default.create({
                                    classname: className, // Ensures className is passed properly
                                    classdescrption: "Description not provided",
                                    category,
                                    organizationId: organization.id,
                                });
                            }
                            catch (err) {
                                console.error(`Error creating class ${className}:`, err);
                            }
                        }
                    }
                    else {
                        console.warn(`Expected classNames to be an array, but got: ${classNames}`);
                    }
                }
            }
        }
        return res.status(200).json({ message: "Classes created successfully!" });
    }
    catch (error) {
        console.error("Error creating classes:", error);
        return res.status(500).json({ message: "Error creating classes.", error });
    }
});
exports.createClassByExcel = createClassByExcel;
