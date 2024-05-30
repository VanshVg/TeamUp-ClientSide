import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="dashboard-container">
        <Navbar />
        <div className="flex h-[100vh]">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
