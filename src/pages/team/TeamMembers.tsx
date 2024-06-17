import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { userInterface } from "../../components/UpdateProfile";
import TeamNavbar from "../../components/TeamNavbar";
import UserProfile from "../../components/modals/UserProfile";
import Loader from "../../components/Loader";

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
  const [userData, setUserData] = useState<userInterface>();
  const [members, setMembers] = useState<number>(0);
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const params = useParams();
  const navigate = useNavigate();

  const teamId: string | undefined = params.id;
  let role: string = "";

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/team/members/${teamId}`, {
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
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [isProfile]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/team/get/${params.id}`, {
        withCredentials: true,
      })
      .catch((error) => {
        const { data } = error.response;
        if (!data.success) {
          navigate("/error");
        }
      });
  }, []);

  const handleProfile = (id: number, user: boolean) => {
    setIsAdmin(user);
    setUserId(id);
    setIsProfile(true);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/profile`, {
        withCredentials: true,
      })
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
            {isLoading ? (
              <div className="mx-auto my-auto w-[80px] mt-[17%]">
                <Loader />
              </div>
            ) : (
              <div>
                <div className="max-w-[80%] mx-auto mt-[35px]">
                  <h2 className="text-blue text-[35px] text-left font-bold">
                    Admins
                  </h2>
                  <div className="h-[1px] bg-blue"></div>
                  <div className="max-w-[95%] mx-auto">
                    {teamMembers &&
                      teamMembers.map((element, index) => {
                        if (element.user_id === userData?.id)
                          role = element.role;
                        return (
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
                                {userData?.username ===
                                element["user"]["username"] ? (
                                  <p className="ml-[15px] mt-[3px] text-fontBlue text-[20px]">
                                    You
                                  </p>
                                ) : (
                                  <p
                                    className="ml-[15px] mt-[3px] hover:underline cursor-pointer text-fontBlue text-[20px]"
                                    onClick={() =>
                                      handleProfile(
                                        element["user"]["id"] as number,
                                        true
                                      )
                                    }
                                  >
                                    {element["user"]["username"]}
                                  </p>
                                )}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}
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
                                    {userData?.username ===
                                    element["user"]["username"] ? (
                                      <p className="ml-[15px] mt-[3px] text-fontBlue text-[20px]">
                                        You
                                      </p>
                                    ) : (
                                      <p
                                        className="ml-[15px] mt-[3px] hover:underline cursor-pointer text-fontBlue text-[20px]"
                                        onClick={() =>
                                          handleProfile(
                                            element["user"]["id"] as number,
                                            false
                                          )
                                        }
                                      >
                                        {element["user"]["username"]}
                                      </p>
                                    )}
                                  </div>
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
                <UserProfile
                  isOpen={isProfile}
                  isAdmin={isAdmin}
                  role={role}
                  onRequestClose={() => setIsProfile(false)}
                  teamId={teamMembers?.[0].team_id as number}
                  userId={userId}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
