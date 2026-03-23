'use client';

import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";

export default function CompanyHeaderEdit({ initialHeader = {}, companyName, onSave }) {

    const [header, setHeader] = useState(initialHeader);
    const [originalHeader, setOriginalHeader] = useState(initialHeader);

    const [isDirty, setIsDirty] = useState(false);

    const isEqual = (a, b) => {
        return (
            (a.logo || "") === (b.logo || "") &&
            (a.banner || "") === (b.banner || "") &&
            (a.tagline || "").trim() === (b.tagline || "").trim()
        );
    };

    const handleChange = (field, value) => {
        const updated = { ...header, [field]: value };
        setHeader(updated);
        setIsDirty(!isEqual(updated, originalHeader));
    };

    const handleFile = (field, file) => {
        if (!file) return;

        // Check file size (in bytes) - 50 KB = 50 * 1024 bytes
        if (file.size > 50 * 1024) {
            alert("File size should not exceed 50 KB");
            return;
        }

        const preview = URL.createObjectURL(file);

        const updated = {
            ...header,
            [field]: preview,
            [`${field}File`]: file
        };

        setHeader(updated);
        setIsDirty(true);
    };

    const handleSave = () => {
        onSave(header);
        setOriginalHeader(header);
        setIsDirty(false);
    };

    const handleCancel = () => {
        setHeader(originalHeader);
        setIsDirty(false);
    };

    return (
        <div className="space-y-4">

            {/* 🔥 Banner */}
            <div className="relative w-full h-[220px] md:h-[300px] rounded-lg overflow-hidden border border-gray-200">

                <img
                    src={header.banner || "https://plus.unsplash.com/premium_photo-1700251650989-ff25432c4b65?w=600"}
                    alt="banner"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80"></div>

                {/* ✅ Edit Banner */}
                <label className="absolute z-1 top-3 right-3 bg-white p-2 rounded-md cursor-pointer shadow">
                    <FiEdit3 className="text-blue-700" />
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => handleFile("banner", e.target.files[0])}
                    />
                </label>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">

                    {/* 🔥 Logo */}
                    <div className="relative">
                        <img
                            src={header.logo || "https://placehold.co/300x400?text=Logo"}
                            alt="logo"
                            className="rounded-lg border-2 h-[70px] w-[70px] md:h-[100px] md:w-[100px] mb-4 object-cover"
                        />

                        {/* ✅ Edit Logo */}
                        <label className="absolute -top-2 -right-2 bg-white p-1 rounded-md cursor-pointer shadow">
                            <FiEdit3 size={16} className="text-blue-700" />
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => handleFile("logo", e.target.files[0])}
                            />
                        </label>
                    </div>

                    {/* Company Name */}
                    <h1 className="text-white text-xl md:text-3xl font-semibold tracking-wider">
                        {companyName}
                    </h1>

                    {/* Tagline */}
                    <input
                        value={header.tagline || ""}
                        onChange={(e) => handleChange("tagline", e.target.value)}
                        placeholder="Add tagline"
                        className="mt-2 text-center bg-transparent border-b border-gray-300 text-white placeholder-gray-300 focus:outline-none"
                    />
                </div>
            </div>

            {/* Footer */}
            {isDirty && (
                <div className="flex justify-end gap-2">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-sm border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-5 py-2 btn btn-primary text-sm rounded-lg"
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
}