'use client';

import { useState, useEffect } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { apiUrl } from '@/api/api';

const Select = dynamic(() => import('react-select'), { ssr: false });

const subjectOptions = [
    { value: 'buy-credit-report', label: 'Buy New Credit Report' },
    { value: 'corporate-plan', label: 'Corporate Plan' },
    { value: 'partnership-inquiry', label: 'Partnership Inquiry' },
    { value: 'report-copy-request', label: 'Request a copy of the Report' },
    { value: 'report-query', label: 'Query about the Report Received' },
    { value: 'vc-funding', label: 'Regarding VC Funding/Investors' },
    { value: 'customer-support', label: 'Customer Support' },
    { value: 'other', label: 'Others' },
];

// ✅ Inner form (only rendered once recaptcha client is available)
const ContactFormInner = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: null,
        message: '',
    });

    const [isReady, setIsReady] = useState(false);

    // wait until executeRecaptcha is available

    useEffect(() => {
        if (executeRecaptcha) {
            setIsReady(true);
        }
    }, [executeRecaptcha]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSelectChange = (selectedOption) => {
        setFormData((prev) => ({ ...prev, subject: selectedOption }));
    };

    console.log('RECAPTCHA KEY:', process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.subject) {
            alert('❌ Please select a subject.');
            return;
        }

        if (!executeRecaptcha) {
            alert('⚠️ reCAPTCHA not ready. Please try again.');
            return;
        }

        const recaptchaToken = await executeRecaptcha('contact_form');

        const payload = {
            fullName: formData.fullName,
            email: formData.email,
            subject: formData.subject.value,
            message: formData.message,
            recaptchaToken,
        };

        try {
            const res = await apiUrl.post(`/contact/form-submit`, payload);

            if (res.data.success) {
                alert('✅ Message sent successfully');
                setFormData({ fullName: '', email: '', subject: null, message: '' });
            } else {
                alert(' Failed to send message');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong.');
        }
    };

    if (!isReady) {
        return <p className="text-center text-gray-500">Loading security check...</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    className="input input-bordered w-full bg-white border border-gray-300 focus:border-black focus:ring-0 h-[50px]"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                />
            </div>

            {/* Email */}
            <div className="col-span-1">
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

            {/* Subject */}
            <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-500">Subject</label>
                <Select
                    options={subjectOptions}
                    value={formData.subject}
                    onChange={handleSelectChange}
                    placeholder="-- Select a subject --"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    isClearable
                />
            </div>

            {/* Message */}
            <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-500">Message</label>
                <textarea
                    rows="4"
                    name="message"
                    placeholder="Write your message here.."
                    className="textarea textarea-bordered w-full bg-white border border-gray-300 focus:border-black focus:ring-0"
                    required
                    value={formData.message}
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

// ✅ Wrapper with Provider
const ContactForm = () => (
    <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        scriptProps={{ async: true, defer: true }}
    >
        <ContactFormInner />
    </GoogleReCaptchaProvider>
);

export default ContactForm;
