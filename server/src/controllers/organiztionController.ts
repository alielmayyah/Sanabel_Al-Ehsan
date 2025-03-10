import { Request, Response } from "express";
import Organization from "../models/oraganization.model";

const createOrganiztionByExcel = async (req: Request, res: Response) => {
  const schoolNames = req.sheetNames;
  if (!schoolNames) {
    return res.status(401).json({ data: "not found names" });
  }
  for (let names of schoolNames) {
    const scholl_exsit = await Organization.findOne({
      where: { name: names.trim() },
    });
    if (scholl_exsit) {
      continue;
    } else {
      await Organization.create({ name: names.trim() });
    }
  }
  return res.status(200).json({ data: "the data added successfully" });
};
export { createOrganiztionByExcel };
