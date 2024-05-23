import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const togglePassword = (): void => {
    setPassword(!password);
  };

  const toggleConfirmPassword = (): void => {
    setConfirmPassword(!confirmPassword);
  };

  return (
    <div className="register-container max-w-[1440px] mx-auto py-[30px] px-[50px]">
      <div className="flex shadow-[2px_2px_2px_2px_grey] p-[10px] rounded-[0.438rem]">
        <div className="w-[50%]">
          <img
            src="/background/auth_bg.jpeg"
            alt="Register"
            className="h-[500px] w-full"
          ></img>
        </div>
        <div className="w-[1px] h-[450px] bg-orange my-auto"></div>
        <div className="w-[60%]">
          <div>
            <h1 className="text-blue text-[40px] text-center font-bold mx-auto mt-[10px]">
              Join, Team Up
            </h1>
          </div>
          <div>
            <form autoComplete="off">
              <div className="flex mx-auto max-w-[77%] justify-center gap-[6%] mt-[20px]">
                <div className="relative w-[48%]">
                  <input
                    type="text"
                    id="first-name"
                    className="block px-2.5 pb-2.5 pt-4 h-[40px] w-[100%] text-sm text-blue text-[40px] bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                    placeholder=""
                    autoComplete="off"
                  />
                  <label
                    htmlFor="first-name"
                    className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                  >
                    First Name
                  </label>
                </div>
                <div className="relative w-[48%]">
                  <input
                    type="text"
                    id="last-name"
                    className="block px-2.5 pb-2.5 pt-4 h-[40px] w-[100%] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                    placeholder=""
                    autoComplete="off"
                  />
                  <label
                    htmlFor="last-name"
                    className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                  >
                    Last Name
                  </label>
                </div>
              </div>
              <div className="mt-[20px] max-w-[77%] mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    id="field1"
                    className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto bg-white autofill:bg-white"
                    placeholder=""
                    autoComplete="off"
                  />
                  <label
                    htmlFor="username"
                    className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                  >
                    Username
                  </label>
                </div>
              </div>
              <div className="mt-[20px] max-w-[77%] mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    id="email"
                    className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                    placeholder=""
                    autoComplete="off"
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                  >
                    Email Address
                  </label>
                </div>
              </div>
              <div className="flex mt-[20px] max-w-[77%] mx-auto">
                <div className="relative w-full">
                  <input
                    type={password ? "text" : "password"}
                    id="password"
                    className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                    placeholder=""
                    autoComplete="off"
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
              <div className="flex mt-[20px] max-w-[77%] mx-auto">
                <div className="relative w-full">
                  <input
                    type={confirmPassword ? "text" : "password"}
                    id="confirm-password"
                    className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                    placeholder=""
                    autoComplete="off"
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
            </form>
          </div>
          <div className="text-blue border-[1px] w-[150px] p-[10px] mx-auto mt-[30px] rounded-[8px] transition duration-300 hover:bg-blue hover:text-white cursor-pointer">
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
  );
};

export default Register;
