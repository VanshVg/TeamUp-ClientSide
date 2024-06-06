import { Link, useParams } from "react-router-dom";

interface teamProps {
  active: string;
}

const TeamNavbar = (props: teamProps) => {
  const { active } = props;

  const params = useParams();
  const teamId = params.id;
  return (
    <div className="flex dashboard-navbar justify-center px-[30px] mx-auto shadow-[0.5px_0.5px_0.5px_0.5px_gray] mb-[25px] pt-[2px]">
      <Link to={`/team/${teamId}`}>
        <div
          className={
            active === "team"
              ? `text-orange underline cursor-pointer hover:bg-lightGray hover:underline p-[10px] px-[20px]`
              : `text-blue cursor-pointer hover:bg-lightGray hover:underline p-[10px] px-[20px]`
          }
        >
          Team
        </div>
      </Link>
      <Link to={`/team/${teamId}/assignments`}>
        <div
          className={
            active === "assignments"
              ? `text-orange underline cursor-pointer hover:bg-lightGray hover:underline p-[10px] px-[20px]`
              : `text-blue cursor-pointer hover:bg-lightGray hover:underline p-[10px] px-[20px]`
          }
        >
          Assignments
        </div>
      </Link>
      <Link to={`/team/${teamId}/members`}>
        <div
          className={
            active === "members"
              ? `text-orange underline cursor-pointer hover:bg-lightGray hover:underline p-[10px] px-[20px]`
              : `text-blue cursor-pointer hover:bg-lightGray hover:underline p-[10px] px-[20px]`
          }
        >
          Team Members
        </div>
      </Link>
      <Link to={`/team/${teamId}/about`}>
        <div
          className={
            active === "about"
              ? `text-orange underline cursor-pointer hover:bg-lightGray hover:underline p-[10px] px-[20px]`
              : `text-blue cursor-pointer hover:bg-lightGray hover:underline p-[10px] px-[20px]`
          }
        >
          About
        </div>
      </Link>
    </div>
  );
};

export default TeamNavbar;
