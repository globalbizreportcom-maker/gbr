import Image from "next/image";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
    return (
        <section className="max-w-6xl py-10 px-2 bg-white text-gray-800 mx-auto">

            <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10 mb-3 text-center">

                <button className="btn btn-primary text-md text-white rounded-md mb-5">
                    CONTACT US
                </button>

                <h2 className=" max-w-2xl mx-auto text-3xl md:text-4xl font-bold mb-6 text-center">
                    <span className="text-primary">We would love to hear from you.</span>   Our teams are here to help.
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    Trust in our reliable reports to gain valuable insights into potential partners, customers and vendors, ensuring a secure and thriving business future.
                </p>
            </div>

            <div className="w-full mx-auto grid md:grid-cols-2 gap-12 items-start">


                <div className="grid gap-6 md:grid-cols-1 bg-white p-6 md:p-10 rounded-2xl ">

                    <img
                        src="https://img.freepik.com/free-photo/beautiful-biophilic-scene_23-2151897506.jpg?uid=R133306793&ga=GA1.1.1773690977.1730112906&semt=ais_hybrid&w=740"
                        alt="About Global Biz Report"
                        className="w-full h-[400px] object-cover rounded-xl"
                    />
                    {/* Right Content */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-xl md:text-xl font-bold mb-2">
                            Need assistance? We are here to help.
                        </h2>
                        <p className="text-gray-400 text-sm mb-10 max-w-md">
                            Please send us your message and we would be happy to help you.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                            {/* India Office */}
                            <div className="flex items-start gap-3 border border-gray-200 rounded-xl shadow-xs p-2">
                                <div className="text-primary text-xl pt-1">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4 className="font-semibold  mb-1">India Office</h4>
                                    <p className="text-gray-500">
                                        1st Floor, Landmark Cyber Park,<br />
                                        Sector 67, Gurugram, Haryana 122102, India
                                    </p>
                                </div>
                            </div>

                            {/* US Office */}
                            <div className="flex items-start gap-3 border border-gray-200 rounded-xl shadow-xs p-2">
                                <div className="text-primary text-xl pt-1">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">US Office</h4>
                                    <p className="text-gray-500">
                                        539 W. Commerce #567,<br />
                                        Dallas TX 75208, United States
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-3  ">
                                <div className="text-primary text-xl pt-1">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Phone</h4>
                                    <p className="text-gray-500">
                                        +91-9811160294</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3  ">
                                <div className="text-primary text-xl pt-1">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Email</h4>
                                    <p className="text-gray-500">
                                        support@globalbizreport.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right: Contact Form */}
                <div className="  rounded-xl shadow-xs p-8">
                    <h3 className="text-xl text-primary font-semibold mb-6">
                        Send a Message
                    </h3>

                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {/* Full Name */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="input input-bordered w-full bg-white border border-gray-300 focus:border-black focus:ring-0 h-[50px]"
                                required
                            />
                        </div>

                        {/* Email Address */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium mb-1 text-gray-500">Email Address</label>
                            <input
                                type="email"
                                placeholder="yourname@example.com"
                                className="input input-bordered w-full bg-white border border-gray-300 focus:border-black focus:ring-0 h-[50px]"
                                required
                            />
                        </div>

                        {/* Subject Dropdown - Full Width */}
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium mb-1 text-gray-500">Subject</label>
                            <select className="select select-bordered w-full h-[50px] bg-white border border-gray-300 focus:border-black focus:ring-0" required>
                                <option value="" disabled>-- Select a subject --</option>
                                <option value="general">General Enquiry</option>
                                <option value="pricing">Pricing Related</option>
                                <option value="support">Support</option>
                                <option value="report-request">Report Request</option>
                                <option value="partnership">Partnership</option>
                            </select>
                        </div>

                        {/* Message - Full Width */}
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-sm font-medium mb-1 text-gray-500">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Write your message here..."
                                className="textarea textarea-bordered w-full bg-white border border-gray-300 focus:border-black focus:ring-0"
                                required
                            ></textarea>
                        </div>

                        {/* reCAPTCHA - Full Width */}
                        <div className="col-span-1 sm:col-span-2">
                            {/* Replace with <ReCAPTCHA sitekey="your-site-key" onChange={...} /> */}
                            <div className="h-[80px] bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center text-sm text-gray-500 italic">
                                reCAPTCHA placeholder
                            </div>
                        </div>

                        {/* Submit Button - Aligned Left on Large, Center on Small */}
                        <div className="col-span-1 sm:col-span-2 text-center">
                            <button type="submit" className="btn btn-primary w-full sm:w-[200px]">
                                Submit
                            </button>
                        </div>

                    </form>

                </div>

            </div>
        </section>
    );
}
