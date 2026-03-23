"use client";
import { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

export default function CompanyAboutEdit({ initialContent, onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [about, setAbout] = useState(initialContent || "");

    const handleSave = () => {
        onSave(about);   // Call parent function to save
        setIsEditing(false);
    };

    const handleCancel = () => {
        setAbout(initialContent); // Revert to original
        setIsEditing(false);
    };

    return (
        <div className="p-5 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">About Your Company</h3>
                    <p className="text-sm text-gray-500">
                        Manage the services offered by the company
                    </p>
                </div>

                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 rounded-lg btn btn-primary btn-outline flex items-center gap-2"
                    >
                        <span>{about ? "Edit" : "Add"}</span>
                        <FaEdit />
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-2">
                    <textarea
                        rows={10}
                        autoFocus
                        placeholder="Write about your company..."
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="border border-gray-300 text-gray-700 p-2 w-full rounded"
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleCancel}
                            className="btn btn-neutral btn-outline btn-sm flex items-center gap-2"
                        >
                            <FaTimes /> Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="btn btn-primary btn-sm flex items-center gap-2"
                        >
                            <FaSave /> Save
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-700 leading-relaxed break-words">
                    {about || "No information added yet."}
                </p>
            )}
        </div>
    );
}