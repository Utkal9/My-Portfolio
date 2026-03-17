const Certifications = () => {
    const certs = [
        { title: "Cloud Computing", issuer: "NPTEL", date: "Oct 2024" },
        { title: "Node.js Backend", issuer: "Coursera", date: "May 2024" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
            {certs.map((cert) => (
                <motion.div
                    whileHover={{ y: -10 }}
                    className="glass-morph p-6 rounded-3xl border border-white/10 group cursor-pointer"
                >
                    <span className="text-xs text-neoPrimary font-mono uppercase">
                        {cert.issuer} [cite: 115]
                    </span>
                    <h3 className="text-xl font-bold mt-2 group-hover:text-neoPrimary transition-colors">
                        {cert.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-4">
                        {cert.date} [cite: 117]
                    </p>
                </motion.div>
            ))}
        </div>
    );
};
