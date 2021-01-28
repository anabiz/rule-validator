import { Request, Response } from "express";
import { sliceString } from "../util/sliceString";
import { checkRequiredFields } from "../util/checkRequiredFields";
// import { payload } from "../types/payload";
import { checkType } from "../util/checkTypes";
import { hasOwnField } from "../util/hasOwnField";
import { errorResponse } from "../types/errorResponse";
import { ruleEvaluator } from "../util/ruleEvaluator";
import { getResponse } from "../util/getResponse";

export const validateRule = (req: Request, res: Response) => {

    const payload = req.body;
    if (typeof payload.rule !== "object" && payload.rule) {
        errorResponse.message = `rule should be an object.`,
            res.status(400).json(errorResponse);
        return;
    }
    const fieldsValidationResult = checkRequiredFields(payload);
    if (fieldsValidationResult === true) {
        const typesValidationResult = checkType(payload);
        if (typesValidationResult !== true) {
            const [field, fieldType] = typesValidationResult;
            errorResponse.message = `${field} should be ${fieldType}.`,
                res.status(400).json(errorResponse);
            return;
        }
        const field = payload.rule.field;
        if (field.includes(".")) {
            const [firstField, secondField] = sliceString(field);
            if (!hasOwnField(payload.data, firstField)) {
                errorResponse.message = `field ${firstField} is missing from data.`;
                res.status(400).json(errorResponse);
                return;
            }
            if (!hasOwnField(payload['data'][firstField], secondField)) {
                errorResponse.message = `field ${secondField} is missing from data.`;
                res.status(400).json(errorResponse);
                return;
            }
            const value = payload['data'][firstField][secondField];
            const isSuccessful = ruleEvaluator(payload.rule.condition, payload.rule.condition_value, value);
            if (isSuccessful) {
                let result = getResponse(payload.rule.field, payload.rule.condition, "success", false, payload.rule.condition_value, payload['data'][firstField][secondField]);
                res.status(200).json(result);
                return;
            } else {
                let result = getResponse(payload.rule.field, payload.rule.condition, "error", true, payload.rule.condition_value, payload['data'][firstField][secondField]);
                res.status(400).json(result);
                return;
            }

        } else {
            const field = payload.rule.field;
            if ((typeof payload.data === 'object') && hasOwnField(payload.data, field)) {
                const value = payload['data'][field];
                const isSuccessful = ruleEvaluator(payload.rule.condition, payload.rule.condition_value, value);
                if (isSuccessful) {
                    let result = getResponse(field, payload.rule.condition, "success", false, payload.rule.condition_value, payload['data'][field]);
                    res.status(200).json(result);
                    return;
                } else {
                    let result = getResponse(field, payload.rule.condition, "error", true, payload.rule.condition_value, payload['data'][field]);
                    res.status(400).json(result);
                    return;
                }
            } else if ((typeof payload.data === 'object') && !hasOwnField(payload.data, field) && !Array.isArray(payload.data)) {
                errorResponse.message = `field ${payload.rule.field} is missing from data.`;
                res.status(400).json(errorResponse);
                return;
            } else {
                const field = payload.rule.field;
                const fieldToNumber = Number(payload.rule.field);
                if (payload.data[fieldToNumber]) {
                    if (payload.data[fieldToNumber] === payload.rule.condition_value) {
                        let result = getResponse(field, payload.rule.condition, "success", false, payload.rule.condition_value, payload['data'][field]);
                        res.status(200).json(result);
                        return;
                    } else {
                        let result = getResponse(field, payload.rule.condition, "error", true, payload.rule.condition_value, payload['data'][field]);
                        res.status(400).json(result);
                        return;
                    }
                } else {
                    errorResponse.message = `field ${field} is missing from data.`,
                        res.status(400).json(errorResponse);
                    return;
                }
            }
        }
    } else {
        errorResponse.message = `${fieldsValidationResult} is required.`,
            res.status(400).json(errorResponse);
        return;
    }
};