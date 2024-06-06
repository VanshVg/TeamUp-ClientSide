import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { userInterface } from "../../components/UpdateProfile";
import TeamNavbar from "../../components/TeamNavbar";

interface teamMembersInterface {
  id: number;
  team_id: number;
  user_id: number;
  role: string;
  is_archived: boolean;
  user: userInterface;
}

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<teamMembersInterface[]>();
  const [useData, setUserData] = useState<userInterface>();
  const [members, setMembers] = useState<number>(0);

  const params = useParams();
  const navigate = useNavigate();

  const teamId = params.id;

  useEffect(() => {
    axios
      .get(`http://192.168.10.72:4000/team/members/${teamId}`, {
        withCredentials: true,
      })
      .then((resp) => {
        if (resp.data.success) {
          setTeamMembers(resp.data.teamMembers);
          setMembers(resp.data.members);
        }
      })
      .catch((error) => {
        const { data } = error.response;
        if (!data.success) {
          navigate("/error");
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://192.168.10.72:4000/auth/profile`, { withCredentials: true })
      .then((resp) => {
        if (resp.data.success) {
          setUserData(resp.data.userData);
        }
      })
      .catch((error) => {
        if (!error.response.data.success) {
          navigate("/error");
        }
      });
  }, []);

  return (
    <div className="h-screen">
      <Helmet>
        <title>Members</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] overflow-y-auto pb-[150px]">
            <TeamNavbar active={"members"} />
            <div className="max-w-[80%] mx-auto mt-[35px]">
              <h2 className="text-blue text-[35px] text-left font-bold">
                Admins
              </h2>
              <div className="h-[1px] bg-blue"></div>
              <div className="max-w-[95%] mx-auto">
                {teamMembers &&
                  teamMembers.map((element, index) => (
                    <div key={index}>
                      {element["role"] === "admin" ? (
                        <div className="mt-[20px] flex">
                          <div className="h-[35px] pt-[3px] bg-blue  w-[35px] rounded-[32px] text-white text-[20px]">
                            {`${element["user"][
                              "first_name"
                            ][0].toUpperCase()}${element["user"][
                              "last_name"
                            ][0].toUpperCase()}`}
                          </div>
                          {useData?.username === element["user"]["username"] ? (
                            <p className="ml-[15px] mt-[3px] hover:underline cursor-pointer text-fontBlue text-[20px]">
                              You
                            </p>
                          ) : (
                            <p className="ml-[15px] mt-[3px] hover:underline cursor-pointer text-fontBlue text-[20px]">
                              {element["user"]["username"]}
                            </p>
                          )}
                          {index !== teamMembers.length - 1 ? (
                            <div className="h-[1px] bg-gray mt-[10px]"></div>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="max-w-[80%] mx-auto mt-[45px]">
              <h2 className="text-blue text-[35px] text-left font-bold">
                Members
              </h2>
              <div className="h-[1px] bg-blue"></div>
              <div className="max-w-[95%] mx-auto">
                {members > 0 ? (
                  <>
                    {teamMembers &&
                      teamMembers.map((element, index) => (
                        <>
                          {element["role"] === "member" ? (
                            <>
                              <div className="mt-[20px] flex">
                                <div className="h-[35px] pt-[3px] bg-blue  w-[35px] rounded-[32px] text-white text-[20px]">
                                  {`${element["user"][
                                    "first_name"
                                  ][0].toUpperCase()}${element["user"][
                                    "last_name"
                                  ][0].toUpperCase()}`}
                                </div>
                                {useData?.username ===
                                element["user"]["username"] ? (
                                  <p className="ml-[15px] mt-[3px] hover:underline cursor-pointer text-fontBlue text-[20px]">
                                    You
                                  </p>
                                ) : (
                                  <p className="ml-[15px] mt-[3px] hover:underline cursor-pointer text-fontBlue text-[20px]">
                                    {element["user"]["username"]}
                                  </p>
                                )}
                              </div>
                              {index !== teamMembers.length - 1 ? (
                                <div className="h-[1px] bg-gray mt-[10px]"></div>
                              ) : (
                                ""
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                  </>
                ) : (
                  <div className="text-red mt-[10px]">
                    No members are there in this team...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
