import Button from "../components/ui/Button";
// import Input from "../components/ui/Input";

const LoginPage = () => {
  // *------- Handlers -------*
  //   const onSubmit = async () => {
  //     toast.success("", {
  //       position: "top-center",
  //       duration: 1500,
  //       style: {
  //         backgroundColor: "black",
  //         color: "white",
  //         width: "fit-content",
  //       },
  //     });
  //   };
  const renderProfileForm = null;
  // *------- Renders -------*
  //   const renderProfileForm = LoginForm.map(
  //     ({ type, placeholder, name, validation }, idx) => (
  //       <div key={idx}>
  //         <Input
  //           type={type}
  //           placeholder={placeholder}
  //           {...register(name, validation)}
  //         />
  //         {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
  //       </div>
  //     )
  //   );
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Profile!</h2>
      <form className="space-y-4">{renderProfileForm}</form>
      <Button fullWidth>Edit Profile</Button>
    </div>
  );
};

export default LoginPage;
