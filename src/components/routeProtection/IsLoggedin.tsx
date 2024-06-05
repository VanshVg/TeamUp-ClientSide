import { useEffect } from "react";
import { propsInterface } from "./Protect";
import Cookies, { Cookie } from "universal-cookie";
import { useNavigate } from "react-router-dom";

export const IsLoggedin = (props: propsInterface) => {
  const cookies: Cookie = new Cookies();

  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = cookies.get("token");
    if (isLogin) {
      navigate("/dashboard");
    }
  });
  return (
    <div>
      <props.Component />
    </div>
  );
};
