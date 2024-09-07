import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Stocks from "./components/Stocks";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Stocks /> : <Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
