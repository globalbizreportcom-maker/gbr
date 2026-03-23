'use client';

import { useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function CompanyServicesEdit({ initialServices = [], onSave }) {
    const [services, setServices] = useState(initialServices);
    const [isEditing, setIsEditing] = useState(initialServices.length === 0);
    const [isDirty, setIsDirty] = useState(false);

    const handleChange = (index, field, value) => {
        const updated = [...services];
        updated[index][field] = value;
        setServices(updated);
        setIsDirty(true); // 👈 key
    };

    const handleAdd = () => {
        setIsEditing(true);
        setServices([...services, { title: "", description: "" }]);
        setIsDirty(true);
    };

    const handleRemove = (index) => {
        const updated = services.filter((_, i) => i !== index);
        setServices(updated);
        setIsDirty(true);
    };

    const handleSave = () => {
        onSave(services);
        setIsEditing(false);
        setIsDirty(false);
    };

    const handleCancel = () => {
        setServices(initialServices);
        setIsEditing(false);
        setIsDirty(false);
    };

    return (
        <div className="  rounded-xl p-5 space-y-5 w-full">

            {/* Header */}
            <div className="flex justify-between items-center w-full">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Services</h3>
                    <p className="text-sm text-gray-500">
                        Manage the services offered by the company
                    </p>
                </div>

                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 rounded-lg btn btn-primary btn-outline flex items-center gap-2"
                    >
                        Edit
                        <FaEdit />
                    </button>
                )}

                {isEditing && (
                    <button
                        onClick={handleAdd}
                        className="p-2 rounded-lg btn btn-primary btn-outline flex items-center gap-2"
                    >
                        + Add Service
                    </button>
                )}
            </div>

            {/* ================= VIEW MODE (GRID) ================= */}
            {!isEditing && services.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2"
                        >
                            <h4 className="font-medium text-gray-800">
                                {service.title || "Untitled Service"}
                            </h4>
                            <p className="text-sm text-gray-600">
                                {service.description || "No description provided"}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* ================= EDIT MODE ================= */}
            {isEditing && (
                <>
                    {/* Empty State */}
                    {services.length === 0 && (
                        <div className="text-center py-10 text-gray-500 text-sm">
                            No services added yet. Click “Add Service” to get started.
                        </div>
                    )}

                    {/* Editable List */}
                    <div className="space-y-4">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="rounded-xl p-4 space-y-3"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-600">
                                        Service {index + 1}
                                    </span>

                                    <button
                                        onClick={() => handleRemove(index)}
                                        className="text-xs text-red-500 cursor-pointer hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Service title"
                                    value={service.title}
                                    onChange={(e) =>
                                        handleChange(index, "title", e.target.value)
                                    }
                                    className="w-full bg-white border border-gray-200 text-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                />

                                <textarea
                                    placeholder="Service description"
                                    value={service.description}
                                    onChange={(e) =>
                                        handleChange(index, "description", e.target.value)
                                    }
                                    rows={3}
                                    className="w-full bg-white text-gray-700 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    {isDirty && (
                        <div className="flex justify-end pt-2 border-t gap-2">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 btn-sm text-sm border rounded-lg btn btn-inherit shadow-none"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                className="px-5 py-2 btn-sm btn btn-primary text-sm rounded-lg hover:opacity-90 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}