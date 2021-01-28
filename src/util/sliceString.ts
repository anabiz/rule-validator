export const sliceString = (inputString: string) =>{
    const indexOfDot : number = inputString.indexOf(".");
    return [inputString.slice(0,indexOfDot), inputString.slice(indexOfDot+1, inputString.length)];
}