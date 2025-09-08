'use client';

import { useState } from 'react';
import { apiUrl } from '@/api/api';

const LoginForm = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            email: formData.email,
            password: formData.password,
        };

        try {
            const res = await fetch(`${apiUrl}/login/form-submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                console.log(res);
                alert('Message sent!');
                setFormData({ fullName: '', email: '', subject: null, message: '' });
            } else {
                alert('Failed to send message');
            }
        } catch (err) {
            console.log(err);
            alert('Something went wrong.');
        }
    };

    return (

        <form onSubmit={handleSubmit} className="gap-6">

            {/* Email */}
            <div className=" mb-5">
                <label className="block text-sm font-medium mb-1 text-gray-500">Email Address</label>
                <input
                    type="email"
                    name="email"
                    placeholder="yourname@example.com"
                    className="input input-bordered w-full bg-white border border-gray-300 focus:border-black focus:ring-0 h-[50px]"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div className=" mb-10">
                <label className="block text-sm font-medium mb-1 text-gray-500">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="yourname@example.com"
                    className="input input-bordered w-full bg-white border border-gray-300 focus:border-black focus:ring-0 h-[50px]"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>


            {/* Submit */}
            <div className="col-span-1 sm:col-span-2 text-center">
                <button type="submit" className="btn btn-primary w-full sm:w-[200px]">
                    Submit
                </button>
            </div>
        </form>

    );
};

export default LoginForm;
