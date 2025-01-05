"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please enter  email and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      dispatch(loginUser(user));

      setSuccess("Login successful! Thank you..");
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#d4dce6] flex justify-center items-center p-4 animate__animated animate__fadeIn">
      <div className="bg-[#20214e] p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-500 hover:scale-105 animate__fadeIn">
        <h2 className="text-xl text-white font-bold mb-6 text-center animate__animated animate__bounceIn">
          Login
        </h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        {success && (
          <div className="text-green-500 mb-4 text-center">{success}</div>
        )}

        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        <Button text="Login" onClick={handleLogin} />

        <p className="text-center text-white mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-blue-500"
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
