import React from "react";
import RegistrationForm from "@/utils/RegistrationForm";

const RegisterPage = () => {
    return (
        <section className="max-w-6xl py-10 px-2 bg-white text-gray-800 mx-auto">
            {/* Banner */}
            <div className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-blue-100 via-white to-orange-100 p-10 mb-3 text-center">
                <div className="bg-primary text-md text-white font-semibold rounded-md mb-5 max-w-fit px-2 py-1 mx-auto uppercase">
                    Register
                </div>
                <h2 className="max-w-2xl mx-auto text-3xl md:text-4xl font-bold mb-6 text-center">
                    <span className="text-primary">Join Us Today.</span> Create Your Account
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    Become part of our international business community. Sign up to access dashboards, services, and opportunities tailored for global professionals.
                </p>
            </div>

            {/* Client-side Registration Form */}
            <div className="w-full max-w-9xl bg-white p-8 mx-auto">
                <h2 className="text-xl font-bold mb-6 text-gray-400 text-left">
                    Register Now!
                </h2>
                <div className="w-full  mx-auto">
                    <RegistrationForm />
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
