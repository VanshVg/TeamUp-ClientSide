import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <div className="flex error-container max-w-[1440px] mx-auto justify-center">
        <div>
          <img
            src="/background/error_bg.jpeg"
            className="-mt-[20px]"
            alt="error"
          ></img>
          <h2 className="font-bold text-blue text-[35px] -mt-[80px]">
            Something Went Wrong!
          </h2>
          <div
            className="text-blue hover:bg-blue hover:text-white duration-300 ease-out border-[1px] p-[10px] max-w-[200px] mx-auto mt-[30px] rounded-[6px] cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
