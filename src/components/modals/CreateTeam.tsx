import { useFormik } from "formik";
import Modal from "react-modal";
import createTeam from "../../schemas/createTeam";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { customErrorInterface } from "../../pages/auth/Register";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserTeams } from "../../redux/actions/userTeams";
import { fetchUserTeams } from "../../hooks/fetchData";

interface modalInterface {
  isOpen: boolean;
  onRequestClose: () => void;
}
const CreateTeam = (props: modalInterface) => {
  const data = {
    teamName: "",
    teamDescription: "",
  };

  const { isOpen, onRequestClose } = props;

  const [createTeamError, setCreateTeamError] = useState<customErrorInterface>({
    type: "",
    message: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, errors, handleBlur, handleChange, touched, submitForm } =
    useFormik({
      initialValues: data,
      validationSchema: createTeam,
      onSubmit: (values) => {
        axios
          .post(`http://192.168.10.72:4000/team/create`, values, {
            withCredentials: true,
          })
          .then(async (resp) => {
            if (resp.data.success) {
              try {
                let result = await fetchUserTeams();
                dispatch(setUserTeams(result.data.userTeams));
              } catch (error) {
                if (error) {
                  navigate("/*");
                }
              }
              navigate(`/team/${resp.data.teamId}`);
            }
          })
          .catch((error) => {
            const { data } = error.response;
            if (data.type === "server") {
              navigate("/*");
            } else if (!data.success) {
              setCreateTeamError({
                type: data.type,
                message: data.message,
              });
            }
          });
      },
    });

  const handleInputChange = (e: ChangeEvent) => {
    setCreateTeamError({ type: "", message: "" });
    handleChange(e);
  };

  const handleSubmit = () => {
    submitForm();
  };

  return (
    <div className="createTeam-container w-[200px]">
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Create a Team"
        className={
          "w-[50%] bg-white border-0 outline-0 mx-auto mt-[170px] shadow-[2px_2px_2px_2px_grey] rounded-[8px] pb-[30px] pt-[15px] px-[20px]"
        }
      >
        <img
          src="/icons/close.svg"
          className="flex ml-auto cursor-pointer"
          onClick={onRequestClose}
          alt=""
        ></img>
        <form>
          <h1 className="text-blue text-center text-[30px] font-bold">
            Create a Team
          </h1>
          <div className="flex mx-auto max-w-[77%] gap-[6%] mt-[20px]"></div>
          <div className="mt-[20px] max-w-[77%] mx-auto">
            <div className="relative">
              <input
                tabIndex={1}
                type="text"
                id="team-name"
                name="teamName"
                className="block  px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto "
                placeholder=""
                autoComplete="off"
                value={values.teamName}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="team-name"
                className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
              >
                Team Name
              </label>
            </div>
            {errors.teamName && touched.teamName ? (
              <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red">
                {errors.teamName}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className=" mt-[20px] max-w-[77%] mx-auto">
            <div className="flex">
              <div className="relative w-full">
                <input
                  tabIndex={2}
                  type="text"
                  id="team-description"
                  name="teamDescription"
                  className="block px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-blue bg-transparent rounded-lg border-[1px] border-blue appearance-none dark:text-blue focus:text-blue dark:border-blue dark:focus:border-blue focus:outline-none focus:ring-0 focus:border-blue peer mx-auto"
                  placeholder=""
                  autoComplete="off"
                  value={values.teamDescription}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                <label
                  htmlFor="team-description"
                  className="absolute text-sm text-blue dark:text-blue duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
                >
                  Team Description
                </label>
              </div>
            </div>
          </div>
        </form>
        <div
          tabIndex={3}
          className="text-blue text-center border-[1px] w-[150px] p-[10px] mx-auto mt-[40px] rounded-[8px] transition duration-300 hover:bg-blue hover:text-white cursor-pointer"
          onClick={handleSubmit}
        >
          Create Team
        </div>
      </Modal>
    </div>
  );
};

export default CreateTeam;
