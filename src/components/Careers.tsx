import { motion } from "framer-motion";
import { Users, Heart, Lightbulb } from "lucide-react";
import { useState } from "react";

export default function Careers() {


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
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
        <div className="bg-gradient-to-b from-[#081a2f] to-[#0f2c4d] text-white">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-24 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent"
                >
                    Join Our Team
                </motion.h1>
                <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
                    We’re building solutions that transform industries. Come be a part of our journey — where innovation meets impact.
                </p>
            </section>



            {/* Application Form */}
            <section className="max-w-3xl mx-auto px-6 py-5">
                <h2 className="text-2xl font-bold mb-8">Apply Now</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="p-3 rounded-lg w-full bg-white/10 border border-white/20 focus:border-blue-400 focus:outline-none"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="p-3 rounded-lg w-full bg-white/10 border border-white/20 focus:border-blue-400 focus:outline-none"
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="p-3 rounded-lg w-full bg-white/10 border border-white/20 focus:border-blue-400 focus:outline-none"
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="p-3 rounded-lg w-full bg-white/10 border border-white/20 focus:border-blue-400 focus:outline-none"
                    />

                    <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        required
                        className="w-full text-gray-300"
                    />

                    <label className="flex items-center space-x-3 text-gray-300">
                        <input
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            className="w-4 h-4"
                        />
                        <span>
                            By submitting this form, you have read and agreed to{" "}
                            <a href="#" className="text-blue-400 underline">
                                GHC Terms of Use
                            </a>.
                        </span>
                    </label>

                    <button
                        type="submit"
                        className="px-3 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium w-1/3 mx-auto block text-center"
                    >
                        Submit
                    </button>

                </form>
            </section>
        </div>
    );
}
