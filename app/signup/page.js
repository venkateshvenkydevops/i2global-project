"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "animate.css";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    setError(null);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = () => {
    setError("");
    setSuccess("");
  
    
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all the fields.");
      return;
    }
  
    
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format. Please enter a valid email address.");
      return;
    }
  
    
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must contain at least 8 characters, including one uppercase, one lowercase, one number, and one special character."
      );
      return;
    }
  
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === formData.email);
  
    if (userExists) {
      setError("User already exists. Please log in.");
      return;
    }
  
  
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  
  
    setSuccess("Successfully registered! Thank You...");
  

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };
  

  return (
    <div className="min-h-screen bg-[#d4dce6] flex justify-center items-center p-4 animate__animated animate__fadeIn">
      <div className="bg-[#20214e] p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-500 hover:scale-105 animate__fadeIn">
        <h2 className="text-xl text-white font-bold mb-6 text-center animate__animated animate__bounceIn">
          Signup
        </h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {success && (
          <div className="text-green-500 mb-4 text-center">{success}</div>
        )}
        <Input
          id="username"
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
        />
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
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <FaEyeSlash size={20} />
            ) : (
              <FaEye size={20} />
            )}
          </button>
        </div>
        <Button text="Signup" onClick={handleSignup} />
        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-blue-500"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
