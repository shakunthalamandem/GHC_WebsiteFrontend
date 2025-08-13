import React, { useState } from "react";

type CareersProps = {
  onClose: () => void;
};

export default function Careers({ onClose }: CareersProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  const [resume, setResume] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? (target as HTMLInputElement).checked : false;

    if (type === "file") {
      const files = (target as HTMLInputElement).files;
      setResume(files && files.length > 0 ? files[0] : null);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please agree to the Terms of Use before submitting.");
      return;
    }

    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("first_name", formData.first_name);
      data.append("last_name", formData.last_name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);

      // Send `message` if filled, else `additional_info`
      if (formData.message.trim()) {
        data.append("message", formData.message);
      } else {
        data.append("additional_info", "");
      }

      data.append("resume", resume);

      const response = await fetch(
        "http://192.168.1.40:1000/api/submit-career-form/",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      alert("Application submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting application. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#bfcedd] rounded-2xl shadow-lg p-8 max-w-2xl w-full relative text-gray-900">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 text-gray-700 hover:text-gray-900 text-2xl font-bold"
        aria-label="Close form"
      >
        ✕
      </button>

      <h1 className="text-3xl font-semibold text-center mb-6 tracking-wide">
        Join Our Team
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        encType="multipart/form-data"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="p-4 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900 transition"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="p-4 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900 transition"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-4 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900 transition"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="p-4 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900 transition"
        />

        <textarea
          name="message"
          placeholder="Additional Information"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="p-4 rounded-lg w-full bg-gray-100 border border-gray-300 placeholder-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 text-gray-900 resize-y transition"
        />

        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          required
          className="text-gray-700 file:bg-gray-300 file:text-gray-900 file:px-4 file:py-2 file:rounded-md file:border-none file:cursor-pointer file:hover:bg-gray-400 transition"
        />

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

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold text-white shadow-sm transition disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
