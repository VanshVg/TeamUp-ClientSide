import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import resetPassword from "../schemas/resetPassword";
import axios from "axios";
import { customErrorInterface } from "../pages/auth/Register";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface passwordInterface {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const passwordData: passwordInterface = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };

  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<customErrorInterface>({
    type: "",
    message: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const { handleChange, handleBlur, submitForm, values, errors, touched } =
    useFormik({
      initialValues: passwordData as passwordInterface,
      validationSchema: resetPassword,
      onSubmit: (values) => {
        axios
          .put(`http://192.168.10.72:4000/auth/resetPassword`, values, {
            withCredentials: true,
          })
          .then((resp) => {
            if (resp.data.success) {
              Swal.fire({
                title: "Success!",
                text: "Password is updated successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
              values.currentPassword = "";
              values.password = "";
              values.confirmPassword = "";
              setPasswordError({ type: "", message: "" });
            }
          })
          .catch((error) => {
            const { data } = error.response;
            if (data.type === "server") {
              navigate("/error");
            } else if (!data.success) {
              setPasswordError({ type: data.type, message: data.message });
            }
          });
      },
    });

  const handlePasswordChange = (e: ChangeEvent) => {
    setPasswordError({ type: "", message: "" });
    handleChange(e);
  };

  const toggleCurrentPassword = (): void => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const togglePassword = (): void => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangePasswordSubmit = (): void => {
    submitForm();
  };

  return (
    <div>
      <div className="flex max-w-[70%] rounded-[0.438rem]">
        <div className="w-[1px] h-[95%] bg-orange my-auto"></div>
        <div className="w-full">
          <div>
            <form>
              <div className="mt-[40px] ml-[20px] mx-auto">
                <div className="flex">
                  <div className="relative w-full">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      id="currentPassword"
                      name="currentPassword"
                      className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                      placeholder=""
                      autoComplete="off"
                      value={values.currentPassword}
                      onChange={handlePasswordChange}
                      onBlur={handleBlur}
                    />
                    <label
                      htmlFor="currentPassword"
                      className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                    >
                      Current Password
                    </label>
                  </div>
                  {showCurrentPassword ? (
                    <img
                      src="/icons/eye-show.svg"
                      className="-ml-[30px] z-10 cursor-pointer"
                      onClick={toggleCurrentPassword}
                      alt=""
                    ></img>
                  ) : (
                    <img
                      src="/icons/eye-hidden.svg"
                      className="-ml-[30px] z-10 cursor-pointer"
                      onClick={toggleCurrentPassword}
                      alt=""
                    ></img>
                  )}
                </div>
                {(errors.currentPassword && touched.currentPassword) ||
                passwordError.type === "password" ? (
                  <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                    {errors.currentPassword || passwordError.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-[20px] ml-[20px] mx-auto">
                <div className="flex">
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                      placeholder=""
                      autoComplete="off"
                      value={values.password}
                      onChange={handlePasswordChange}
                      onBlur={handleBlur}
                    />
                    <label
                      htmlFor="password"
                      className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                    >
                      Password
                    </label>
                  </div>
                  {showPassword ? (
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
              <div className="mt-[20px] ml-[20px] mx-auto">
                <div className="flex">
                  <div className="relative w-full">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                      placeholder=""
                      autoComplete="off"
                      value={values.confirmPassword}
                      onChange={handlePasswordChange}
                      onBlur={handleBlur}
                    />
                    <label
                      htmlFor="confirmPassword"
                      className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                    >
                      Confirm Password
                    </label>
                  </div>
                  {showConfirmPassword ? (
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
                {passwordError.type === "payload" ? (
                  <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                    {passwordError.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
          <div
            className="text-blue border-[1px] w-[150px] p-[10px] ml-auto mt-[30px] rounded-[8px] transition duration-300 cursor-pointer hover:bg-blue hover:text-white"
            onClick={handleChangePasswordSubmit}
          >
            Change Password
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
