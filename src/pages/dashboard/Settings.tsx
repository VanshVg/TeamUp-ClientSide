import { Helmet } from "react-helmet";
import { useState } from "react";
import Cookies, { Cookie } from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import UpdateProfile from "../../components/UpdateProfile";
import ResetPassword from "../../components/ResetPassword";
import DeleteAccount from "../../components/DeleteAccount";

const Settings = () => {
  const [profile, setProfile] = useState<boolean>(true);
  const [account, setAccount] = useState<boolean>(true);
  const [updateProfile, setUpdateProfile] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [theme, setTheme] = useState<boolean>(false);
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);

  const cookies: Cookie = new Cookies();

  const navigate = useNavigate();

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
          cookies.remove("token", { path: "/" });
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
                {updateProfile ? <UpdateProfile /> : ""}

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
                {changePassword ? <ResetPassword /> : ""}
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
                {deleteAccount ? <DeleteAccount /> : ""}
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
