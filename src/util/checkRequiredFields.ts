export const checkRequiredFields = (payload : any)=>{

    const hasDataField: boolean = payload.data ? true : false;
    const hasRuleField: boolean = payload.rule ? true : false;
    if(!hasDataField){
        return "data";
    }else if(!hasRuleField){
        return "rule";
    }
    if(hasRuleField){
        const ruleHasCondition: boolean = payload.rule.condition ? true : false;
        const ruleHasConditionValue: boolean = payload.rule.condition_value ? true : false;
        const ruleHasfield: boolean = payload.rule.field ? true : false;
        if(!ruleHasCondition){
            return "condition";
        }else if(!ruleHasConditionValue){
            return "condition_value"
        }else if(!ruleHasfield){
            return "field"
        }
    }
    return true;
}