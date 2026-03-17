import React, { useState, useEffect } from "react";
import API from "../../services/api";

const MessageViewer = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await API.get("/contact");
                setMessages(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMessages();
    }, []);

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">
                Inbound Messages
            </h2>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {messages.length === 0 ? (
                    <p className="text-gray-500">No messages yet.</p>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg._id}
                            className="bg-gray-700 p-4 rounded-lg border-l-4 border-purple-500"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-white font-bold">
                                    {msg.name}{" "}
                                    <span className="text-gray-400 font-normal text-sm ml-2">
                                        ({msg.email})
                                    </span>
                                </h3>
                                <span className="text-xs text-gray-500">
                                    {new Date(
                                        msg.createdAt,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-300 text-sm italic">
                                "{msg.message}"
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MessageViewer;
