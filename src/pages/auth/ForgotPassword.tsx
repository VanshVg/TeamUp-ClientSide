import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import forgotPassword from "../../schemas/forgotPassword";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { customErrorInterface } from "./Register";

interface dataInterface {
  username: string;
}

const ForgotPassword = () => {
  const data: dataInterface = {
    username: "",
  };

  const navigate = useNavigate();

  const [verifyError, setVerifyError] = useState<customErrorInterface>({
    type: "",
    message: "",
  });
  const [resetToken, setResetToken] = useState<string>("");

  const { values, errors, handleBlur, handleChange, touched, submitForm } =
    useFormik({
      initialValues: data,
      validationSchema: forgotPassword,
      onSubmit: (values) => {
        axios
          .post(`http://192.168.10.72:4000/auth/verify`, values)
          .then((resp) => {
            if (resp.data.success) {
              setResetToken(resp.data.reset_token);
            }
          })
          .catch((error) => {
            const { data } = error.response;
            if (data.type === "server") {
              navigate("/*");
            } else if (!data.success) {
              setVerifyError({ type: data.type, message: data.message });
            }
          });
      },
    });

  const handleSubmit = (): void => {
    setVerifyError({ type: "", message: "" });
    submitForm();
  };

  const handleInputChange = (e: ChangeEvent): void => {
    handleChange(e);
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className="flex forgot-container max-w-[1440px]  mx-auto justify-center">
        <div className="flex shadow-[2px_2px_2px_2px_grey] w-[950px] mt-[5%] p-[10px] rounded-[0.438rem]">
          <div className="w-[50%]">
            <img
              src="/background/verify_bg.jpeg"
              alt="Login"
              className="h-[500px]"
            ></img>
          </div>
          <div className="border-orange border-l-[1px] h-[450px] bg-orange my-auto ml-[30px]"></div>
          <div className="w-[60%] mt-[30px]">
            <div>
              <h1 className="text-blue text-[40px] text-center font-bold mx-auto mt-[40px] ">
                Team Up
              </h1>
              <h1 className="text-orange text-[30px] text-center font-bold mx-auto">
                Forgot Password
              </h1>
            </div>
            <div>
              <form>
                <div className="flex mx-auto max-w-[77%] gap-[6%] mt-[20px]"></div>
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
                      Username or Email
                    </label>
                  </div>
                  {(errors.username && touched.username) ||
                  verifyError.type === "not_found" ||
                  verifyError.type === "not_active" ? (
                    <p
                      id="link"
                      className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]"
                    >
                      {errors.username || verifyError.message}
                    </p>
                  ) : (
                    ""
                  )}
                  {resetToken ? (
                    <p
                      className="text-link hover:underline mt-[5px] -mb-[15px] cursor-pointer"
                      onClick={() => {
                        navigate(`/changePassword/${resetToken}`, {
                          state: { username: values.username },
                        });
                      }}
                    >
                      {`http://localhost:3000/changePassword/${resetToken}`}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </form>
            </div>
            <div
              className="text-blue border-[1px] w-[150px] p-[10px] mx-auto mt-[40px] rounded-[8px] transition duration-300 hover:bg-blue hover:text-white cursor-pointer"
              onClick={handleSubmit}
            >
              Verify
            </div>
            <p className="mt-[40px] text-orange">
              Back to login?{" "}
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

export default ForgotPassword;
