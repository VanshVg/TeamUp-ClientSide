import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { setUser } from "../../redux/reducers/userReducers";
import { axiosErrorI } from "../../interfaces";

const Activation = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activationError, setActivationError] = useState({
    type: "",
    message: "",
  });

  enum Type {
    Unauthorized = "unauthorised",
    Server = "server",
  }

  const verifyActivation = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/auth/activate/${params.token}`,
        {},
        {
          withCredentials: true,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        dispatch(setUser(response.data.userData));
      }
    } catch (error) {
      const { data } = (error as axiosErrorI).response;
      if (data.type === "server") {
        navigate("/error");
      } else if (!data.success) {
        setActivationError({ type: data.type ?? "", message: data.message });
      }
    }
  };

  useEffect(() => {
    verifyActivation();
  }, [params.token]);

  return (
    <>
      <Helmet>
        <title>Activation</title>
      </Helmet>
      <div className="activation-container">
        {activationError.type === Type.Unauthorized ||
        activationError.type === Type.Server ? (
          <>
            <p className="text-red">
              {activationError.message ||
                "You are not authorised to access this page"}
            </p>
            <p className="text-fontBlue">
              <Link
                to={"/register"}
                className="text-link cursor-pointer hover:underline"
              >
                Click here to continue
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="text-fontBlue mt-[10px]">
              Your account has been activated.
            </p>
            <p className="text-fontBlue">
              <Link
                to={"/dashboard"}
                className="text-link cursor-pointer hover:underline"
              >
                Click here to continue
              </Link>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Activation;
