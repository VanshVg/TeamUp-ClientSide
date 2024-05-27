import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/landingPage/LandingPage";
import "./App.css";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Activation from "./pages/auth/Activation";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/activation/:token" element={<Activation />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
