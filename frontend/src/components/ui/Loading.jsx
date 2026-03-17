import React from "react";

const Loading = () => (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-blue-500 mt-4 font-mono animate-pulse text-sm">
            Waking up the server...
        </p>
    </div>
);

export default Loading;
