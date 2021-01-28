import { response } from "../types/response";

export const getResponse =(field:string,condition:string,status:string,isError:boolean,conditionValue:number,fieldValue:number )=>{
    response.message = isError ?  `field ${field} failed validation.` : `field ${field} successfully validated.`;
    response.data.validation.condition = condition;
    response.data.validation.field = field;
    response.status = status;
    response.data.validation.error = isError;
    response.data.validation.condition_value = conditionValue;
    response.data.validation.field_value = fieldValue;
    return response;
}