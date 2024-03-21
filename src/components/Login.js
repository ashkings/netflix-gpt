import React, { useState } from "react";
import Header from "./Header";
import { BACKGROUND_IMG } from "../utils/contant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BACKGROUND_IMG} alt="background-img" />
      </div>
      <form className="absolute w-4/12 p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 my-4 w-full bg-gray-700 rounded-sm"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-3 my-4 w-full bg-gray-700 rounded-sm"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 my-4 w-full bg-gray-700 rounded-sm"
        />
        <button className="p-3 my-6 bg-red-600 w-full rounded-md">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now"
            : "Already a registered user? Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
