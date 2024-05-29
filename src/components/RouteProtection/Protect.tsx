import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export interface propsInterface {
  Component: () => JSX.Element;
}

const Protect = (props: propsInterface) => {
  const cookies: Cookies = new Cookies();

  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn = cookies.get("token");
    if (!isLoggedIn) {
      navigate("/login");
    }
  });
  return (
    <div>
      <props.Component />
    </div>
  );
};

export default Protect;
