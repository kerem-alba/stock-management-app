import React, { useState } from "react";
import { signIn } from "../firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ setIsAuthenticated }: { setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const errorClassName = errorMessage
    ? "block bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    : "hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative";

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(https://st2.depositphotos.com/1001599/43046/v/450/depositphotos_430460192-stock-illustration-sign-page-abstract-concept-vector.jpg)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Sign in to your account</p>
          <form method="POST" onSubmit={formSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Email Address</label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              </div>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="/" className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2">
                Forget Password?
              </a>
            </div>
            <div className="mt-8">
              <button type="submit" className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                Login
              </button>
            </div>
          </form>

          <div className={errorClassName} role="alert">
            <strong className="font-bold">Login Error!</strong>
            <span className="block sm:inline">{errorMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>

          <div className="mt-4 flex items-center w-full text-center">
            <a href="/" className="text-xs text-gray-500 capitalize text-center w-full">
              Don&apos;t have any account yet?
              <Link to="/signup" className="text-blue-700">
                {" "}
                Register here!{" "}
              </Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
