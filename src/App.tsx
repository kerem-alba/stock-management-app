import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
