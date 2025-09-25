import React from "react";
import useAuth from "../hook/useAuth";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../hook/useAxiosPublic";

const SocialLogin = () => {
  const { signInWithGoogle, signInWithGitHub } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("Google login successful:", result);
        toast.success("Welcome To Google Login Successfully");
        navigate(from, { replace: true });
        // Optionally, save user info to your database
        const saveUser = {
          name: result.user.displayName,
          email: result.user.email,
          photoUrl: result.user.photoURL,
          role: "student", // default role
        };
        axiosPublic.post("/users", saveUser)
          .then((response) => {
            console.log("User saved successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error saving user:", error);
          });
      })
      .catch((error) => {
        console.error("Error during Google login:", error);
      });
  };

  const handleGitHubLogin = () => {
    signInWithGitHub()
      .then((result) => {
        console.log("GitHub login successful:", result);
        toast.success("Welcome To GitHub Login Successfully");
        navigate(from, { replace: true });
        const saveUser = {
          name: result.user.displayName,
          email: result.user.email,
          photoUrl: result.user.photoURL,
          role: "student", // default role
        };
        axiosPublic.post("/users", saveUser)
          .then((response) => {  
            console.log("User saved successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error saving user:", error);
          });
      })
      .catch((error) => {
        console.error("Error during GitHub login:", error);
      });
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <button onClick={handleGoogleLogin} className="btn btn-outline">
        <FaGoogle /> Google
      </button>
      <button onClick={handleGitHubLogin} className="btn btn-outline">
        <FaGithub /> GitHub
      </button>
    </div>
  );
};

export default SocialLogin;
