import axios from "axios";
import { useFormik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { customErrorInterface } from "../pages/auth/Register";
import updateProfileSchema from "../schemas/updateProfile";
import Cookies, { Cookie } from "universal-cookie";
import Swal from "sweetalert2";

export interface userInterface {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

const UpdateProfile = () => {
  const [userData, setUserData] = useState<userInterface>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });
  const [updateProfileError, setUpdateProfileError] =
    useState<customErrorInterface>({ type: "", message: "" });

  const navigate = useNavigate();
  const cookies: Cookie = new Cookies();

  useEffect(() => {
    axios
      .get(`http://192.168.10.72:4000/auth/profile`, { withCredentials: true })
      .then((resp) => {
        if (resp.data.success) {
          setUserData(resp.data.userData);
        }
      })
      .catch((error) => {
        const { data } = error.response;
        if (!data.success) {
          navigate("/error");
        }
      });
  }, []);

  const { handleChange, handleBlur, submitForm, values, errors, touched } =
    useFormik({
      enableReinitialize: true,
      initialValues: userData as userInterface,
      validationSchema: updateProfileSchema,
      onSubmit: (values) => {
        axios
          .put(`http://192.168.10.72:4000/auth/updateProfile`, values, {
            withCredentials: true,
          })
          .then((resp) => {
            if (resp.data.success) {
              cookies.set("token", resp.data.token, { path: "/" });
              Swal.fire({
                title: "Success!",
                text: "Profile is updated successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
              setUpdateProfileError({ type: "", message: "" });
            }
          })
          .catch((error) => {
            const { data } = error.response;
            if (data.type === "server") {
              navigate("/error");
            } else if (!data.success) {
              setUpdateProfileError({ type: data.type, message: data.message });
            }
          });
      },
    });

  const handleProfileChange = (e: ChangeEvent) => {
    setUpdateProfileError({ type: "", message: "" });
    handleChange(e);
  };

  const handleUpdateProfileSubmit = (): void => {
    submitForm();
  };

  return (
    <div>
      <div className="flex max-w-[70%] rounded-[0.438rem]">
        <div className="w-[1px] h-[95%] bg-orange my-auto"></div>
        <div className="w-full">
          <div>
            <form>
              <div className="flex ml-[20px] gap-[6%] mt-[30px]">
                <div className="w-[48%]">
                  <div className="relative">
                    <input
                      type="text"
                      id="first-name"
                      name="first_name"
                      className="block px-2.5 pb-2.5 pt-4 h-[40px] w-[100%] text-sm text-blue text-[40px] bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                      placeholder=""
                      autoComplete="off"
                      value={values.first_name}
                      onChange={handleProfileChange}
                      onBlur={handleBlur}
                    />
                    <label
                      htmlFor="first-name"
                      className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                    >
                      First Name
                    </label>
                  </div>
                  {errors.first_name && touched.first_name ? (
                    <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                      {errors.first_name}
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
                      name="last_name"
                      className="block px-2.5 pb-2.5 pt-4 h-[40px] w-full text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                      placeholder=""
                      autoComplete="off"
                      value={values.last_name}
                      onChange={handleProfileChange}
                      onBlur={handleBlur}
                    />
                    <label
                      htmlFor="last-name"
                      className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                    >
                      Last Name
                    </label>
                  </div>
                  {errors.last_name && touched.last_name ? (
                    <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                      {errors.last_name}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mt-[30px] ml-[20px]">
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                    placeholder=""
                    autoComplete="off"
                    value={values.username}
                    onChange={handleProfileChange}
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
                updateProfileError.type === "username" ? (
                  <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                    {errors.username || updateProfileError.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-[30px] ml-[20px]">
                <div className="relative">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                    placeholder=""
                    autoComplete="off"
                    value={values.email}
                    onChange={handleProfileChange}
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
                updateProfileError.type === "email" ||
                updateProfileError.type === "payload" ? (
                  <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                    {errors.email || updateProfileError.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
          <div
            className="text-blue border-[1px] w-[150px] p-[10px] ml-auto mt-[30px] rounded-[8px] transition duration-300 cursor-pointer hover:bg-blue hover:text-white"
            onClick={handleUpdateProfileSubmit}
          >
            Update Profile
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
