import React, { useState, useEffect } from "react";
import { Trash2, MailOpen, Mail } from "lucide-react";
import axios from "axios";

const MessageViewer = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await axios.get("/api/contact", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch messages", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this message?")) return;
        try {
            const token = localStorage.getItem("adminToken");
            await axios.delete(`/api/contact/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(messages.filter((msg) => msg._id !== id));
            if (selectedMessage?._id === id) setSelectedMessage(null);
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    if (loading)
        return (
            <div className="p-8 text-center text-orange-500">
                Loading messages...
            </div>
        );

    return (
        <div className="animate-fade-in flex flex-col md:flex-row gap-6 h-[calc(100vh-120px)]">
            {/* Message List */}
            <div className="w-full md:w-1/3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Mail size={18} className="text-orange-500" /> Inbox (
                        {messages.length})
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {messages.length === 0 ? (
                        <div className="p-6 text-center text-gray-500 text-sm">
                            No messages yet.
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg._id}
                                onClick={() => setSelectedMessage(msg)}
                                className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${selectedMessage?._id === msg._id ? "bg-orange-50 border-l-4 border-l-orange-500" : "hover:bg-gray-50 border-l-4 border-l-transparent"}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-gray-900 truncate pr-2">
                                        {msg.name}
                                    </h4>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">
                                        {new Date(
                                            msg.createdAt,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-gray-700 truncate">
                                    {msg.subject}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Message Detail View */}
            <div className="w-full md:w-2/3 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                {selectedMessage ? (
                    <>
                        <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50 rounded-t-2xl">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {selectedMessage.subject}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="font-semibold">
                                        {selectedMessage.name}
                                    </span>
                                    <span>&lt;{selectedMessage.email}&gt;</span>
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    {new Date(
                                        selectedMessage.createdAt,
                                    ).toLocaleString()}
                                </div>
                            </div>
                            <button
                                onClick={() =>
                                    handleDelete(selectedMessage._id)
                                }
                                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {selectedMessage.message}
                        </div>
                        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                            <a
                                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                className="inline-block px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                            >
                                Reply via Email
                            </a>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <MailOpen size={48} className="mb-4 text-gray-200" />
                        <p>Select a message to read</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageViewer;
