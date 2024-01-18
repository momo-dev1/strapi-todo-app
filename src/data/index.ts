import { IRegisterInput,ILoginInput } from "../interfaces"

export const RegisterForm: IRegisterInput[] = [
    {
        name: "username",
        type: "text",
        placeholder: "Username",
        validation: {
            required: true,
            minLength: 5,
        }
    },
    {
        name: "email",
        type: "email",
        placeholder: "Email address",
        validation: {
            required: true,
            pattern: /^[\w-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/
        }
    },

    {
        name: "password",
        type: "password",
        placeholder: "Password",
        validation: {
            required: true,
            minLength: 6,
        }
    },
]

export const LoginForm: ILoginInput[] = [
    {
      name: "identifier",
      placeholder: "Email address",
      type: "email",
      validation: {
        required: true,
        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
      },
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      validation: {
        required: true,
        minLength: 6,
      },
    },
  ];