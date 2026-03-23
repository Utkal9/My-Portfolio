import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import api from "../services/api.js";

export default function Education() {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/education")
            .then((res) => setEducation(res.data?.data || []))
            .catch(() => setEducation([]))
            .finally(() => setLoading(false));
    }, []);

    if (!loading && education.length === 0) return null;

    return (
        <section id="education" className="py-20">
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-bold tracking-widest text-accent-blue uppercase mb-3 block">
                        Education
                    </span>
                    <h2 className="section-heading text-slate-900 dark:text-white">
                        Academic <span className="grad-text">Background</span>
                    </h2>
                </motion.div>

                {loading && (
                    <div className="max-w-3xl mx-auto space-y-4">
                        {Array(2)
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className="skeleton h-36 rounded-2xl"
                                />
                            ))}
                    </div>
                )}

                {!loading && (
                    <div className="max-w-3xl mx-auto space-y-5">
                        {education.map((edu, i) => (
                            <motion.div
                                key={edu._id}
                                initial={{
                                    opacity: 0,
                                    x: i % 2 === 0 ? -24 : 24,
                                }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="relative p-6 rounded-2xl
                  bg-white dark:bg-dark-card
                  border border-slate-100 dark:border-dark-border
                  hover:border-accent-blue/40 dark:hover:border-accent-blue/30
                  shadow-sm dark:shadow-none
                  hover:shadow-glow-blue/10
                  transition-all duration-300 group"
                            >
                                <div
                                    className="absolute left-0 top-6 bottom-6 w-1
                  bg-gradient-to-b from-accent-blue to-accent-purple
                  rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />

                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                    <div className="flex gap-4">
                                        <div
                                            className="w-12 h-12 rounded-2xl flex-shrink-0
                      bg-gradient-to-br from-accent-blue/10 to-accent-purple/10
                      dark:from-accent-blue/15 dark:to-accent-purple/15
                      border border-accent-blue/20
                      flex items-center justify-center"
                                        >
                                            <GraduationCap
                                                size={22}
                                                className="text-accent-blue"
                                            />
                                        </div>
                                        <div>
                                            <h3
                                                className="font-extrabold text-slate-900 dark:text-white
                        text-base leading-tight mb-1
                        group-hover:text-accent-blue transition-colors"
                                            >
                                                {edu.institution}
                                            </h3>
                                            <p className="text-sm font-semibold text-accent-blue mb-2">
                                                {edu.degree}
                                                {edu.field
                                                    ? ` — ${edu.field}`
                                                    : ""}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-3">
                                                {edu.location && (
                                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                                        <MapPin size={10} />{" "}
                                                        {edu.location}
                                                    </span>
                                                )}
                                                {(edu.startDate ||
                                                    edu.endDate) && (
                                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                                        <Calendar size={10} />
                                                        {edu.startDate}
                                                        {edu.endDate
                                                            ? ` – ${edu.endDate}`
                                                            : ""}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {edu.grade && (
                                        <div
                                            className="flex-shrink-0 px-4 py-2 rounded-xl text-center
                      bg-gradient-to-br from-accent-blue/10 to-accent-purple/10
                      border border-accent-blue/20"
                                        >
                                            <div className="text-lg font-extrabold grad-text">
                                                {edu.grade}
                                            </div>
                                            <div className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">
                                                Grade
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
