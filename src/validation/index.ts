import * as yup from "yup"


export const registerSchema = yup
    .object({
        username: yup.string().min(5, "Username must be at least 5 characters").required(),
        email: yup.string().matches(/^[\w-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/, 'Invalid email format').required(),
        password: yup.string().min(6, "Password must be at least 6 characters").required(),
    })
    .required()