import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, ExternalLink, Trophy, RefreshCw } from "lucide-react";
import { ActivityCalendar } from "react-activity-calendar";

const USERNAME = "utkal59";

export default function LeetcodeStats() {
    const [stats, setStats] = useState(null);
    const [calendarData, setCalendarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchStats = async () => {
        setLoading(true);
        setError(false);

        try {
            // 1. Fetch main stats from your own backend
            const base =
                import.meta.env.VITE_API_URL || "http://localhost:5000/api";
            const res = await fetch(`${base}/leetcode/${USERNAME}`);
            const data = await res.json();

            if (data && data.status === "success") {
                setStats(data);
            } else {
                setError(true);
            }

            // 2. Fetch the calendar directly from a public API to guarantee green blocks show up
            try {
                const calRes = await fetch(
                    `https://alfa-leetcode-api.onrender.com/${USERNAME}/calendar`,
                );
                const calData = await calRes.json();
                if (calData && calData.submissionCalendar) {
                    setCalendarData(calData.submissionCalendar);
                }
            } catch (calErr) {
                console.error("Failed to fetch LeetCode calendar:", calErr);
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

    // Transform submissionCalendar into react-activity-calendar format
    const getCalendarActivities = () => {
        // Fallback to stats.submissionCalendar just in case your backend adds it later
        const rawCalendar = calendarData || (stats && stats.submissionCalendar);
        if (!rawCalendar) return null;

        try {
            const calendarObj =
                typeof rawCalendar === "string"
                    ? JSON.parse(rawCalendar)
                    : rawCalendar;

            const activities = [];
            const today = new Date();

            // Generate last 365 days with 0 counts initially
            for (let i = 365; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                const dateStr = date.toISOString().split("T")[0];
                activities.push({ date: dateStr, count: 0, level: 0 });
            }

            // Map the actual submissions to the corresponding days
            Object.keys(calendarObj).forEach((timestamp) => {
                const count = calendarObj[timestamp];
                const date = new Date(parseInt(timestamp) * 1000);
                const dateStr = date.toISOString().split("T")[0];

                const activity = activities.find((a) => a.date === dateStr);
                if (activity) {
                    activity.count += count;
                    // Determine intensity level (0-4) based on submission count
                    if (activity.count === 1) activity.level = 1;
                    else if (activity.count >= 2 && activity.count <= 3)
                        activity.level = 2;
                    else if (activity.count >= 4 && activity.count <= 5)
                        activity.level = 3;
                    else if (activity.count >= 6) activity.level = 4;
                }
            });
            return activities;
        } catch (e) {
            console.error("Failed to parse LeetCode calendar data", e);
            return null;
        }
    };

    const activityData = getCalendarActivities();

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

                                {/* Bottom Stats */}
                                <div
                                    className={`pt-5 ${activityData ? "pb-8" : ""} border-t border-slate-100 dark:border-dark-border grid grid-cols-3 gap-4 text-center`}
                                >
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

                                {/* Heatmap Streak */}
                                {activityData && (
                                    <div className="pt-8 border-t border-slate-100 dark:border-dark-border flex flex-col items-center overflow-x-auto">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">
                                            Submission Streak
                                        </span>
                                        <div className="scale-90 sm:scale-100 w-full flex justify-center">
                                            <ActivityCalendar
                                                data={activityData}
                                                blockSize={12}
                                                blockMargin={4}
                                                fontSize={12}
                                                theme={{
                                                    light: [
                                                        "#ebedf0",
                                                        "#9be9a8",
                                                        "#40c463",
                                                        "#30a14e",
                                                        "#216e39",
                                                    ],
                                                    dark: [
                                                        "#161b22",
                                                        "#0e4429",
                                                        "#006d32",
                                                        "#26a641",
                                                        "#39d353",
                                                    ],
                                                }}
                                                labels={{
                                                    totalCount:
                                                        "{{count}} submissions in the last year",
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
