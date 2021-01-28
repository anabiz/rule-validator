import { Request, Response } from "express";
import { sliceString } from "../util/sliceString";
import { checkRequiredFields } from "../util/checkRequiredFields";
import { payload } from "../types/payload";
import { checkType } from "../util/checkTypes";
import { hasOwnField } from "../util/hasOwnField";
import { errorResponse } from "../types/errorResponse";
import { ruleEvaluator } from "../util/ruleEvaluator";

export const validateRule = (req: Request, res: Response) => {

    const payload: payload = req.body;
    if (typeof payload.rule !== "object" && payload.rule) {
        errorResponse.message = `rule should be an object.`,
            res.status(400).json(errorResponse);
        return;
    }
    const fieldsValidationResult: string | boolean = checkRequiredFields(payload);
    if (fieldsValidationResult === true) {
        const typesValidationResult: string[] | boolean = checkType(payload);
        if (typesValidationResult !== true) {
            const [field, fieldType] = typesValidationResult;
            errorResponse.message = `${field} should be ${fieldType}.`,
            res.status(400).json(errorResponse);
            return;
        }
        const field: string = payload.rule.field;
        if (field.includes(".")) {
            const [firstField, secondField] = sliceString(field);
            const value: number = payload.data[firstField][secondField];
            console.log(value)
            const isSuccessful: boolean = ruleEvaluator(payload.rule.condition, payload.rule.condition_value, value);
            if(isSuccessful){
                res.status(200).json({message:"success"});
                return;
            }else{
                res.status(400).json({message:"failed"});
                return;
            }
            
        } else {
            console.log(hasOwnField(payload.data, payload.rule.field))
            if ((typeof payload.data === 'object') && hasOwnField(payload.data, payload.rule.field)) {

            } else if(payload.data.isArray()){
                //if()
                errorResponse.message = `field ${payload.rule.field} is missing from data.`,
                    res.status(400).json(errorResponse);
                return;
            }
        }
    } else {
        errorResponse.message = `${fieldsValidationResult} is required.`,
            res.status(400).json(errorResponse);
        return;
    }
    res.status(200).json(payload);
    return;
};