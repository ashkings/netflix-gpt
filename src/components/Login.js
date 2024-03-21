import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Header from "./Header";
import { addUser } from "../utils/redux/userSlice";
import { BACKGROUND_IMG } from "../utils/contant";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const handleSubmitClick = () => {
    const userCred = {
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      name: nameRef?.current?.value,
    };

    const message = checkValidData(
      userCred.email,
      userCred.password,
      !isSignInForm ? userCred.name : "not required"
    );
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // SignUp Logic
      createUserWithEmailAndPassword(auth, userCred.email, userCred.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: userCred.name,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              dispatch(
                addUser({
                  uid: auth.currentUser.uid,
                  email: auth.currentUser.email,
                  displayName: auth.currentUser.displayName,
                  photoURL: auth.currentUser.photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error?.message);
            });
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // SignIn Logic
      signInWithEmailAndPassword(auth, userCred.email, userCred.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BACKGROUND_IMG} alt="background-img" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-4/12 p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="p-3 my-4 w-full bg-gray-700 rounded-sm"
          />
        )}
        <input
          ref={emailRef}
          type="text"
          placeholder="Email Address"
          className="p-3 my-4 w-full bg-gray-700 rounded-sm"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="p-3 my-4 w-full bg-gray-700 rounded-sm"
        />
        {errorMessage && (
          <h1 className="font-bold text-red-500">{errorMessage}</h1>
        )}
        <button
          className="p-3 my-6 bg-red-600 w-full rounded-md"
          onClick={handleSubmitClick}
        >
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
