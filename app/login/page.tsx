"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black p-2">
      
      {/* White form card */}
      <div className="w-full md:w-[60%] bg-white flex items-center justify-center rounded-xl">
        <div className="w-4/5 md:w-3/5 flex flex-col justify-center py-10">
          {/* Welcome message */}
          <div className="pb-6 text-left">
            <h1 className="text-3xl font-bold text-black mb-2">Welcome!</h1>
            <p className="text-black-400">
              Please login to access System Administrator Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-black-400">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-black-400">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-green-600 border-gray-400 rounded focus:ring-green-700"
              />
              <label htmlFor="remember" className="text-sm text-black-600">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-900 hover:bg-orange-500 text-white font-medium py-2 px-4 rounded-3xl transition-colors duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Black area (hidden on mobile) */}
      <div className="hidden md:block w-[40%]"></div>
    </div>
  );
}
