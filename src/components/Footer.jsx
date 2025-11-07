import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram, FaWhatsapp } from "react-icons/fa";
import React from "react";

const Footer = () => {
    return (
        <>
            {/* Main Footer */}
            <footer className="bg-gradient-to-r from-[#0f172a] via-[#1b2636] to-[#0f172a] text-white text-sm border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* About */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3">ABOUT US</h3>
                        <p className="text-gray-400">
                            GBR is a leading provider of Business Credit Reports & Due-Diligence in over 220+ countries. Trusted by corporates, SMEs,
                            B2B platforms, financial institutions, and research firms to mitigate risk and make informed decisions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3">QUICK LINKS</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="link link-hover text-gray-400">Home</a></li>
                            <li><a href="about" className="link link-hover text-gray-400">About</a></li>
                            <li><a href="services" className="link link-hover text-gray-400">Services</a></li>
                            <li><a href="contact" className="link link-hover text-gray-400">Contact</a></li>
                        </ul>
                    </div>

                    {/* Main Services */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3">MAIN LINKS</h3>
                        <ul className="space-y-2">
                            <li><a href="/order-business-credit-report" className="link link-hover text-gray-400">Order Credit Report</a></li>
                            <li><a className="link link-hover text-gray-400">View Sample Report</a></li>
                        </ul>
                    </div>

                    {/* Contact Info + Social */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3">CONTACT INFO</h3>
                        <p className="mb-2 text-gray-400">
                            <strong>India Office:</strong><br />
                            1st Floor, Landmark Cyber Park, Sector 67, Gurugram, Haryana 122102<br />
                            Phone: +91-9811160294
                        </p>
                        {/* <p className="mb-4 text-gray-400">
                            <strong>US Office:</strong><br />
                            539 W. Commerce #567, Dallas TX 75208, United States.
                        </p> */}
                        <div className="flex gap-4 mt-2 text-blue-300 text-xl">
                            <a href="#" aria-label="Whatsapp"><FaWhatsapp /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" aria-label="YouTube"><FaYoutube /></a>
                        </div>
                    </div>

                </div>
            </footer>

            {/* Bottom Footer */}
            <footer className="bg-gradient-to-r from-[#0f172a] via-[#1b2636] to-[#0f172a] border-t border-gray-700 text-center text-xs py-5 px-4 text-gray-500">
                <div className="max-w-6xl mx-auto space-y-2">
                    <p>
                        Copyright © 2025 <span className="font-semibold">GlobalBizReport.com</span>. All Rights Reserved.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        <a href="/terms" className="link link-hover">Terms & Conditions</a>
                        <a href="privacy-policy" className="link link-hover">Privacy Policy</a>
                        <a href="refund-policy" className="link link-hover">Cancellation & Refund</a>
                        <a href="shipping-policy" className="link link-hover">Shipping & Delivery</a>
                    </div>

                    <p className="mt-3 text-gray-400 leading-relaxed max-w-4xl mx-auto">
                        GlobalBizReport provides Freshly Investigated and Comprehensive Business Credibility Reports, Credit Reports, Due Diligence,
                        Verification Services, and Background Checks across 220+ Countries Worldwide.
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
