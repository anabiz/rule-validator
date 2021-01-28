
interface response {
    message: string,
    status: string,
    data: {
        validation: validation
    }
}

interface validation {
    error: boolean,
    field: string,
    field_value: number,
    condition: string,
    condition_value: number
}

export const response: response = {
    message: "",
    status: "success",
    data: {
        validation: {
            error: false,
            field: "",
            field_value: 0,
            condition: "",
            condition_value: 0
        }
    }
}