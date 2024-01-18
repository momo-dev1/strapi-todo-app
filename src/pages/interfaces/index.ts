export interface IRegisterInput {
    name: "email" | "password" | "username",
    type: string,
    placeholder: string,
    validation: {
        required?: boolean,
        minLength?: number,
        pattern?: RegExp
    }
}

export interface IFormInput {
    username: string;
    email: string;
    password: string;
}