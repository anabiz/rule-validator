import { Request, Response } from "express";
import { sliceString } from "../util/sliceString";
import { checkRequiredFields } from "../util/checkRequiredFields"

export const validateRule = (req: Request, res: Response) => {

    const payload: any = req.body;
    const fieldsValidationResult: String | boolean = checkRequiredFields(payload) 

    if ( fieldsValidationResult === true) {
        const field: string = payload.rule.field;
        if (field.includes(".")) {
            console.log(sliceString(field))
            const [firstField, secondField] = sliceString(field)
            console.log(firstField, secondField)
        } else {

        }

    } else {
        res.status(200).json({
            message: `${fieldsValidationResult} is required.`,
            "status": "error",
            "data": null
        });
        return;
    }

    res.status(200).json(payload);
    return;
};