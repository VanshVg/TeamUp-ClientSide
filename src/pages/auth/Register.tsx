import { ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import register from "../../schemas/register";
import axios from "axios";
import Cookies from "universal-cookie";

export interface customErrorInterface {
  type: string;
  message: string;
}

const Register = () => {
  const data = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [password, setPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<customErrorInterface>({
    type: "",
    message: "",
  });
  const [activation, setActivation] = useState<string>("");

  const togglePassword = (): void => {
    setPassword(!password);
  };

  const toggleConfirmPassword = (): void => {
    setConfirmPassword(!confirmPassword);
  };

  const cookies: Cookies = new Cookies();

  const { values, errors, handleBlur, handleChange, touched, submitForm } =
    useFormik({
      initialValues: data,
      validationSchema: register,
      onSubmit: (values) => {
        axios
          .post(`http://localhost:4000/auth/register`, values)
          .then((response) => {
            const { data } = response;
            if (data.success) {
              cookies.set("token", data.token, { path: "/" });
              setActivation(data.verification_token);
            }
          })
          .catch((error) => {
            const { data } = error.response;
            if (data.type === "username") {
              setRegisterError({ type: "username", message: data.message });
            } else if (data.type === "email") {
              setRegisterError({ type: "email", message: data.message });
            } else if (data.type === "server") {
              setRegisterError({ type: "server", message: data.message });
            } else if (data.type === "payload") {
              setRegisterError({ type: "payload", message: data.message });
            }
          });
      },
    });

  const handleSubmit = (): void => {
    submitForm();
  };

  const handleInputChange = (e: ChangeEvent): void => {
    setRegisterError({ type: "", message: "" });
    handleChange(e);
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="flex register-container max-w-[1440px] mx-auto justify-center">
        <div className="flex shadow-[2px_2px_2px_2px_grey] mt-[5%] p-[10px] rounded-[0.438rem]">
          <div className="w-[50%]">
            <img
              src="/background/register_bg.jpeg"
              alt="Register"
              className="h-[500px] w-full"
            ></img>
          </div>
          <div className="w-[1px] h-[95%] bg-orange my-auto"></div>
          <div className="w-[60%]">
            <div>
              <h1 className="text-blue text-[40px] text-center font-bold mx-auto mt-[10px]">
                Join, Team Up
              </h1>
            </div>
            <div>
              <form autoComplete="off">
                <div className="flex mx-auto max-w-[77%] gap-[6%] mt-[20px]">
                  <div className="w-[48%]">
                    <div className="relative">
                      <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        className="block px-2.5 pb-2.5 pt-4 h-[40px] w-[100%] text-sm text-blue text-[40px] bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                        placeholder=""
                        autoComplete="off"
                        value={values.firstName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                      <label
                        htmlFor="first-name"
                        className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                      >
                        First Name
                      </label>
                    </div>
                    {errors.firstName && touched.firstName ? (
                      <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                        {errors.firstName}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="w-[48%]">
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="last-name"
                        name="lastName"
                        className="block px-2.5 pb-2.5 pt-4 h-[40px] w-full text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                        placeholder=""
                        autoComplete="off"
                        value={values.lastName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                      <label
                        htmlFor="last-name"
                        className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                      >
                        Last Name
                      </label>
                    </div>
                    {errors.lastName && touched.lastName ? (
                      <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                        {errors.lastName}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="mt-[20px] max-w-[77%] mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                      placeholder=""
                      autoComplete="off"
                      value={values.username}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    <label
                      htmlFor="username"
                      className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                    >
                      Username
                    </label>
                  </div>
                  {(errors.username && touched.username) ||
                  registerError.type === "username" ? (
                    <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                      {errors.username || registerError.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mt-[20px] max-w-[77%] mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                      placeholder=""
                      autoComplete="off"
                      value={values.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                    >
                      Email Address
                    </label>
                  </div>
                  {(errors.email && touched.email) ||
                  registerError.type === "email" ? (
                    <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                      {errors.email || registerError.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mt-[20px] max-w-[77%] mx-auto">
                  <div className="flex">
                    <div className="relative w-full">
                      <input
                        type={password ? "text" : "password"}
                        id="password"
                        name="password"
                        className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                        placeholder=""
                        autoComplete="off"
                        value={values.password}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                      <label
                        htmlFor="password"
                        className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                      >
                        Password
                      </label>
                    </div>
                    {password ? (
                      <img
                        src="/icons/eye-show.svg"
                        className="-ml-[30px] z-10 cursor-pointer"
                        onClick={togglePassword}
                        alt=""
                      ></img>
                    ) : (
                      <img
                        src="/icons/eye-hidden.svg"
                        className="-ml-[30px] z-10 cursor-pointer"
                        onClick={togglePassword}
                        alt=""
                      ></img>
                    )}
                  </div>
                  {errors.password && touched.password ? (
                    <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                      {errors.password}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mt-[20px] max-w-[77%] mx-auto">
                  <div className="flex">
                    <div className="relative w-full">
                      <input
                        type={confirmPassword ? "text" : "password"}
                        id="confirm-password"
                        name="confirmPassword"
                        className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                        placeholder=""
                        autoComplete="off"
                        value={values.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                      />
                      <label
                        htmlFor="confirm-password"
                        className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                      >
                        Confirm Password
                      </label>
                    </div>
                    {confirmPassword ? (
                      <img
                        src="/icons/eye-show.svg"
                        className="-ml-[30px] z-10 cursor-pointer"
                        onClick={toggleConfirmPassword}
                        alt=""
                      ></img>
                    ) : (
                      <img
                        src="/icons/eye-hidden.svg"
                        className="-ml-[30px] z-10 cursor-pointer"
                        onClick={toggleConfirmPassword}
                        alt=""
                      ></img>
                    )}
                  </div>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                      {errors.confirmPassword}
                    </p>
                  ) : (
                    ""
                  )}
                  {registerError.type === "server" ||
                  registerError.type === "payload" ? (
                    <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                      {registerError.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </form>
            </div>
            <div className="text-link hover:underline mt-[5px] -mb-[15px]">
              {activation ? (
                <Link to={`http://localhost:3000/activation/${activation}`}>
                  http://localhost:3000/activation/{activation}
                </Link>
              ) : (
                ""
              )}
            </div>
            <div
              className="text-blue border-[1px] w-[150px] p-[10px] mx-auto mt-[30px] rounded-[8px] transition duration-300 hover:bg-blue hover:text-white cursor-pointer"
              onClick={handleSubmit}
            >
              Register
            </div>
            <p className="mt-[20px] text-orange">
              Already a user?{" "}
              <Link to={"/login"} className="text-link hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
