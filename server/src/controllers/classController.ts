import { Request, Response } from "express";
import Organization from "../models/oraganization.model";
import Class from "../models/class.model";

const createClassByExcel = async (req: Request, res: Response) => {
  try {
    const processedData = req.processedData; // Assuming processed data is available in req

    // Iterate over each school in the processed data
    for (const schoolName in processedData) {
      if (processedData.hasOwnProperty(schoolName)) {
        const schoolData = processedData[schoolName];

        // Check if the organization (school) exists or create it
        let organization = await Organization.findOne({
          where: { name: schoolName },
        });

        // If organization doesn't exist, create it
        if (!organization) {
          organization = await Organization.create({
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
                console.warn(
                  `Skipping class due to empty name in category "${category}"`
                );
                continue;
              }

              // Check if a class with the same name, category, and organization already exists
              const existingClass = await Class.findOne({
                where: {
                  classname: className,
                  category,
                  organizationId: organization.id,
                },
              });

              if (existingClass) {
                console.log(
                  `Class "${className}" in category "${category}" for organization "${schoolName}" already exists. Skipping.`
                );
                continue; // Skip creating this class if it already exists
              }

              try {
                await Class.create({
                  classname: className, // Ensures className is passed properly
                  classdescrption: "Description not provided",
                  category,
                  organizationId: organization.id,
                });
              } catch (err) {
                console.error(`Error creating class ${className}:`, err);
              }
            }
          } else {
            console.warn(
              `Expected classNames to be an array, but got: ${classNames}`
            );
          }
        }
      }
    }

    return res.status(200).json({ message: "Classes created successfully!" });
  } catch (error) {
    console.error("Error creating classes:", error);
    return res.status(500).json({ message: "Error creating classes.", error });
  }
};

export { createClassByExcel };
