import { Helmet } from "react-helmet";
import { ChangeEvent, useEffect, useState } from "react";
import Cookies, { Cookie } from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { customErrorInterface } from "../auth/Register";
import updateProfileSchema from "../../schemas/updateProfile";

interface userInterface {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

const Settings = () => {
  const [profile, setProfile] = useState<boolean>(true);
  const [account, setAccount] = useState<boolean>(true);
  const [updateProfile, setUpdateProfile] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [theme, setTheme] = useState<boolean>(false);
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);
  const [userData, setUserData] = useState<userInterface>();

  const [updateProfileError, setUpdateProfileError] =
    useState<customErrorInterface>({ type: "", message: "" });

  const cookies: Cookie = new Cookies();

  const navigate = useNavigate();

  const { values, errors, handleBlur, handleChange, touched, submitForm } =
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
              setUpdateProfile(false);
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

  const handleInputChange = (e: ChangeEvent) => {
    handleChange(e);
  };

  const handleUpdateProfileSubmit = (): void => {
    submitForm();
  };

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
        console.log(data);
        if (!data.success) {
          navigate("/*");
        }
      });
  }, []);

  const handleProfile = (): void => {
    setProfile(!profile);
    setUpdateProfile(false);
    setChangePassword(false);
  };

  const handleUpdateProfile = (): void => {
    setUpdateProfile(!updateProfile);
  };

  const handleChangePassword = (): void => {
    setChangePassword(!changePassword);
  };

  const handleAccount = (): void => {
    setAccount(!account);
    setTheme(false);
    setDeleteAccount(false);
  };

  const handleTheme = (): void => {
    setTheme(!theme);
  };

  const handleDeleteAccount = (): void => {
    setDeleteAccount(!deleteAccount);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are sure you want to logout?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      confirmButtonColor: "#2554c7",
      color: "#28183b",
      showLoaderOnConfirm: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          cookies.remove("token");
          Swal.fire({
            title: "Logout Successful",
            text: "Logout Successful",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate("/");
          });
        }
      })
      .catch(() => {
        navigate("/*");
      });
  };

  return (
    <div className="h-screen">
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <div className="settings-container h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] overflow-y-auto pb-[100px]">
            <div
              className="flex cursor-pointer w-[145px]"
              onClick={handleProfile}
            >
              <h2 className="text-[30px] text-left ml-[20px] mt-[20px] font-bold text-fontBlue underline">
                Profile
              </h2>
              {profile ? (
                <img
                  src="/icons/down-arrow-fontBlue.svg"
                  className="mt-[20px]"
                  alt=""
                ></img>
              ) : (
                <img
                  src="/icons/right-arrow-fontBlue.svg"
                  className="mt-[20px]"
                  alt=""
                ></img>
              )}
            </div>
            {profile ? (
              <div className="ease-out duration-300">
                <div
                  className="flex cursor-pointer w-[205px]"
                  onClick={handleUpdateProfile}
                >
                  <h2 className="text-[23px] text-left ml-[20px] mt-[10px] font-bold text-blue underline">
                    Update Profile
                  </h2>
                  {updateProfile ? (
                    <img
                      src="/icons/down-arrow-blue.svg"
                      className="mt-[10px]"
                      alt=""
                    ></img>
                  ) : (
                    <img
                      src="/icons/right-arrow-blue.svg"
                      className="mt-[10px]"
                      alt=""
                    ></img>
                  )}
                </div>
                {updateProfile ? (
                  <div>
                    <div className="flex max-w-[70%] rounded-[0.438rem]">
                      <div className="w-[1px] h-[95%] bg-orange my-auto"></div>
                      <div className="w-full">
                        <div></div>
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
                              updateProfileError.type === "username" ? (
                                <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
                                  {errors.username ||
                                    updateProfileError.message}
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
                              updateProfileError.type === "email" ? (
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
                ) : (
                  ""
                )}

                <div
                  className="flex cursor-pointer w-[240px]"
                  onClick={handleChangePassword}
                >
                  <h2 className="text-[23px] text-left ml-[20px] mt-[10px] font-bold text-blue underline">
                    Change Password
                  </h2>
                  {changePassword ? (
                    <img
                      src="/icons/down-arrow-blue.svg"
                      className="mt-[10px]"
                      alt=""
                    ></img>
                  ) : (
                    <img
                      src="/icons/right-arrow-blue.svg"
                      className="mt-[10px]"
                      alt=""
                    ></img>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            <div
              className="flex cursor-pointer w-[150px]"
              onClick={handleAccount}
            >
              <h2 className="text-[30px] text-left ml-[20px] mt-[20px] font-bold text-fontBlue underline">
                Account
              </h2>
              {account ? (
                <img
                  src="/icons/down-arrow-fontBlue.svg"
                  className="mt-[20px]"
                  alt=""
                ></img>
              ) : (
                <img
                  src="/icons/right-arrow-fontBlue.svg"
                  className="mt-[20px]"
                  alt=""
                ></img>
              )}
            </div>

            {account ? (
              <div className="ease-out duration-300">
                <div
                  className="flex cursor-pointer w-[230px]"
                  onClick={handleDeleteAccount}
                >
                  <h2 className="text-[23px] text-left ml-[20px] mt-[10px] font-bold text-blue underline">
                    Delete Account
                  </h2>
                  {deleteAccount ? (
                    <img
                      src="/icons/down-arrow-blue.svg"
                      className="mt-[10px]"
                      alt=""
                    ></img>
                  ) : (
                    <img
                      src="/icons/right-arrow-blue.svg"
                      className="mt-[10px]"
                      alt=""
                    ></img>
                  )}
                </div>
                {deleteAccount ? (
                  <div>
                    <p className="text-red text-left ml-[30px]">
                      Coming Soon...
                    </p>
                  </div>
                ) : (
                  ""
                )}
                <div
                  className="flex cursor-pointer w-[125px]"
                  onClick={handleTheme}
                >
                  <h2 className="text-[23px] text-left ml-[20px] mt-[10px] font-bold text-blue underline">
                    Theme
                  </h2>
                  {theme ? (
                    <img
                      src="/icons/down-arrow-blue.svg"
                      className="mt-[10px]"
                      alt=""
                    ></img>
                  ) : (
                    <img
                      src="/icons/right-arrow-blue.svg"
                      className="mt-[10px]"
                      alt=""
                    ></img>
                  )}
                </div>
                {theme ? (
                  <div>
                    <p className="text-red text-left ml-[30px]">
                      Coming Soon...
                    </p>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex">
                  <h2
                    className="text-[23px] text-left ml-[20px] mt-[10px] font-bold text-blue hover:underline cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </h2>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
