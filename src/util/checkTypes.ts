import { payload, rule } from "../types/payload"

export const checkType = (payload: payload ) =>{
    const rule: rule = payload.rule;
    const isFieldType = (typeof rule.field === "string") ? true : false;
    const isConditionType = (typeof rule.condition === "string") ? true : false;
    const isConditionValueType = (typeof rule.condition_value === "number" || typeof rule.condition_value === "string") ? true : false;
    if(!isFieldType){
        return ["field","a string"];
    }else if(!isConditionType){
        return ["condition","a string"];
    }else if(!isConditionValueType){
        return ["condition_value","a number"];
    }
    return true;
}