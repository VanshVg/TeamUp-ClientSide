import { ChangeEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useParams } from "react-router-dom";
import { customErrorInterface } from "./Register";
import { useFormik } from "formik";
import changePassword from "../../schemas/changePassword";
import axios from "axios";

interface dataInterface {
  password: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const data: dataInterface = {
    password: "",
    confirmPassword: "",
  };

  const params = useParams();
  const state = useLocation();

  const [password, setPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);
  const [changePasswordError, setChangePasswordError] =
    useState<customErrorInterface>({
      type: "",
      message: "",
    });

  let username: string = "";
  if (state.state === null) {
    username = "unknown";
  } else {
    username = state.state.username;
  }

  useEffect(() => {
    axios
      .post(`http://localhost:4000/auth/verifyToken/${params.token}`, {
        username: username,
      })
      .catch((error) => {
        const { data } = error.response;
        if (!data.success) {
          setChangePasswordError({ type: data.type, message: data.message });
        }
      });
  }, [params.token]);

  const { values, errors, handleBlur, handleChange, touched, submitForm } =
    useFormik({
      initialValues: data,
      validationSchema: changePassword,
      onSubmit: (values) => {
        let userData = {
          password: values.password,
          username: username,
        };
        axios
          .put(`http://localhost:4000/auth/password`, userData)
          .then((resp) => {
            console.log(resp);
          })
          .catch((error) => {
            console.log(error.response);
          });
      },
    });

  const handleSubmit = (): void => {
    submitForm();
  };

  const handleInputChange = (e: ChangeEvent): void => {
    setChangePasswordError({ type: "", message: "" });
    handleChange(e);
  };

  const togglePassword = (): void => {
    setPassword(!password);
  };

  const toggleConfirmPassword = (): void => {
    setConfirmPassword(!confirmPassword);
  };

  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      {changePasswordError.type === "unauthorised" ? (
        <p className="text-red">{changePasswordError.message}</p>
      ) : (
        <div className="flex register-container max-w-[1440px] mx-auto justify-center">
          <div className="flex shadow-[2px_2px_2px_2px_grey] mt-[5%] p-[10px] rounded-[0.438rem]">
            <div className="w-[50%]">
              <img
                src="/background/change_password_bg.jpeg"
                alt="Register"
                className="h-[500px] w-full"
              ></img>
            </div>
            <div className="w-[1px] h-[95%] bg-orange my-auto"></div>
            <div className="w-[60%]">
              <div>
                <h1 className="text-blue text-[40px] text-center font-bold mx-auto mt-[50px] ">
                  Team Up
                </h1>
                <h1 className="text-orange text-[30px] mb-[40px] text-center font-bold mx-auto">
                  Change Password
                </h1>
              </div>
              <div>
                <form autoComplete="off">
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
                          New Password
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
                    {changePasswordError.type === "server" ||
                    changePasswordError.type === "payload" ? (
                      <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                        {changePasswordError.message}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </form>
              </div>
              <div className="text-link hover:underline mt-[5px] -mb-[15px]"></div>
              <div
                className="text-blue border-[1px] w-[150px] p-[10px] mx-auto mt-[50px] rounded-[8px] transition duration-300 hover:bg-blue hover:text-white cursor-pointer"
                onClick={handleSubmit}
              >
                Change Password
              </div>
              <p className="mt-[20px] text-orange">
                Back to login?{" "}
                <Link to={"/login"} className="text-link hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
