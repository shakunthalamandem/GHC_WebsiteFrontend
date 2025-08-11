import { MapPin, Phone, Mail } from "lucide-react";
import usaIcon from "@/assets/usa.png";
import indiaIcon from "@/assets/india.png";

interface ContactUsProps {
    onClose: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="rounded-2xl w-full max-w-4xl relative overflow-hidden bg-[#bfcedd] text-gray-800 shadow-2xl p-8">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10 text-2xl"
                >
                    ✕
                </button>

                <h2 className="text-3xl font-bold mb-8 text-center text-[#2c3e50]">Contact Us</h2>

                {/* Locations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* India Office */}
                    <div className="flex flex-col items-start bg-[#dee2ea] border border-gray-300 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={indiaIcon} alt="India Location" className="w-10 h-10" />
                            <h3 className="text-xl font-semibold text-[#1a3c6e]">
                                Golden Hills Capital India Pvt Ltd.
                            </h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Unit A, 26th Floor, Eastern Block,<br />
                            Vamsiram Suvarna Durga Tech Park,<br />
                            Survey No 142, Nanakramguda, Financial District,<br />
                            Hyderabad, Telangana 500032
                        </p>
                        <div className="mt-4 flex items-center gap-3 text-gray-700">
                            <Phone className="text-green-500 w-5 h-5" />
                            <span>
                                +91-7207011234 <br />
                                +91-8919293838
                            </span>
                        </div>
                        <div className="mt-2 flex items-center gap-3 text-gray-700">
                            <Mail className="text-blue-500 w-5 h-5" />
                            <span>ghcadmin@goldenhillsindia.com</span>
                        </div>
                    </div>

                    {/* USA Office */}
                    <div className="flex flex-col items-start bg-[#dee2ea] border border-gray-300 p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={usaIcon} alt="USA Location" className="w-10 h-10" />
                            <h3 className="text-xl font-semibold text-[#1a3c6e]">Golden Hills (USA)</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Flowermound,<br />
                            Texas, USA
                        </p>
                        <div className="mt-4 flex items-center gap-3 text-gray-700">
                            <Phone className="text-green-500 w-5 h-5" />
                            <span>+1 917-546-9180</span>
                        </div>
                        <div className="mt-2 flex items-center gap-3 text-gray-700">
                            <Mail className="text-blue-500 w-5 h-5" />
                            <span>ghcadmin@goldenhillsindia.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
