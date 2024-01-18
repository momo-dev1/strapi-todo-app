import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { IFormInput } from "./interfaces";
import { RegisterForm } from "../data";
import InputErrorMessage from "../components/InputErrorMessage";
import { registerSchema } from "../validation";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  // *------- Handlers -------*
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  // *------- Renders -------*
  const renderRegisterForm = RegisterForm.map(
    ({ type, placeholder, name, validation }, idx) => (
      <div key={idx}>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    )
  );
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {renderRegisterForm}

        <Button fullWidth>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
