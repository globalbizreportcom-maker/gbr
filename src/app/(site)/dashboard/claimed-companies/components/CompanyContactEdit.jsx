'use client';

import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";

export default function CompanyContactEdit({ initialContact = {}, govtData, onSave }) {

    const [contact, setContact] = useState(initialContact);
    const [originalContact, setOriginalContact] = useState(initialContact);

    const [editingField, setEditingField] = useState(null);
    const [isDirty, setIsDirty] = useState(false);

    const isEqual = (a, b) => {
        return (
            // (a.address || "").trim() === (b.address || "").trim() &&
            (a.phone || "").trim() === (b.phone || "").trim() &&
            (a.email || "").trim() === (b.email || "").trim() &&
            (a.website || "").trim() === (b.website || "").trim() &&
            (a.workingHours || "").trim() === (b.workingHours || "").trim()
        );
    };

    const handleChange = (field, value) => {
        const updated = { ...contact, [field]: value };
        setContact(updated);
        setIsDirty(!isEqual(updated, originalContact));
    };

    const handleSave = () => {
        onSave(contact);
        setOriginalContact(contact);
        setEditingField(null);
        setIsDirty(false);
    };

    const handleCancel = () => {
        setContact(originalContact);
        setEditingField(null);
        setIsDirty(false);
    };

    const contactUI = [
        // { key: "address", title: "Address", span: "md:col-span-2" },
        { key: "phone", title: "Phone" },
        { key: "email", title: "Email" },
        { key: "website", title: "Website" },
        { key: "workingHours", title: "Working Hours", span: "md:col-span-2" },
    ];

    return (
        <div className="py-8">

            <h2 className="text-xl font-semibold text-black mb-6">
                Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-600">


                <div className=" rounded-lg p-4 ">
                    <p className="font-medium text-black mb-1">Address</p>
                    {govtData.registered_office_address}
                </div>


                {contactUI.map((item, i) => (
                    <div key={i} className={`rounded-lg p-4 ${item.span || ""}`}>

                        {/* Header */}
                        <div className="flex justify-between items-center mb-1">
                            <p className="font-medium text-black">{item.title}</p>

                            <button
                                onClick={() => setEditingField(item.key)}
                                className="p-2  btn btn-primary btn-xs btn-outline flex items-center gap-2"
                            >
                                Edit
                                <FiEdit3 />
                            </button>
                        </div>

                        {/* Content */}
                        {editingField === item.key ? (
                            item.key === "address" ? (
                                <textarea
                                    autoFocus
                                    value={contact[item.key] || ""}
                                    onChange={(e) => handleChange(item.key, e.target.value)}
                                    className="w-full border rounded-md p-2 text-sm"
                                    rows={4}
                                />
                            ) : (
                                <input
                                    autoFocus
                                    value={contact[item.key] || ""}
                                    onChange={(e) => handleChange(item.key, e.target.value)}
                                    className="w-full border rounded-md px-2 py-1"
                                />
                            )
                        ) : (
                            <>

                                <p className="whitespace-pre-line">
                                    {contact[item.key] || "-"}
                                </p>
                            </>
                        )}
                    </div>
                ))}

            </div>

            {/* Footer */}
            {isDirty && (
                <div className="flex justify-end gap-2 mt-4">
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
        </div>
    );
}