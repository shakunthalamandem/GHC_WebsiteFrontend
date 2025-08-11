import React, { useState } from "react";

type CareersProps = {
  onClose: () => void;
};

export default function Careers({ onClose }: CareersProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    additionalInfo: "",
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
      if (files && files.length > 0) {
        setResume(files[0]);
      } else {
        setResume(null);
      }
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

    // Google Forms can't accept files, so we only send text fields to Google Forms.
    // You need a backend or external service to upload the resume file separately.

    const googleFormData = new FormData();
    googleFormData.append("entry.1232135039", formData.firstName);
    googleFormData.append("entry.1432621120", formData.lastName);
    googleFormData.append("entry.1900684760", formData.email);
    googleFormData.append("entry.1044166971", formData.phone);
    googleFormData.append("entry.30360097", formData.additionalInfo);

    try {
      const googleFormURL =
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd0oZrdG2rPR2gq2AArZKCOfg3ZWzUby7J809bYDSILM_UoAQ/formResponse";

      await fetch(googleFormURL, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData,
      });

      // TODO: handle resume upload here (backend or third-party service)

      alert("Application submitted successfully!");
      onClose();
    } catch (error) {
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

      <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
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
          name="additionalInfo"
          placeholder="Additional Information"
          value={formData.additionalInfo}
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
