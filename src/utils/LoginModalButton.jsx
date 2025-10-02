'use client';
import { useState, useEffect } from "react";
import LoginForm from "@/utils/LoginForm";

export function LoginModal({ open = false, onClose, btnTitle = 'Login' }) {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleClose = () => {
        // setIsOpen(false);
        if (onClose) onClose();
    };

    return (
        <>
            <input
                id="login-modal"
                type="checkbox"
                className="modal-toggle"
                checked={isOpen}
                onChange={() => setIsOpen(!isOpen)}
            />            <div className="modal modal-bottom sm:modal-middle" onClick={handleClose}>
                <div className="modal-box relative bg-white text-gray-800 rounded-xl shadow-lg w-full sm:max-w-4xl" onClick={e => e.stopPropagation()}>
                    {/* Close Button */}
                    <label
                        htmlFor="login-modal"
                        className="btn btn-sm shadow-none btn-circle border-0 absolute right-2 top-2 bg-transparent"
                        onClick={handleClose}
                    >
                        ✕
                    </label>

                    <div className="flex flex-col sm:flex-row h-full">
                        {/* Banner Image */}
                        <div className="sm:w-1/2 hidden sm:block">
                            <img
                                src="https://cdn.pixabay.com/photo/2022/01/20/17/51/office-desk-6952919_640.jpg"
                                alt="Login Banner"
                                className="h-full w-full object-cover rounded-lg"
                            />
                        </div>

                        {/* Login Form Section */}
                        <div className="w-full sm:w-1/2 p-2 flex flex-col justify-center">
                            <h3 className="text-lg font-semibold mb-4 text-left bg-gray-50 p-2 rounded">
                                {btnTitle}
                            </h3>
                            <div className="max-w-xs mx-auto w-full text-left">
                                <LoginForm onClose={handleClose} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function LoginModalButton({ btnTitle = 'Login', btnDisplay = 'block', open = false, onClose }) {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    return (
        <>
            {btnDisplay !== 'none' && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="outline-blue-100 cursor-pointer w-auto px-2 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-100 transition"
                >
                    {btnTitle}
                </button>
            )}

            <LoginModal open={isOpen} onClose={() => { setIsOpen(false); if (onClose) onClose(); }} btnTitle={btnTitle} />
        </>
    );
}
