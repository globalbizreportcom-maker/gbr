"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { adminUrl } from "@/api/api";

const InboxReply = () => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const [user, setUser] = useState(null);
    const [reply, setReply] = useState("");

    const email = typeof window !== "undefined" ? sessionStorage.getItem("threadEmail") : null;


    useEffect(() => {
        fetchContact();
    }, []);

    const fetchContact = async () => {
        try {
            const res = await adminUrl.get(`/contacts/thread/${email}`);
            setContact(res.data.contact);
            setUser(res.data.user);
        } catch (err) {
            console.log(err);
        }
    };

    const sendReply = async () => {
        if (!reply.trim()) return;
        try {
            await adminUrl.post(`/contacts/thread/${email}/reply`, { message: reply });
            alert("Reply sent successfully!");
            setReply("");
        } catch (err) {
            console.log(err);
            alert("Failed to send reply");
        }
    };

    if (!contact) return <div className="p-6">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto h-[85vh] flex flex-col border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-gray-50">

            {/* Chat header */}
            <div className="bg-indigo-500 text-white p-4 flex items-center justify-between">
                <h2 className="font-semibold text-lg">Contact Chat</h2>
                <span className="text-sm opacity-80">{contact.fullName}</span>
            </div>

            {/* Chat messages area */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {contact.messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex flex-col ${msg.sender === "admin" ? "items-end" : "items-start"}`}
                    >
                        <span className="text-xs text-gray-500 mb-1">
                            {msg.sender === "admin" ? "You" : contact.fullName}
                            {msg.sender === "user" && msg.subject && (
                                <span className="ml-2 px-1 py-0.5 text-xs bg-gray-200 text-gray-800 rounded">
                                    sub:   {msg.subject}
                                </span>
                            )}
                        </span>
                        <div className={`p-4 rounded-xl shadow-md max-w-xs break-words ${msg.sender === "admin" ? "bg-indigo-500 text-white" : "bg-white"
                            }`}>
                            {msg.message}
                        </div>
                        <span className="text-xs text-gray-400 mt-1">
                            {new Date(msg.createdAt).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>


            {/* Reply box */}
            <div className="border-t-gray-500 p-4 bg-white flex gap-3 items-center">
                <textarea
                    placeholder="Type your reply..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-xl p-3 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none h-20 placeholder-gray-400"
                />
                <button
                    onClick={sendReply}
                    className="bg-gray-700 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition duration-200"
                >
                    Send
                </button>
            </div>
        </div>



    );
};

export default InboxReply;
