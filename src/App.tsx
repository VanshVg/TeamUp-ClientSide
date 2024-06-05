import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import LandingPage from "./pages/landingPage/LandingPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Activation from "./pages/auth/Activation";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Protect from "./components/routeProtection/Protect";
import { IsLoggedin } from "./components/routeProtection/IsLoggedin";
import ArchivedTeams from "./pages/dashboard/ArchivedTeams";
import Team from "./pages/team/Team";
import EditTeam from "./pages/team/EditTeam";
import Settings from "./pages/dashboard/Settings";
import TeamMembers from "./pages/team/TeamMembers";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<IsLoggedin Component={LandingPage} />}
          ></Route>
          <Route
            path="/register"
            element={<IsLoggedin Component={Register} />}
          ></Route>
          <Route
            path="/login"
            element={<IsLoggedin Component={Login} />}
          ></Route>
          <Route path="/activation/:token" element={<Activation />}></Route>
          <Route
            path="/forgotPassword"
            element={<IsLoggedin Component={ForgotPassword} />}
          ></Route>
          <Route
            path="/changePassword/:token"
            element={<IsLoggedin Component={ChangePassword} />}
          ></Route>
          <Route
            path="/dashboard"
            element={<Protect Component={Dashboard} />}
          ></Route>
          <Route
            path="/archived"
            element={<Protect Component={ArchivedTeams} />}
          ></Route>
          <Route
            path="/team/:id"
            element={<Protect Component={Team} />}
          ></Route>
          <Route path="/team/:id/edit" element={<EditTeam />}></Route>
          <Route path="/team/:id/members" element={<TeamMembers />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
