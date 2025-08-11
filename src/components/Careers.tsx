import { motion } from "framer-motion";
import { useState } from "react";

export default function Careers({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    additionalInfo: "",
    resume: null,
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Please agree to the Terms of Use before submitting.");
      return;
    }
    console.log("Form submitted:", formData);
    alert("Application submitted successfully!");
  };

  return (
    <div className="bg-[#bfcedd] rounded-2xl shadow-lg p-8 max-w-2xl w-full relative text-gray-900">
      {/* Cancel Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 text-gray-700 hover:text-gray-900 text-2xl font-bold"
        aria-label="Close form"
      >
        ✕
      </button>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold text-center mb-6 tracking-wide"
      >
        Join Our Team
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="p-4 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900 transition"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="p-4 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900 transition"
          />
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-4 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900 transition"
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="p-4 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900 transition"
        />

        {/* Additional Info */}
        <textarea
          name="additionalInfo"
          placeholder="Additional Information"
          value={formData.additionalInfo}
          onChange={handleChange}
          rows={4}
          className="p-4 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900 resize-y transition"
        />

        {/* File Upload */}
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          required
          className="text-gray-700 file:bg-gray-300 file:text-gray-900 file:px-4 file:py-2 file:rounded-md file:border-none file:cursor-pointer file:hover:bg-gray-400 transition"
        />

        {/* Checkbox */}
        <label className="flex items-start space-x-3 text-gray-700 text-sm cursor-pointer select-none">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="w-5 h-5 mt-1 rounded border-gray-300 focus:ring-2 focus:ring-gray-400 cursor-pointer"
          />
          <span>
            By submitting this form, you agree to{" "}
            <a href="#" className="text-blue-600 underline hover:text-blue-800">
              GHC Terms of Use
            </a>
            .
          </span>
        </label>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold text-white shadow-sm transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
