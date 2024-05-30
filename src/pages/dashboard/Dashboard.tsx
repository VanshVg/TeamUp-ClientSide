import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { customErrorInterface } from "../auth/Register";
import CreateTeam from "../../components/modals/CreateTeam";
import JoinTeam from "../../components/modals/JoinTeam";

const Dashboard = () => {
  const [userTeams, setUserTeams] = useState([]);
  const [isCreateTeam, setIsCreateTeam] = useState<boolean>(false);
  const [isJoinTeam, setIsJoinTeam] = useState<boolean>(false);

  const [dashboardError, setDashboardError] = useState<customErrorInterface>({
    type: "",
    message: "",
  });

  const handleCreateTeam = () => {
    setIsCreateTeam(true);
  };

  const handleJoinTeam = () => {
    setIsJoinTeam(true);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/team/userTeams`, {
        withCredentials: true,
      })
      .then((resp) => {
        const { data } = resp;
        setUserTeams(data.userTeams);
      })
      .catch((error) => {});
  });

  return (
    <div className="h-screen">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="dashboard-container h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%]">
            {dashboardError.type ? (
              <div>{dashboardError.message}</div>
            ) : (
              <div>
                {userTeams.length === 0 ? (
                  <div>
                    <img
                      src="/background/addTeam_bg.png"
                      className="mx-auto -mt-[40px]"
                    ></img>
                    <div className="flex gap-[15px] justify-center">
                      <div
                        className="bg-blue p-[15px] border-[1px] border-blue text-white rounded-[8px] duration-300 ease-out hover:bg-white hover:text-blue cursor-pointer"
                        onClick={handleCreateTeam}
                      >
                        Create Team
                      </div>
                      <div
                        className="bg-white p-[15px] border-[1px] border-blue text-blue rounded-[8px] duration-300 ease-out hover:bg-blue hover:text-white cursor-pointer"
                        onClick={handleJoinTeam}
                      >
                        Join Team
                      </div>
                    </div>
                    <CreateTeam
                      isOpen={isCreateTeam}
                      onRequestClose={() => setIsCreateTeam(false)}
                    />
                    <JoinTeam
                      isOpen={isJoinTeam}
                      onRequestClose={() => setIsJoinTeam(false)}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
