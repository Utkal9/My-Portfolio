import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, ExternalLink, Trophy, RefreshCw } from "lucide-react";

const USERNAME = "utkal59";

export default function LeetcodeStats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchStats = async () => {
        setLoading(true);
        setError(false);

        try {
            const res = await fetch(`/api/leetcode/${USERNAME}`);
            const data = await res.json();

            if (data && data.status === "success") {
                setStats(data);
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const bars = stats
        ? [
              {
                  label: "Easy",
                  solved: stats.easySolved || 0,
                  total: stats.totalEasy || 1,
                  color: "bg-green-400",
                  text: "text-green-400",
              },
              {
                  label: "Medium",
                  solved: stats.mediumSolved || 0,
                  total: stats.totalMedium || 1,
                  color: "bg-amber-400",
                  text: "text-amber-400",
              },
              {
                  label: "Hard",
                  solved: stats.hardSolved || 0,
                  total: stats.totalHard || 1,
                  color: "bg-red-400",
                  text: "text-red-400",
              },
          ]
        : [];

    return (
        <section id="leetcode" className="py-20">
            <div className="section-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-bold tracking-widest text-accent-blue uppercase mb-3 block">
                        LeetCode
                    </span>
                    <h2 className="section-heading text-slate-900 dark:text-white">
                        Problem <span className="grad-text">Solving</span>
                    </h2>
                </motion.div>

                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-slate-100 dark:border-dark-border shadow-card-light dark:shadow-none"
                    >
                        {/* Top Section */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center">
                                    <Code2
                                        size={22}
                                        className="text-amber-400"
                                    />
                                </div>

                                {/* ✅ FIXED LINK */}
                                <div>
                                    <div className="font-bold text-slate-900 dark:text-white">
                                        {USERNAME}
                                    </div>

                                    <a
                                        href={`https://leetcode.com/u/${USERNAME}/`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs text-accent-blue hover:underline flex items-center gap-1"
                                    >
                                        leetcode.com/u/{USERNAME}
                                        <ExternalLink size={10} />
                                    </a>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/20">
                                    <Trophy
                                        size={14}
                                        className="text-amber-400"
                                    />
                                    <div>
                                        <div className="text-xs font-bold text-amber-400">
                                            Rank 1
                                        </div>
                                        <div className="text-[10px] text-slate-400">
                                            NxtWave DSA
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={fetchStats}
                                    title="Refresh live stats"
                                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-dark-card2 text-slate-400 hover:text-accent-blue transition-colors"
                                >
                                    <RefreshCw
                                        size={13}
                                        className={
                                            loading ? "animate-spin" : ""
                                        }
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Loading */}
                        {loading && (
                            <div className="text-center py-10 text-slate-400 text-sm">
                                Loading stats...
                            </div>
                        )}

                        {/* Error */}
                        {!loading && error && (
                            <div className="text-center py-8">
                                <p className="text-slate-400 text-sm mb-4">
                                    Could not load live stats
                                </p>
                                <button
                                    onClick={fetchStats}
                                    className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-grad-main text-white hover:scale-105 transition-all"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {/* Live Stats */}
                        {!loading && !error && stats && (
                            <>
                                {/* Total */}
                                <div className="text-center mb-8">
                                    <div className="text-6xl font-extrabold grad-text mb-1">
                                        {stats.totalSolved || 0}
                                    </div>
                                    <div className="text-sm text-slate-400">
                                        Problems Solved
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">
                                        out of{" "}
                                        {stats.totalQuestions?.toLocaleString() ||
                                            "—"}{" "}
                                        total on LeetCode
                                    </div>
                                </div>

                                {/* Bars */}
                                <div className="space-y-5 mb-8">
                                    {bars.map((bar) => (
                                        <div key={bar.label}>
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span
                                                    className={`text-sm font-semibold ${bar.text}`}
                                                >
                                                    {bar.label}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                                        {bar.solved}
                                                    </span>
                                                    <span className="text-xs text-slate-400">
                                                        / {bar.total}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="h-2 bg-slate-100 dark:bg-dark-card2 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{
                                                        width: `${
                                                            (bar.solved /
                                                                bar.total) *
                                                            100
                                                        }%`,
                                                    }}
                                                    viewport={{ once: true }}
                                                    transition={{
                                                        duration: 1.2,
                                                        ease: [
                                                            0.22, 1, 0.36, 1,
                                                        ],
                                                    }}
                                                    className={`h-full rounded-full ${bar.color}`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom */}
                                <div className="pt-5 border-t border-slate-100 dark:border-dark-border grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-lg font-bold text-slate-900 dark:text-white">
                                            #
                                            {stats.ranking?.toLocaleString() ||
                                                "—"}
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            Global Rank
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-lg font-bold text-slate-900 dark:text-white">
                                            {stats.totalSolved || 0} /{" "}
                                            {stats.totalQuestions || "—"}
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            Total Solved
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-lg font-bold text-slate-900 dark:text-white">
                                            {stats.reputation || "—"}
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            Reputation
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
