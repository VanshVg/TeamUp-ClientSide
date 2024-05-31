import { Helmet } from "react-helmet";

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
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
