import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { customErrorInterface } from "../auth/Register";
import { userTeamsInterface } from "./Dashboard";
import axios from "axios";

const ArchivedTeams = () => {
  const [archivesError, setArchivesError] = useState<customErrorInterface>({
    type: "",
    message: "",
  });

  const [archivedTeams, setArchivedTeams] = useState<userTeamsInterface[]>([]);

  useEffect(() => {
    axios
      .get(`http://192.168.10.72:4000/team/archivedTeams`, {
        withCredentials: true,
      })
      .then((resp) => {
        const { data } = resp;
        setArchivedTeams(data.archivedTeams);
      })
      .catch((error) => {
        const { data } = error.response;
        setArchivesError({ type: data.type, message: data.message });
      });
  }, []);

  return (
    <div className="h-screen">
      <Helmet>
        <title>Archived Teams</title>
      </Helmet>
      <div className="dashboard-container h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] overflow-y-auto pb-[100px]">
            {archivesError.type ? (
              <div>{archivesError.message}</div>
            ) : (
              <div>
                {archivedTeams.length === 0 ? (
                  <div>
                    <img
                      src="/background/addTeam_bg.png"
                      className="mx-auto -mt-[40px]"
                      alt=""
                    ></img>
                    <div className="flex gap-[15px] text-red text-[23px] justify-center">
                      There are no teams in archives
                    </div>
                  </div>
                ) : (
                  <div className="p-[20px]">
                    <div className="flex flex-wrap mx-auto">
                      {archivedTeams &&
                        archivedTeams.map((element, index) => (
                          <div
                            className="w-[calc(100%/3)] p-[10px]"
                            key={index}
                          >
                            <div className="relative rounded-t-[8px]">
                              <img
                                src={`${element["team"]["banner_url"]}.jpg`}
                                className="rounded-t-[8px]"
                                alt=""
                              ></img>
                              <h2 className="text-fontBlue absolute text-[25px] top-[58%] right-2 text-left hover:underline cursor-pointer">
                                {element["team"]["name"].length > 13
                                  ? element["team"]["name"].slice(0, 13) + `...`
                                  : element["team"]["name"]}
                              </h2>
                              <img
                                src="/icons/three-dots.svg"
                                className="absolute right-0 top-1 cursor-pointer"
                                alt=""
                              ></img>
                            </div>
                            <div className="text-left border-[1px] border-[gray] rounded-b-[8px] -mt-[1px] h-[200px]">
                              <div className="mt-[5px] ml-[4px] h-[70%] text-fontBlue"></div>
                              <div className="h-[1px] bg-gray"></div>
                              <div className="pt-[6px] text-fontBlue"></div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchivedTeams;
