import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";

const Activation = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [activationError, setActivationError] = useState({
    type: "",
    message: "",
  });

  useEffect(() => {
    axios
      .put(
        `http://localhost:4000/auth/activate/${params.token}`,
        {},
        {
          withCredentials: true,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        if (resp.data.success) {
        }
      })
      .catch((error) => {
        const { data } = error.response;
        if (data.type === "server") {
          navigate("*");
        } else if (!data.success) {
          setActivationError({ type: data.type, message: data.message });
        }
      });
  }, [params.token]);
  return (
    <>
      <Helmet>
        <title>Activation</title>
      </Helmet>
      <div className="activation-container">
        {activationError.type !== "" ? (
          <>
            <p className="text-red">{activationError.message}</p>
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
                to={"/dashboard/1"}
                className="text-link cursor-pointer hover:underline"
              >
                Click here{" "}
              </Link>
              to continue
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Activation;
