'use client';

import { useState } from "react";
import { FaEdit, FaCalendarAlt, FaUsers, FaIndustry, FaCheckCircle } from "react-icons/fa";
import { FiEdit, FiEdit2, FiEdit3 } from "react-icons/fi";

export default function CompanyStatsEdit({ initialStats = {}, govtData, onSave }) {

    const [stats, setStats] = useState(initialStats);
    const [originalStats, setOriginalStats] = useState(initialStats);

    const [editingField, setEditingField] = useState(null);
    const [isDirty, setIsDirty] = useState(false);

    const isEqual = (a, b) => {
        return (
            (a.founded || "").trim() === (b.founded || "").trim() &&
            (a.employees || "").trim() === (b.employees || "").trim()
        );
    };

    const handleChange = (field, value) => {
        const updated = { ...stats, [field]: value };
        setStats(updated);
        setIsDirty(!isEqual(updated, originalStats));
    };

    const handleSave = () => {
        onSave(stats);
        setOriginalStats(stats);
        setEditingField(null);
        setIsDirty(false);
    };

    const handleCancel = () => {
        setStats(originalStats);
        setEditingField(null);
        setIsDirty(false);
    };

    //  EXACT SAME UI STRUCTURE
    const statsUI = [
        {
            key: "founded",
            title: "Founded",
            value: stats.founded || "-",
            icon: <FaCalendarAlt className="text-blue-600 text-lg" />,
            editable: true,
        },
        {
            key: "employees",
            title: "Employees",
            value: stats.employees || "-",
            icon: <FaUsers className="text-orange-600 text-lg" />,
            editable: true,
        },
        {
            key: "industry",
            title: "Industry",
            value: govtData?.companyindustrialclassification,
            icon: <FaIndustry className="text-gray-600 text-lg" />,
            editable: false,
        },
        {
            key: "status",
            title: "Status",
            value: govtData?.companystatus,
            icon: <FaCheckCircle className="text-green-600 text-lg" />,
            editable: false,
        },
    ];

    return (
        <>

            {/* Footer */}
            {isDirty && (
                <div className="col-span-full flex justify-start gap-2 pt-2">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-sm border rounded-lg btn btn-sm btn-inherit shadow-none"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-5 py-2 btn btn-primary text-sm  btn-sm rounded-lg"
                    >
                        Save Changes
                    </button>
                </div>

            )}

            {statsUI.map((item, i) => (
                <div
                    key={i}
                    className="bg-gray-50 rounded-xl p-5 flex flex-col gap-3"
                >

                    {/* 🔥 SAME HEADER UI */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            {item.icon}
                            <span>{item.title}</span>
                        </div>

                        {item.editable && (
                            <button
                                onClick={() => setEditingField(item.key)}
                                className="hidden md:flex btn-xs btn btn-primary btn-outline w-fit items-center gap-2"
                            >
                                <p className="mr-2">Edit</p>
                                <FiEdit3 />
                            </button>
                        )}
                    </div>

                    {/* 🔥 SAME VALUE STYLE */}
                    {editingField === item.key ? (
                        <>
                            <input
                                placeholder="Enter values ..."
                                autoFocus
                                title={item.key}
                                type="number"
                                value={stats[item.key] || ""}
                                onChange={(e) =>
                                    handleChange(item.key, e.target.value)
                                }
                                className="text-lg md:text-xl  border border-gray-300 text-gray-700 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-200"
                            />


                        </>
                    ) : (

                        <>
                            <div className="text-lg md:text-xl font-semibold text-gray-900">
                                {item.value}
                            </div>

                            {item.editable && (
                                <button
                                    onClick={() => setEditingField(item.key)}
                                    className="flex md:hidden btn-xs btn btn-primary btn-outline w-fit items-center gap-2"
                                >
                                    <p className="mr-2">Edit</p>
                                    <FiEdit3 />
                                </button>
                            )}
                        </>


                    )}


                </div>
            ))}


        </>
    );
}