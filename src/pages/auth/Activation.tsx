import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";

const Activation = () => {
  const params = useParams();

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
        console.log(resp);
      })
      .catch((error) => {
        const { data } = error.response;
        if (!data.success) {
          if (data.type === "unauthorised") {
            setActivationError({ type: "unauthorised", message: data.message });
          } else if (data.type === "server") {
            setActivationError({ type: "server", message: data.message });
          }
        }
        console.log(data);
      });
  }, [params.token]);
  return (
    <>
      <Helmet>
        <title>Activation</title>
      </Helmet>
      <div className="activation-container">
        {activationError ? (
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
