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
export interface ILoginInput {
    name: "identifier" | "password",
    type: string,
    placeholder: string,
    validation: {
        required?: boolean,
        minLength?: number,
        pattern?: RegExp
    }
}

export interface IFormRegisterInput {
    username: string;
    email: string;
    password: string;
}

export interface IFormLoginInput {
    identifier: string;
    password: string;
}

export interface IErrorResponse {
    error: {
        // details?: {
        //   errors: {
        //     message: string;
        //   }[];
        // };
        message?: string;
    };
}

export interface ITodo {
    id: number;
    title: string;
    description?: string;
}