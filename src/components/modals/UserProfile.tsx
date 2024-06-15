import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { userInterface } from "../UpdateProfile";
import Loader from "../Loader";

interface modalInterface {
  isOpen: boolean;
  onRequestClose: () => void;
  userId: number;
  role: string;
  isAdmin: boolean;
}

const UserProfile = (props: modalInterface) => {
  const { isOpen, onRequestClose, userId, role, isAdmin } = props;
  console.log(role, isAdmin);
  const [userData, setUserData] = useState<userInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://192.168.10.72:4000/auth/userProfile/${userId}`, {
        withCredentials: true,
      })
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  return (
    <div className="w-[200px]">
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="User Profile"
        className={
          "w-[50%] bg-white border-0 outline-0 mx-auto mt-[170px] shadow-[2px_2px_2px_2px_grey] rounded-[8px] pb-[30px] pt-[15px] px-[20px]"
        }
      >
        <img
          src="/icons/close.svg"
          className="flex ml-auto cursor-pointer"
          onClick={onRequestClose}
        ></img>
        <div>
          <h2 className="text-blue font-bold text-[30px] text-center">
            User Profile
          </h2>
          <div className="h-[1px] bg-orange mt-[10px]"></div>
          {isLoading ? (
            <div className="mx-auto w-[80px] mt-[50px]">
              <Loader />
            </div>
          ) : (
            <div>
              <div className="flex max-w-[90%] rounded-[0.438rem] mx-auto">
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
                              value={userData?.first_name}
                              className="block px-2.5 pb-2.5 pt-4 h-[40px] w-[100%] text-sm text-blue text-[40px] bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                              placeholder=""
                              autoComplete="off"
                              disabled
                            />
                            <label
                              htmlFor="first-name"
                              className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                            >
                              First Name
                            </label>
                          </div>
                        </div>
                        <div className="w-[48%]">
                          <div className="relative w-full">
                            <input
                              type="text"
                              id="last-name"
                              name="last_name"
                              value={userData?.last_name}
                              className="block px-2.5 pb-2.5 pt-4 h-[40px] w-full text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                              placeholder=""
                              autoComplete="off"
                              disabled
                            />
                            <label
                              htmlFor="last-name"
                              className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                            >
                              Last Name
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-[30px] ml-[20px]">
                        <div className="relative">
                          <input
                            type="text"
                            id="username"
                            name="username"
                            value={userData?.username}
                            className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                            placeholder=""
                            autoComplete="off"
                            disabled
                          />
                          <label
                            htmlFor="username"
                            className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                          >
                            Username
                          </label>
                        </div>
                      </div>
                      <div className="mt-[30px] ml-[20px]">
                        <div className="relative">
                          <input
                            type="text"
                            id="email"
                            name="email"
                            value={userData?.email}
                            className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                            placeholder=""
                            autoComplete="off"
                            disabled
                          />
                          <label
                            htmlFor="email"
                            className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                          >
                            Email Address
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center gap-[10px]">
          {!isAdmin && role === "admin" ? (
            <div
              tabIndex={3}
              className="text-red border-[1px] text-[18px] w-[150px] p-[10px] mt-[40px] rounded-[8px] transition duration-300 hover:bg-red text-center hover:text-white cursor-pointer"
              // onClick={handleLeaveTeam}
            >
              Remove
            </div>
          ) : (
            ""
          )}
          {!isAdmin && role === "admin" ? (
            <div
              tabIndex={3}
              className="text-blue border-[1px] text-[18px] w-[150px] p-[10px] mt-[40px] rounded-[8px] transition duration-300 hover:bg-blue text-center hover:text-white cursor-pointer"
              // onClick={handleLeaveTeam}
            >
              Make Admin
            </div>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
