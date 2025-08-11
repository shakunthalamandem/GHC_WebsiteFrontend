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
    <div className="bg-[#bfcedd] rounded-2xl shadow-lg p-6 w-full max-w-2xl relative">
      {/* Cancel Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-black hover:text-gray-600 text-xl font-bold"
      >
        ✕
      </button>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-center mb-4"
      >
        Join Our Team
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="p-3 rounded-lg w-full bg-[#dee2ea] border border-gray-300 focus:border-blue-400 focus:outline-none"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="p-3 rounded-lg w-full bg-[#dee2ea] border border-gray-300 focus:border-blue-400 focus:outline-none"
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
          className="p-3 rounded-lg w-full bg-[#dee2ea] border border-gray-300 focus:border-blue-400 focus:outline-none"
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="p-3 rounded-lg w-full bg-[#dee2ea] border border-gray-300 focus:border-blue-400 focus:outline-none"
        />

        {/* Additional Info */}
        <textarea
          name="additionalInfo"
          placeholder="Additional Information"
          value={formData.additionalInfo}
          onChange={handleChange}
          rows={3}
          className="p-3 rounded-lg w-full bg-[#dee2ea] border border-gray-300 focus:border-blue-400 focus:outline-none resize-y"
        />

        {/* File Upload */}
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          required
          className="w-full text-gray-600"
        />

        {/* Checkbox */}
        <label className="flex items-start space-x-2 text-gray-700 text-sm">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="w-4 h-4 mt-1"
          />
          <span>
            By submitting this form, you agree to{" "}
            <a href="#" className="text-blue-500 underline">
              GHC Terms of Use
            </a>.
          </span>
        </label>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
