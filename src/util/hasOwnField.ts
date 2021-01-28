
export const hasOwnField = (obj: any, field: string) =>{
    if(Array.isArray(obj)) return false;
    return obj.hasOwnProperty(field);
}