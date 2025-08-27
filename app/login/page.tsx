"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}\nRemember me: ${remember}`);
  };

  return (
    <div className="flex bg-black h-screen justify-center items-center w-screen gap-0 font-sans">
      <div className="w-[824px] h-[838px] bg-white  rounded-2xl border border-gray  overflow-hidden flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-start">Welcome!</h1>
          <p className="text-start">Please login to access System Administrator Portal</p>

          <label htmlFor="email" className="block mb-1 font-medium">Email address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2.5 border border-gray-300 rounded"
          />

          <label htmlFor="password" className="block mb-1 font-medium">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2.5 border border-gray-300 rounded"
          />

          <label className="flex items-center mb-6 mt-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="mr-2 w-4 h-4 rounded border-gray-300"
            />
            <span className="text-gray-600 text-sm">Remember me</span>
          </label>

          <button
            type="submit"
            className="w-full p-3 bg-green-800 text-white rounded-full text-lg cursor-pointer hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
      </div>

      <div className="w-[829px] h-[838px] rounded-2xl">
  <img src="/Ltext.png" alt="DriveX Deals" className="w-[829px] h-[838px] rounded-2xl" />
  
</div>


    </div>
  );
}