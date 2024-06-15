import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import TeamNavbar from "../../components/TeamNavbar";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import updateTeam from "../../schemas/updateTeam";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";

export interface teamMembersInterface {
  role: string;
}

export interface userTeamsInterface {
  id: number;
  name: string;
  description: string | null;
  team_has_members: teamMembersInterface[];
}

const About = () => {
  const [teamDetails, setTeamDetails] = useState<userTeamsInterface>({
    id: 0,
    name: "",
    description: "",
    team_has_members: [{ role: "" }],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const params = useParams();
  const navigate: NavigateFunction = useNavigate();

  const teamId = params.id;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://192.168.10.72:4000/team/get/${teamId}`, {
        withCredentials: true,
      })
      .then((resp) => {
        if (resp.data.success) {
          setTeamDetails(resp.data.teamData);
        }
      })
      .catch((error) => {
        if (!error.response.data.success) {
          navigate("/error");
        }
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, []);

  const { values, errors, touched, submitForm, handleBlur, handleChange } =
    useFormik({
      enableReinitialize: true,
      initialValues: teamDetails,
      validationSchema: updateTeam,
      onSubmit: (values) => {
        axios
          .put(
            `http://192.168.10.72:4000/team/update/${teamDetails.id}`,
            values,
            {
              withCredentials: true,
            }
          )
          .then((resp) => {
            if (resp.data.success) {
              Swal.fire({
                title: "Team updated succesfully",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          })
          .catch((error) => {
            if (!error.response.data.success) {
              navigate("/error");
            }
          });
      },
    });

  const handleUpdateTeam = (): void => {
    Swal.fire({
      title: "Update Confirmation",
      text: "Are sure you want to update this team?",
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
        submitForm();
      }
    });
  };

  const handleInputChange = (e: ChangeEvent): void => {
    handleChange(e);
  };

  const handleLeaveTeam = (): void => {
    Swal.fire({
      title: "Leave Confirmation",
      text: "Are sure you want to leave this team?",
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
          .delete(`http://192.168.10.72:4000/team/leave/${teamId}`, {
            withCredentials: true,
          })
          .then((resp) => {
            if (resp.data.success) {
              navigate("/dashboard");
            }
          })
          .catch((error) => {
            if (!error.data.type.success) {
              navigate("/error");
            }
          });
      }
    });
  };

  const handleDeleteTeam = (): void => {
    Swal.fire({
      title: "Delete Confirmation",
      text: "Are sure you want to delete this team?",
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
          .delete(`http://192.168.10.72:4000/team/remove/${teamId}`, {
            withCredentials: true,
          })
          .then((resp) => {
            if (resp.data.success) {
              navigate("/dashboard");
            }
          })
          .catch((error) => {
            if (error) {
              navigate("/*");
            }
          });
      }
    });
  };

  return (
    <div className="h-screen">
      <Helmet>
        <title>About</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] overflow-y-auto pb-[150px]">
            <TeamNavbar active={"about"} />
            <div>
              <h2 className="text-blue text-[30px] font-bold text-center">
                Team Details
              </h2>
              {isLoading ? (
                <div className="mx-auto my-auto w-[80px] mt-[11%]">
                  <Loader />
                </div>
              ) : (
                <div>
                  <div className="w-[60%] mx-auto">
                    <form>
                      <div className="flex mx-auto max-w-[77%] gap-[6%] mt-[10px]"></div>
                      <div className="mt-[20px] max-w-[77%] mx-auto">
                        <div className="relative">
                          {teamDetails?.team_has_members[0].role === "admin" ? (
                            <input
                              tabIndex={1}
                              type="text"
                              id="name"
                              name="name"
                              className="block  px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto "
                              placeholder=""
                              autoComplete="off"
                              value={values.name}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                            />
                          ) : (
                            <input
                              tabIndex={1}
                              type="text"
                              id="name"
                              name="name"
                              className="block  px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto "
                              placeholder=""
                              autoComplete="off"
                              value={values.name}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              disabled
                            />
                          )}
                          <label
                            htmlFor="name"
                            className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                          >
                            Team Name
                          </label>
                        </div>
                        {errors.name && touched.name ? (
                          <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red">
                            {errors.name}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="mt-[20px] max-w-[77%] mx-auto">
                        <div className="relative">
                          {teamDetails.team_has_members[0].role === "admin" ? (
                            <input
                              tabIndex={2}
                              type="text"
                              id="description"
                              name="description"
                              className="block  px-2.5 pb-2.5 w-full h-[80px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto "
                              placeholder=""
                              autoComplete="off"
                              value={values.description as string}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                            />
                          ) : (
                            <input
                              tabIndex={2}
                              type="text"
                              id="description"
                              name="description"
                              className="block  px-2.5 pb-2.5 w-full h-[80px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto "
                              placeholder=""
                              autoComplete="off"
                              value={values.description as string}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              disabled
                            />
                          )}
                          <label
                            htmlFor="description"
                            className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                          >
                            Team Description
                          </label>
                        </div>
                        {errors.description && touched.description ? (
                          <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red">
                            {errors.description}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </form>
                  </div>
                  {teamDetails.team_has_members[0].role === "admin" ? (
                    <div
                      tabIndex={3}
                      className="text-blue border-[1px] w-[150px] p-[10px] mx-auto mt-[40px] rounded-[8px] transition duration-300 hover:bg-blue hover:text-white cursor-pointer"
                      onClick={handleUpdateTeam}
                    >
                      Update Team
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="h-[1px] bg-orange mt-[40px] w-[70%] mx-auto"></div>
                  <div className="flex w-[60%] mx-auto justify-center">
                    <div
                      tabIndex={3}
                      className="text-red border-[1px] w-[150px] p-[10px] mt-[40px] rounded-[8px] transition duration-300 hover:bg-red hover:text-white cursor-pointer"
                      onClick={handleLeaveTeam}
                    >
                      Leave Team
                    </div>
                    {teamDetails.team_has_members[0].role === "admin" ? (
                      <div
                        tabIndex={3}
                        className="text-red border-[1px] w-[150px] p-[10px] ml-[40px] mt-[40px] rounded-[8px] transition duration-300 hover:bg-red hover:text-white cursor-pointer"
                        onClick={handleDeleteTeam}
                      >
                        Delete Team
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
