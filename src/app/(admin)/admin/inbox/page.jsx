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
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Inbox</h2>

            {/* Medium+ screens: table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table w-full border border-gray-200 rounded-md">
                    <thead>
                        <tr className="bg-gray-100 text-black">
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
                            .slice()
                            .sort((a, b) => {
                                const aLastMsg = a.messages[a.messages.length - 1];
                                const bLastMsg = b.messages[b.messages.length - 1];
                                const aUnread = aLastMsg?.sender === "user" && !aLastMsg?.read;
                                const bUnread = bLastMsg?.sender === "user" && !bLastMsg?.read;
                                const sendBy = aLastMsg?.sender;
                                if (aUnread && !bUnread) return -1;
                                if (!aUnread && bUnread) return 1;
                                return new Date(bLastMsg?.createdAt) - new Date(aLastMsg?.createdAt);
                            })
                            .map((c, idx) => {
                                const lastMsg = c.messages[c.messages.length - 1];
                                const truncatedMsg = lastMsg
                                    ? lastMsg.message.length > 30
                                        ? lastMsg.message.slice(0, 30) + "..."
                                        : lastMsg.message
                                    : "-";

                                return (
                                    <tr key={c._id} className="border-b border-gray-200">
                                        <td>{idx + 1}</td>
                                        <td>{c.fullName}</td>
                                        <td>{c.email}</td>
                                        <td>{lastMsg?.subject || "-"}</td>
                                        <td className="max-w-sm">
                                            {lastMsg ? (
                                                <div className="relative group">
                                                    <span className="cursor-pointer">{truncatedMsg}</span>
                                                    {!lastMsg.read && c.sendBy === "user" ? (
                                                        <span className="ml-2 px-1 text-xs py-0.5 bg-red-500 text-white rounded-sm">
                                                            new !
                                                        </span>
                                                    ) : (
                                                        <span className="ml-2 text-green-600">✓✓</span>
                                                    )}
                                                    <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-max max-w-xs bg-gray-800 text-white text-xs p-2 rounded shadow z-10 break-words">
                                                        {lastMsg.message}
                                                    </div>
                                                </div>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td>{new Date(c.createdAt).toLocaleString()}</td>
                                        <td>
                                            <Link
                                                href={`/admin/inbox-reply/${c._id}`}
                                                className="btn btn-sm btn-primary"
                                                onClick={() => sessionStorage.setItem("threadEmail", c.email)}
                                            >
                                                View / Reply
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>

            {/* Small screens: card list */}
            <div className="md:hidden flex flex-col gap-3">
                {contacts
                    .slice()
                    .sort((a, b) => {
                        const aLastMsg = a.messages[a.messages.length - 1];
                        const bLastMsg = b.messages[b.messages.length - 1];
                        const aUnread = aLastMsg?.sender === "user" && !aLastMsg?.read;
                        const bUnread = bLastMsg?.sender === "user" && !bLastMsg?.read;
                        if (aUnread && !bUnread) return -1;
                        if (!aUnread && bUnread) return 1;
                        return new Date(bLastMsg?.createdAt) - new Date(aLastMsg?.createdAt);
                    })
                    .map((c, idx) => {
                        const lastMsg = c.messages[c.messages.length - 1];
                        const truncatedMsg = lastMsg
                            ? lastMsg.message.length > 50
                                ? lastMsg.message.slice(0, 50) + "..."
                                : lastMsg.message
                            : "-";

                        return (
                            <div
                                key={c._id}
                                className="bg-white border border-gray-200 rounded-md p-4 shadow-sm flex flex-col gap-2"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">{c.fullName}</span>
                                    <span className="text-gray-500 text-xs">{new Date(c.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="text-gray-500 text-sm">{c.email}</div>
                                <div className="text-gray-700 text-sm font-medium">{lastMsg?.subject || "-"}</div>
                                <div className="text-gray-600 text-sm">{truncatedMsg}</div>
                                <div className="flex justify-end">
                                    <Link
                                        href={`/admin/inbox-reply/${c._id}`}
                                        className="btn btn-sm btn-primary"
                                        onClick={() => sessionStorage.setItem("threadEmail", c.email)}
                                    >
                                        View / Reply
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>

    );
};

export default AdminInbox;
