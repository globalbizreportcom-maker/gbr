
import ContactForm from "@/utils/ContactForm";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {

    return (
        <section className="max-w-6xl py-10 px-2 bg-white text-gray-800 mx-auto">

            <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10 mb-3 text-center">

                <div className="bg-primary text-md text-white font-semibold rounded-md mb-5 max-w-fit px-2 py-1 mx-auto">
                    CONTACT US
                </div>

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
                        src="https://images.pexels.com/photos/8867263/pexels-photo-8867263.jpeg"
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

                        {/* India Office */}
                        <div className="flex items-start gap-3 border border-gray-200 rounded-xl shadow-xs p-2 mb-10">
                            <div className="text-primary text-xl pt-1">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <h4 className="font-semibold  mb-1">India Office</h4>
                                <p className="text-gray-500 text-sm">
                                    1st Floor, Landmark Cyber Park,<br />
                                    Sector 67, Gurugram, Haryana 122102, India
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">

                            {/* Phone */}
                            <div className="flex items-start gap-3  ">
                                <div className="text-primary text-xl pt-1">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Phone</h4>
                                    <p className="text-gray-500">
                                        +91 9811160294</p>
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

                    <ContactForm />

                </div>

            </div>
        </section>
    );
}

export const metadata = {
    title: "Contact | GBR",
    description: "Learn more about Global Biz Report and our mission.",
    keywords: ["GBR", "Global Biz Report", "About"],
    openGraph: {
        title: "Contact",
        description: "What we do at Global Biz Report.",
        url: "https://yourdomain.com/about",
        siteName: "Global Biz Report",
        type: "website",
    },
};
