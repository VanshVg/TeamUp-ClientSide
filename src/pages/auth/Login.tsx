import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import login from "../../schemas/login";
import axios from "axios";
import { customErrorInterface } from "./Register";
import Cookies, { Cookie } from "universal-cookie";

const Login = () => {
  const data = {
    username: "",
    password: "",
  };

  const [password, setPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<customErrorInterface>({
    type: "",
    message: "",
  });

  const cookies: Cookie = new Cookies();

  const navigate: NavigateFunction = useNavigate();

  const togglePassword = (): void => {
    setPassword(!password);
  };

  const { values, errors, handleBlur, handleChange, touched, submitForm } =
    useFormik({
      initialValues: data,
      validationSchema: login,
      onSubmit: (values) => {
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, values)
          .then((response) => {
            const { data } = response;
            if (data.success) {
              cookies.set("token", data.token, {
                path: "/",
                expires: new Date(Date.now() + 2592000000),
              });
              navigate("/dashboard");
            }
          })
          .catch((error) => {
            const { data } = error.response;
            if (data.type === "server") {
              navigate("/*");
            } else if (!data.success) {
              setLoginError({ type: data.type, message: data.message });
            }
          });
      },
    });

  const handleSubmit = (): void => {
    submitForm();
  };

  const handleInputChange = (e: ChangeEvent): void => {
    setLoginError({ type: "", message: "" });
    handleChange(e);
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="flex register-container max-w-[1440px] mx-auto justify-center">
        <div className="flex shadow-[2px_2px_2px_2px_grey] w-[1000px] mt-[5%] p-[10px] rounded-[0.438rem]">
          <div className="w-[50%]">
            <img
              src="/background/login_bg.jpg"
              alt="Login"
              className="h-[500px]"
            ></img>
          </div>
          <div className="border-orange border-l-[1px] h-[450px] bg-orange my-auto ml-[30px]"></div>
          <div className="w-[60%] mt-[30px]">
            <div>
              <h1 className="text-orange text-[30px] text-center font-bold mx-auto mt-[10px]">
                Welcome Back,
              </h1>
              <h1 className="text-blue text-[40px] text-center font-bold mx-auto -mt-[10px]">
                Team Up
              </h1>
            </div>
            <div>
              <form>
                <div className="flex mx-auto max-w-[77%] gap-[6%] mt-[20px]"></div>
                <div className="mt-[20px] max-w-[77%] mx-auto">
                  <div className="relative">
                    <input
                      tabIndex={1}
                      type="text"
                      id="username"
                      name="username"
                      className="block  px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto "
                      placeholder=""
                      autoComplete="off"
                      value={values.username}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    <label
                      htmlFor="username"
                      className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                    >
                      Username or Email
                    </label>
                  </div>
                  {errors.username && touched.username ? (
                    <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red">
                      {errors.username}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className=" mt-[20px] max-w-[77%] mx-auto">
                  <div className="flex">
                    <div className="relative w-full">
                      <input
                        tabIndex={2}
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
                        className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                      >
                        Password
                      </label>
                    </div>
                    {password ? (
                      <img
                        src="/icons/eye-show.svg"
                        className="-ml-[30px]  cursor-pointer"
                        onClick={togglePassword}
                        alt=""
                      ></img>
                    ) : (
                      <img
                        src="/icons/eye-hidden.svg"
                        className="-ml-[30px]  cursor-pointer"
                        onClick={togglePassword}
                        alt=""
                      ></img>
                    )}
                  </div>
                  {(errors.password && touched.password) ||
                  loginError.type === "credentials" ||
                  loginError.type === "active" ? (
                    <p className="-mb-[12px] mt-[2px] ml-[2px] text-left text-[15px] text-red">
                      {errors.password || loginError.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </form>
            </div>
            <div
              tabIndex={3}
              className="text-blue border-[1px] w-[150px] p-[10px] mx-auto mt-[40px] rounded-[8px] transition duration-300 hover:bg-blue hover:text-white cursor-pointer"
              onClick={handleSubmit}
            >
              Login
            </div>
            <p className="mt-[20px]">
              <Link
                to={"/forgotPassword"}
                className="text-link hover:underline"
              >
                Forgot Password?{" "}
              </Link>
            </p>
            <p className="mt-[20px] text-orange">
              New to Team Up?{" "}
              <Link to={"/register"} className="text-link hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
