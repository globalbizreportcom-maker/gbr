"use client";

import { useState } from "react";

export default function ImageUpload({ label, initialUrl, onChange }) {
    const [preview, setPreview] = useState(initialUrl || "");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // preview locally
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // pass file back to parent for upload
        onChange(file);
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="font-medium">{label}</label>
            {preview && (
                <img
                    src={preview}
                    alt="preview"
                    className="h-24 w-24 md:h-32 md:w-32 object-cover rounded-lg border"
                />
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1"
            />
        </div>
    );
}