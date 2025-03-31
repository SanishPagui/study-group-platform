import React, { useState } from "react";
import Link from 'next/link'

const Signup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    if (response.ok) {
      console.log("User created successfully");
      onClose();
    } else {
      console.error("Failed to create user");
    }
  }

  if (!isOpen) return null; // Hide modal when not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name" 
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email" 
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Create a password" 
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              minLength={8}
              required
            />
            <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
          </div>
          
          <div className="flex items-center mt-2">
            <input 
              type="checkbox" 
              id="terms" 
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </label>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mt-4"
          >
            Sign Up
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account? <Link href={"/"} className="text-blue-600 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;