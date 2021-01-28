
export const ruleEvaluator = (condition: string, conditionValue: number, dataFileValue: number) =>{
    switch(condition){
        case "eq":
            return conditionValue === dataFileValue;
        case "neq":
            return conditionValue !== dataFileValue;
        case "gt" :
            return  dataFileValue > conditionValue;
        case "gte" : 
            console.log("hhhhhh")
            return  dataFileValue >= conditionValue;
        default :
           return false;          
    }
}