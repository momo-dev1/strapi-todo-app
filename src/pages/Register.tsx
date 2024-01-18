import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { IErrorResponse, IFormRegisterInput } from "../interfaces";
import { RegisterForm } from "../data";
import InputErrorMessage from "../components/InputErrorMessage";
import { registerSchema } from "../validation";
import { useState } from "react";
import { AxiosError } from "axios";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormRegisterInput>({
    resolver: yupResolver(registerSchema),
  });

  // *------- Handlers -------*
  const onSubmit: SubmitHandler<IFormRegisterInput> = async (data) => {
    setIsLoading(true);
    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);

      if (status === 200) {
        toast.success(
          "You will navigate to the login page after 2 seconds to login!",
          {
            position: "top-center",
            duration: 1500,
            style: {
              backgroundColor: "black",
              color: "white",
              width: "fit-content",
            },
          }
        );
      }
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;

      toast.error(`${errorObj.response?.data.error.message}`, {
        position: "top-center",
        duration: 1500,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

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

        <Button fullWidth isLoading={isLoading}>
          Register
        </Button>

        <p className="text-center text-sm text-gray-500 space-x-2">
          <span>have an account?</span>
          <Link
            to={"/login"}
            className="underline text-indigo-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
