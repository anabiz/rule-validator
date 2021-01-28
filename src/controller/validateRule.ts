import { Request, Response } from "express";
import { sliceString } from "../util/sliceString";
import { checkRequiredFields } from "../util/checkRequiredFields";
import { payload } from "../types/payload";
import { checkType } from "../util/checkTypes";

export const validateRule = (req: Request, res: Response) => {

    const payload: payload = req.body;
    const fieldsValidationResult: string | boolean = checkRequiredFields(payload);
    const typesValidationResult: string[] | boolean = checkType(payload);

    if ( fieldsValidationResult === true) {
        if(typesValidationResult !== true){
            const [field, fieldType] = typesValidationResult;
            res.status(400).json({
                message: `${field} should be ${fieldType}.`,
                "status": "error",
                "data": null
            });
            return;
        }
        const field: string = payload.rule.field;
        if (field.includes(".")) {
            console.log(sliceString(field))
            const [firstField, secondField] = sliceString(field)
            console.log(firstField, secondField)
        } else {

        }

    } else {
        res.status(400).json({
            message: `${fieldsValidationResult} is required.`,
            "status": "error",
            "data": null
        });
        return;
    }
    res.status(200).json(payload);
    return;
};