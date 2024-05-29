import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="dashboard-container h-[100vh] overflow-hidden">
        <Navbar />
        <Sidebar />
      </div>
    </>
  );
};

export default Dashboard;
