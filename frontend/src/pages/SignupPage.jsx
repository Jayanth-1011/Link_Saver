import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { LuBotMessageSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const { signUp, isSigningUp } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid Email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      toast.error(
        "Password must contain at least 1 uppercase letter, 1 digit, and 1 special character"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    signUp(formData);
  };

  return (
    <div className="hero bg-base-100 pt-16 p-5 min-h-screen w-full">
      <div className="hero-content  rounded-2xl backdrop:blur-2xl shadow-2xl bg-base-100 border-1 border-primary/70 flex-col w-xs md:w-sm">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
          <div className="flex flex-col  items-center justify-center">
            <div className="mt-3 mx-auto bg-base-200 text-primary/90 text-2xl border-1 rounded-lg p-1  shadow-2xl">
              <LuBotMessageSquare />
            </div>
            <h1 className="font-semibold text-center text-primary/80 text-xl">
              Create Account
            </h1>
            <h3 className="text-center text-base-content/60 text-sm mt-1">
              Get started with free account
            </h3>
          </div>

          <form className="card-body" onSubmit={handleSubmit}>
            <fieldset className="fieldset flex flex-col gap-1">
              <div className="flex flex-col gap-5">
                <label className="floating-label">
                  <span>Full Name</span>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input input-md  focus:outline-1 focus:outline-primary focus:border-transparent rounded-lg "
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </label>

                <label className="floating-label">
                  <span>Your Email</span>
                  <input
                    type="email"
                    placeholder="mail@site.com"
                    required
                    className="input input-md  focus:outline-1 focus:outline-primary focus:border-transparent rounded-lg "
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </label>

                <label className="floating-label relative">
                  <span>Password</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input input-md  focus:outline-1 focus:outline-primary focus:border-transparent rounded-lg "
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute p-1 cursor-pointer right-2 top-[10px] text-base-content/70"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaRegEye className="" />
                    ) : (
                      <FaRegEyeSlash />
                    )}
                  </button>
                </label>
              </div>

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={isSigningUp}
                className="btn btn-primary mt-4 rounded-lg "
              >
                {isSigningUp? "Signing up..." : "Sign Up"}
              </button>
            </fieldset>

            <h1>
              Already have an Account{" "}
              <Link className="text-primary/70" to="/login">{`Sign in`}</Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
