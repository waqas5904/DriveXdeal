"use client";

import React, { useState } from "react";
import { MdLocationOn, MdAccessTime, MdEmail, MdPhone } from "react-icons/md";

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(
      `Submitted Data:\nName: ${form.fullName}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`
    );
    setForm({ fullName: "", email: "", phone: "", message: "" });
  }

  return (
    <div className="max-w-[1400px] mx-auto mb-12 mt-28 flex flex-wrap md:flex-nowrap gap-10 text-[#222] font-sans px-4">
      {/* Left Section */}
      <div className="flex-1">
        <h2 className="text-[26px] font-semibold mb-2">Contact Drive X Deal</h2>
        <p className="text-[16px] mb-8 text-gray-700">
          We’re here to help you with your car buying journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card Template */}
          {[
            {
              icon: <MdLocationOn size={18} />,
              title: "Head Office",
              content: "11605 West Dodge Rd, Suite 3, Omaha, NE - 68154",
            },
            {
              icon: <MdAccessTime size={18} />,
              title: "Office Hours",
              content: "Mon - Sat: 9:00 am to 7:00 pm\nSunday: Closed",
            },
            {
              icon: <MdEmail size={18} />,
              title: "Email",
              content: "contact@drivexdeals.com\ncontact@drivexdeals.com",
            },
            {
              icon: <MdPhone size={18} />,
              title: "Phone Number",
              content: "+92 330 010009\n+92 330 010009",
            },
          ].map(({ icon, title, content }, index) => (
            <div
              key={index}
              className="w-[316px] h-[184px] border border-gray-300 rounded-lg p-5 flex flex-col items-start justify-start space-y-2"
            >
              <div className="text-green-800">{icon}</div>
              <div className="font-bold text-[14px] text-green-800">{title}</div>
              <div className="text-[11px] leading-5 whitespace-pre-line">
                {content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section (Form) */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 max-w-[584px] w-full flex flex-col gap-3 p-5 border border-gray-400 rounded-lg"
      >
        <label htmlFor="fullName" className="text-[12px]">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          autoComplete="off"
          className="text-[13px] px-3 py-2 border border-gray-300 rounded focus:border-green-700 outline-none"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[12px]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              autoComplete="off"
              className="text-[13px] px-3 py-2 border border-gray-300 rounded focus:border-green-700 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-[12px]">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              autoComplete="off"
              className="text-[13px] px-3 py-2 border border-gray-300 rounded focus:border-green-700 outline-none"
            />
          </div>
        </div>

        <label htmlFor="message" className="text-[12px] mt-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Enter your Message here"
          value={form.message}
          onChange={handleChange}
          rows={5}
          className="text-[13px] px-3 py-2 border border-gray-300 rounded focus:border-green-700 outline-none resize-none"
        />

        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-green-800 text-white font-semibold rounded hover:bg-green-900 text-[14px]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
