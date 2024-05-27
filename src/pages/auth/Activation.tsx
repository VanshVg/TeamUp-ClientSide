import { Link } from "react-router-dom";

const Activation = () => {
  return (
    <div className="activation-container">
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
    </div>
  );
};

export default Activation;
