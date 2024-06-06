import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <div className="flex error-container max-w-[1440px] mx-auto justify-center">
        <div>
          <img src="/background/error_bg.jpeg" className="-mt-[20px]"></img>
          <h2 className="font-bold text-blue text-[35px] -mt-[80px]">
            Something Went Wrong!
          </h2>
          <Link to={"/"}>
            <div className="text-blue hover:bg-blue hover:text-white duration-300 ease-out border-[1px] p-[10px] max-w-[200px] mx-auto mt-[30px] rounded-[6px]">
              Go Back
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
