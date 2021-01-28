import { Request, Response } from "express";
import { personalInfo } from "../types/personalInfo";

export const myData = (_req: Request, res: Response) => {
 
    res.status(200).json({
        message: "My Rule-Validation API",
        status: "success",
        data: personalInfo
    });
    return;
};
