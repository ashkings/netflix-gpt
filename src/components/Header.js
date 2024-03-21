import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { NETFLIX_LOGO } from "../utils/contant";
import { auth } from "../utils/firebase";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-52" src={NETFLIX_LOGO} alt="logo" />
      {user && (
        <div className="flex gap-2 p-2 items-center">
          <img
            className="h-12 w-12"
            src={
              user.photoUrl ||
              "https://occ-0-3213-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABStlS0MPUGcy6Ovyeia-3ddnnXNb2Lri4P4H4QCFuR_yaGs0umyqHUDOZcOBKF8MFUGHX07txAW70z7wq_S9AKGQ_MixrLQ.png?r=a4b"
            }
            alt="user-icon"
          />
          <button className="font-bold text-white" onClick={handleSignout}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
