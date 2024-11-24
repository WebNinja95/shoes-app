import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Home from "./components/Home.jsx";
import AdminPage from "./components/Admin.jsx";
import "./css/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}
