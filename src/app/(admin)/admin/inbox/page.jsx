"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { adminUrl } from "@/api/api";

const AdminInbox = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await adminUrl.get("/contacts");
            setContacts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Inbox</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="text-black">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Received At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts
                            .slice() // create a shallow copy so original state isn't mutated
                            .sort((a, b) => {
                                const aLastMsg = a.messages[a.messages.length - 1];
                                const bLastMsg = b.messages[b.messages.length - 1];

                                // prioritize unread messages from user
                                const aUnread = aLastMsg?.sender === "user" && !aLastMsg?.read;
                                const bUnread = bLastMsg?.sender === "user" && !bLastMsg?.read;

                                if (aUnread && !bUnread) return -1; // a comes first
                                if (!aUnread && bUnread) return 1;  // b comes first
                                return new Date(bLastMsg?.createdAt) - new Date(aLastMsg?.createdAt); // otherwise sort by latest date
                            })
                            .map((c, idx) => (
                                <tr key={c._id}>
                                    <td>{idx + 1}</td>
                                    <td>{c.fullName}</td>
                                    <td>{c.email}</td>
                                    <td>
                                        {c.messages && c.messages.length > 0
                                            ? c.messages[c.messages.length - 1].subject || "-"
                                            : "-"}
                                    </td>
                                    <td className="max-w-sm flex items-center gap-2 relative">
                                        {c.messages && c.messages.length > 0 ? (() => {
                                            const lastMsg = c.messages[c.messages.length - 1];
                                            const truncatedMsg = lastMsg.message.length > 30
                                                ? lastMsg.message.slice(0, 30) + "..."
                                                : lastMsg.message;

                                            return (
                                                <>
                                                    {lastMsg.sender === "user" ? (
                                                        <div className="relative group">
                                                            <span className="cursor-pointer">{truncatedMsg}</span>
                                                            {!lastMsg.read ? (
                                                                <span className="ml-2 px-1 text-xs py-1 bg-red-500 text-white rounded-sm">new !</span>
                                                            ) : (
                                                                <span className="ml-2 text-green-600">✓✓</span>
                                                            )}

                                                            {/* Tooltip */}
                                                            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-max max-w-xs bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-10 break-words">
                                                                {lastMsg.message}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="relative group">
                                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg cursor-pointer">{truncatedMsg}</span>
                                                            <span className="ml-2 px-1 text-xs py-1 bg-green-700 text-white rounded-sm">You !</span>

                                                            {/* Tooltip */}
                                                            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-max max-w-xs bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-10 break-words">
                                                                {lastMsg.message}
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            );
                                        })() : "-"}
                                    </td>

                                    <td>
                                        {new Date(c.createdAt).toLocaleString()}
                                    </td>
                                    <td>
                                        <Link
                                            href={`/admin/inbox-reply/${c._id}`}
                                            className="btn btn-sm btn-primary"
                                            onClick={() => {
                                                sessionStorage.setItem("threadEmail", c.email);
                                            }}
                                        >
                                            View / Reply
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AdminInbox;
