import { Request, Response, NextFunction } from "express";
import * as XLSX from "xlsx";
declare global {
  namespace Express {
    interface Request {
      processedData?: Record<string, any>;
      sheetNames?: string[];
    }
  }
}
// Middleware to process the uploaded Excel file and extract data
const schoolAndClassProcessMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    const allSheetData: Record<string, any[]> = {};
    sheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];

      // Adjust the range to skip the first row
      const options = { header: 1, range: 1 }; // 'range: 1' skips the first row
      const rawData = XLSX.utils.sheet_to_json(sheet, options);

      if (rawData.length > 0) {
        // Use the second row (index 0 in rawData) as the header
        const headers = rawData[0] as string[];
        const rows = rawData.slice(1);

        // Convert rows to objects based on the second row's headers
        const parsedData = rows.map((row: any) => {
          const rowObject: Record<string, any> = {};
          headers.forEach((header, index) => {
            // Split the 'Names of classes' if it's a string (by '/' and '&')
            if (
              header === "Names of classes" &&
              typeof row[index] === "string"
            ) {
              // Split by both '/' and '&', while trimming spaces
              rowObject[header] = row[index]
                .split(/\s*(?:\/|\&)\s*/)
                .map((className: any) => className.trim());
            } else {
              rowObject[header] = row[index];
            }
          });
          return rowObject;
        });

        allSheetData[sheetName] = parsedData;
      } else {
        allSheetData[sheetName] = [];
      }
    });

    // Add the processed data to the request object for further use in the next middleware or route
    req.processedData = allSheetData;
    req.sheetNames = sheetNames;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("Error processing file.");
  }
};

export { schoolAndClassProcessMiddleware };
