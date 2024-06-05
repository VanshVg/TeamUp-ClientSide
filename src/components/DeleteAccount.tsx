import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import deleteAccount from "../schemas/deleteAccount";
import axios from "axios";
import Cookies, { Cookie } from "universal-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { customErrorInterface } from "../pages/auth/Register";

interface accountInterface {
  currentPassword: string;
}

const DeleteAccount = () => {
  const deleteAccountData: accountInterface = {
    currentPassword: "",
  };
  const [accountPassword, setAccountPassword] = useState<boolean>(false);
  const [deleteAccountError, setDeleteAccountError] =
    useState<customErrorInterface>({ type: "", message: "" });

  const cookies: Cookie = new Cookies();
  const navigate = useNavigate();

  const { handleChange, handleBlur, submitForm, values, errors, touched } =
    useFormik({
      initialValues: deleteAccountData,
      validationSchema: deleteAccount,
      onSubmit: (values) => {
        axios
          .post(`http://192.168.10.72:4000/auth/deleteAccount`, values, {
            withCredentials: true,
          })
          .then((resp) => {
            if (resp.data.success) {
              cookies.remove("token", { path: "/" });
              Swal.fire({
                title: "Delete Successful",
                text: "Account is Deleted",
                icon: "warning",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                navigate("/");
              });
            }
          })
          .catch((error) => {
            const { data } = error.response;
            if (data.type === "server") {
              navigate("/error");
            } else if (!data.success) {
              setDeleteAccountError({ type: data.type, message: data.message });
            }
          });
      },
    });

  const handleAccountPasswordChange = (e: ChangeEvent) => {
    setDeleteAccountError({ type: "", message: "" });
    handleChange(e);
  };

  const toggleAccountPassword = (): void => {
    setAccountPassword(!accountPassword);
  };

  const handleDeleteAccountSubmit = (): void => {
    Swal.fire({
      title: "Delete Account Confirmation",
      text: "Are sure you want to delete your account?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      confirmButtonColor: "#2554c7",
      color: "#28183b",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        submitForm();
      }
    });
  };

  return (
    <div className="max-w-[70%]">
      <div className="mt-[40px] ml-[20px] mx-auto">
        <div className="flex">
          <div className="relative w-full">
            <input
              type={accountPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
              placeholder=""
              autoComplete="off"
              value={values.currentPassword}
              onChange={handleAccountPasswordChange}
              onBlur={handleBlur}
            />
            <label
              htmlFor="currentPassword"
              className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
            >
              Current Password
            </label>
          </div>
          {accountPassword ? (
            <img
              src="/icons/eye-show.svg"
              className="-ml-[30px] z-10 cursor-pointer"
              onClick={toggleAccountPassword}
              alt=""
            ></img>
          ) : (
            <img
              src="/icons/eye-hidden.svg"
              className="-ml-[30px] z-10 cursor-pointer"
              onClick={toggleAccountPassword}
              alt=""
            ></img>
          )}
        </div>
        {(errors.currentPassword && touched.currentPassword) ||
        deleteAccountError.type === "password" ? (
          <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red ml-[2px]">
            {errors.currentPassword || deleteAccountError.message}
          </p>
        ) : (
          ""
        )}
      </div>
      <div
        className="text-blue border-[1px] w-[150px] p-[10px] ml-auto mt-[30px] rounded-[8px] transition duration-300 cursor-pointer hover:bg-blue hover:text-white"
        onClick={handleDeleteAccountSubmit}
      >
        Delete Account
      </div>
    </div>
  );
};

export default DeleteAccount;
