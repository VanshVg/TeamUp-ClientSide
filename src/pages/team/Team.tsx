import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { customErrorInterface } from "../auth/Register";
import { teamInterface } from "../dashboard/Dashboard";

const Team = () => {
  const [teamData, setTeamData] = useState<teamInterface>();
  const [teamError, setTeamError] = useState<customErrorInterface>({
    type: "",
    message: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://192.168.10.72:4000/team/get/${params.id}}`, {
        withCredentials: true,
      })
      .then((resp) => {
        if (resp.data.success) {
          setTeamData(resp.data.teamData);
        }
      })
      .catch((error) => {
        const { data } = error.response;
        if (data.type === "server") {
          navigate("/*");
        } else if (!data.success) {
          setTeamError({ type: data.type, message: data.message });
        }
      });
  }, [params]);

  return (
    <div className="h-screen">
      <Helmet>
        <title>{teamData?.name}</title>
      </Helmet>
      <div className="dashboard-container h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] p-[15px] pt-[40px] pb-[100px] overflow-y-auto">
            <div className="relative w-[80%] mx-auto">
              <img
                src="/icons/three-dots.svg"
                className="absolute top-[2%] right-0 h-[35px] cursor-pointer"
                alt=""
              ></img>
              <img
                src={`${teamData?.banner_url}.jpg`}
                className="mx-auto rounded-[8px] w-full"
                alt=""
              ></img>
              <h1 className="text-fontBlue font-bold text-[35px] absolute bottom-[2%] right-[2%]">
                {teamData?.name}
              </h1>
            </div>
            <div className="flex mt-[20px] w-[80%] mx-auto">
              <div className="w-[30%]">
                <div className="border-[1px] border-gray p-[10px] rounded-[5px]">
                  <div className="flex justify-between">
                    <p className="text-blue text-left">Team Code</p>
                    <img
                      src="/icons/three-dots.svg"
                      className="cursor-pointer"
                      alt=""
                    ></img>
                  </div>
                  <p className="text-left mt-[10px] text-[30px] text-fontBlue">
                    {teamData?.code}
                  </p>
                </div>
                <div className="border-[1px] border-gray p-[10px] mt-[30px] rounded-[5px]">
                  <p className="text-blue text-left">Team Members</p>
                  <div className="flex justify-between mt-[10px]">
                    <p className="text-left text-[30px] text-fontBlue">
                      {teamData?.members}
                    </p>
                    <p className="mt-auto mb-[8px] text-orange text-[13px] hover:underline cursor-pointer">
                      Show members
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full text-fontBlue border-[1px] border-gray ml-[30px] rounded-[5px]">
                <p>Content goes here..</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
