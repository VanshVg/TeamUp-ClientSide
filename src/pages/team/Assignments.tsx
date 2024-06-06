import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import TeamNavbar from "../../components/TeamNavbar";

const Assignments = () => {
  return (
    <div className="h-screen">
      <Helmet>
        <title>Assignments</title>
      </Helmet>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-[93%] overflow-y-auto pb-[150px]">
            <TeamNavbar active={"assignments"} />
            <h3>Hello from assignments section</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
