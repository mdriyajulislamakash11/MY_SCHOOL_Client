import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hook/useAuth";
import useAxiosPublic from "../hook/useAxiosPublic";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SocialLogin from "../Components/SocialLogin";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        // update user profile
        updateUserProfile(data.name, data.photoUrl)
          .then(() => {
            console.log("Profile updated");

            // save user to database
            const saveUser = {
              name: data.name,
              email: data.email,
              photoUrl: data.photoUrl,
              role: data.role,
            };

            axiosPublic
              .post("/users", saveUser)
              .then((response) => {
                console.log(response.data);
                // Example: success message
                toast.success("Welcome Your Registration Successfully");
                navigate(from, { replace: true });
                Swal.fire({
                  icon: "success",
                  title: "Registration Successful!",
                  showConfirmButton: false,
                  timer: 2000,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              placeholder="Your Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password?.type === "required" && (
              <p className="text-xs text-red-600 mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-xs text-red-600 mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL <span className="text-red-500">*</span>
            </label>
            <input
              {...register("photoUrl", { required: true })}
              type="text"
              placeholder="Your Photo URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.photoUrl && (
              <p className="text-xs text-red-600 mt-1">Photo URL is required</p>
            )}
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              {...register("role", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-xs text-red-600 mt-1">Role is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg 
                       hover:bg-blue-700 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            Register
          </button>
        </form>
        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        {/* Signup redirect */}
        <p className="text-center text-gray-600 mt-6">
          have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Sign In
          </Link>
        </p>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
