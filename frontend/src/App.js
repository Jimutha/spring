import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import AdminDashboard from "./components/AdminDashboard";
import SellerDashboard from "./components/SellerDashboard";
import BuyerDashboard from "./components/BuyerDashboard";
import "./App.css";

function App() {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Login setRole={setRole} setUserId={setUserId} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/seller" element={<SellerDashboard userId={userId} />} />
          <Route path="/buyer" element={<BuyerDashboard userId={userId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
