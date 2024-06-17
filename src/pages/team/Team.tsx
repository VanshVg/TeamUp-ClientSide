import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Snackbar, Tooltip } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import Swal from "sweetalert2";

import TeamNavbar from "../../components/TeamNavbar";
import Loader from "../../components/Loader";
import { socket } from "../../socket";
import { userInterface } from "../../components/UpdateProfile";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/types";

interface teamMembersInterface {
  user_id: number;
  team_id: number;
  role: string;
}

interface userTeamsInterface {
  id: number;
  name: string;
  description: string | null;
  code: string;
  members: number;
  banner_url: string;
  is_archived: boolean;
  created_at: string;
  team_has_members: teamMembersInterface[];
}

socket.once("join", (username: string) => {
  const newUser = document.createElement("p");
  newUser.textContent = `${username} joined the team`;
  console.log(document.getElementById("content"));
  document.getElementById("content")?.appendChild(newUser);
  return socket.off("join");
});

const Team = () => {
  const [teamData, setTeamData] = useState<userTeamsInterface>();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [teamCode, setTeamCode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const params = useParams();
  const navigate = useNavigate();

  const handleResetCode = (): void => {
    Swal.fire({
      title: "Reset Code Confirmation",
      text: "Are sure you want to reset your team code?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      confirmButtonColor: "#2554c7",
      color: "#28183b",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${process.env.REACT_APP_BACKEND_URL}/team/resetCode/${
              (teamData as userTeamsInterface).id
            }`,
            {},
            { withCredentials: true }
          )
          .then((resp) => {
            if (resp.data.success) {
              Swal.fire({
                title: "Code Reset Successful",
                text: "Team code has been reset",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                setTeamCode(!teamCode);
              });
            }
          });
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/team/get/${params.id}`, {
        withCredentials: true,
      })
      .then((resp) => {
        if (resp.data.success) {
          setTeamData(resp.data.teamData);
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
  }, [params.id, teamCode]);

  return (
    <div className="h-screen">
      <Helmet>
        <title>{teamData?.name}</title>
      </Helmet>
      <div className="dashboard-container h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] pb-[100px] overflow-y-auto">
            <TeamNavbar active={"team"} />
            {isLoading ? (
              <div className="mx-auto my-auto w-[80px] mt-[17%]">
                <Loader />
              </div>
            ) : (
              <div>
                <div className="relative w-[80%] mx-auto">
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
                    {teamData?.team_has_members[0].role === "admin" ? (
                      <div className="border-[1px] relative border-gray p-[10px] mb-[30px] rounded-[5px]">
                        <div className="flex justify-between">
                          <p className="text-blue text-left">Team Code</p>
                          <Tooltip title="Reset Code">
                            <img
                              src="/icons/reset.svg"
                              className="cursor-pointer hover:bg-gray p-[8px] rounded-[22px] -mt-[8px]"
                              alt=""
                              onClick={handleResetCode}
                            ></img>
                          </Tooltip>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-left mt-[10px] text-[30px] text-fontBlue">
                            {teamData?.code}
                          </p>
                          <CopyToClipboard
                            text={teamData?.code as string}
                            onCopy={() => {
                              setOpenSnackbar(true);
                            }}
                          >
                            <Tooltip title="Copy Code">
                              <img
                                src="/icons/copy.svg"
                                alt=""
                                className="mt-[8px] hover:bg-gray p-[12px] rounded-[32px] cursor-pointer"
                              />
                            </Tooltip>
                          </CopyToClipboard>
                          <Snackbar
                            open={openSnackbar}
                            autoHideDuration={4000}
                            onClose={() => setOpenSnackbar(false)}
                            message="Team code copied to clipboard"
                          ></Snackbar>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="border-[1px] border-gray p-[10px] rounded-[5px]">
                      <p className="text-blue text-left">Team Members</p>
                      <div className="flex justify-between mt-[10px]">
                        <p className="text-left text-[30px] text-fontBlue">
                          {teamData?.members}
                        </p>
                        <p className="mt-auto mb-[8px] text-orange text-[13px] hover:underline cursor-pointer">
                          <Link to={`/team/${teamData?.id}/members`}>
                            Show members
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="w-full text-fontBlue border-[1px] border-gray ml-[30px] rounded-[5px]"
                    id="content"
                  >
                    <p>Content goes here..</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
