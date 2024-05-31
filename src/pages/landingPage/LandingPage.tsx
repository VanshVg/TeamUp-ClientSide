import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import Cookies from "universal-cookie";

const LandingPage = () => {
  const cookies: Cookies = new Cookies();

  const token = cookies.get("token");
  console.log(token);
  console.log(cookies.getAll());
  return (
    <>
      <Helmet>
        <title>Team Up</title>
      </Helmet>
      <div className="landingPage-container">
        <div className="flex justify-between mt-[10px] px-[30px] max-w-[1440px] mx-auto">
          <div>
            <h1 className="text-blue text-[40px] font-bold cursor-pointer">
              Team Up
            </h1>
          </div>
          {token ? (
            <div className="flex gap-[15px] mt-[10px]">
              <Link to={"/dashboard"}>
                <div className="bg-blue text-white text-[20px] rounded-[10px] border-blue border-[1px] w-[120px] h-[55px] pt-[10px] transition ease-in duration-[0.2s] hover:bg-white hover:text-blue cursor-pointer">
                  Dashboard
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex gap-[15px] mt-[10px]">
              <Link to={"/register"}>
                <div className="bg-blue text-white text-[20px] rounded-[10px] border-blue border-[1px] w-[120px] h-[55px] pt-[10px] transition ease-in duration-[0.2s] hover:bg-white hover:text-blue cursor-pointer">
                  Sign Up
                </div>
              </Link>
              <Link to={"/login"}>
                <div className="bg-white text-blue text-[20px] rounded-[10px] border-blue border-[1px] w-[120px] h-[55px] pt-[10px] transition ease-in duration-[0.2s] hover:bg-blue hover:text-white cursor-pointer">
                  Sign In
                </div>
              </Link>
            </div>
          )}
        </div>
        <div>
          <div className="text-fontBlue text-[90px] leading-[110px] text-center font-bold max-w-[530px] mx-auto mt-[40px]">
            Collaborate. Achieve. Succeed.
          </div>
          <div>
            <p className="text-fontBlue text-center text-[25px] max-w-[640px] mx-auto mt-[40px]">
              Streamline your task management with Team Up,
            </p>
            <p className="text-fontBlue text-center text-[25px] max-w-[680px] mx-auto">
              Where seamless collaboration ensures your team's success.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
