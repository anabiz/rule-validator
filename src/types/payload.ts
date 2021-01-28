export interface rule {
    field: string,
    condition: string,
    condition_value: number  
}

// interface data {

// }

export interface payload {
    rule: rule,
    data: any 
}