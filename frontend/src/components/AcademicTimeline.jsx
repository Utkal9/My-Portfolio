import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    GraduationCap,
    ChevronDown,
    ChevronUp,
    BookOpen,
    Award,
    TrendingUp,
} from "lucide-react";
import { semesterAPI } from "../services/api.js";

const GRADE_COLORS = {
    O: {
        bg: "bg-emerald-500/15",
        text: "text-emerald-400",
        border: "border-emerald-500/30",
    },
    "A+": {
        bg: "bg-green-500/15",
        text: "text-green-400",
        border: "border-green-500/30",
    },
    A: {
        bg: "bg-blue-500/15",
        text: "text-blue-400",
        border: "border-blue-500/30",
    },
    "B+": {
        bg: "bg-cyan-500/15",
        text: "text-cyan-400",
        border: "border-cyan-500/30",
    },
    B: {
        bg: "bg-yellow-500/15",
        text: "text-yellow-400",
        border: "border-yellow-500/30",
    },
    C: {
        bg: "bg-orange-500/15",
        text: "text-orange-400",
        border: "border-orange-500/30",
    },
    F: {
        bg: "bg-red-500/15",
        text: "text-red-400",
        border: "border-red-500/30",
    },
};

const GRADE_POINTS = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    C: 5,
    F: 0,
};

function SGPABar({ sgpa }) {
    const pct = (sgpa / 10) * 100;
    const color =
        sgpa >= 9
            ? "from-emerald-400 to-green-500"
            : sgpa >= 8
              ? "from-blue-400 to-cyan-500"
              : sgpa >= 7
                ? "from-yellow-400 to-amber-500"
                : "from-orange-400 to-red-500";

    return (
        <div className="flex items-center gap-3 flex-1">
            <div className="flex-1 h-1.5 bg-dark-border rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${color}`}
                />
            </div>
            <span
                className={`text-sm font-bold bg-gradient-to-r ${color}
        bg-clip-text text-transparent`}
            >
                {sgpa}
            </span>
        </div>
    );
}

function SemesterCard({ sem, index, isLast }) {
    const [open, setOpen] = useState(false);
    const totalCredits = sem.courses.reduce((s, c) => s + c.credits, 0);

    return (
        <div className="relative flex gap-6">
            {/* Timeline line */}
            {!isLast && (
                <div
                    className="absolute left-5 top-12 bottom-0 w-0.5
          bg-gradient-to-b from-accent-blue/40 to-transparent"
                />
            )}

            {/* Timeline dot */}
            <div className="relative flex-shrink-0 mt-1">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br
            from-accent-blue to-accent-purple
            flex items-center justify-center
            shadow-glow-blue text-white text-xs font-bold z-10 relative"
                >
                    S{sem.semester}
                </motion.div>
            </div>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex-1 mb-6"
            >
                <div
                    className="bg-white dark:bg-dark-card
          border border-slate-100 dark:border-dark-border
          rounded-2xl overflow-hidden
          hover:border-accent-blue/30 transition-all duration-300"
                >
                    {/* Header */}
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="w-full p-5 text-left"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                                        Semester {sem.semester}
                                    </h3>
                                    {sem.label && (
                                        <span
                                            className="text-[10px] font-bold px-2 py-0.5 rounded-full
                      bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
                                        >
                                            {sem.label}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                                    <span className="flex items-center gap-1">
                                        <BookOpen size={11} />{" "}
                                        {sem.courses.length} courses
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Award size={11} /> {totalCredits}{" "}
                                        credits
                                    </span>
                                    {sem.year && <span>{sem.year}</span>}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-400 font-medium w-12">
                                        SGPA
                                    </span>
                                    <SGPABar sgpa={sem.sgpa} />
                                </div>
                            </div>
                            <div className="flex-shrink-0 text-slate-400 mt-1">
                                {open ? (
                                    <ChevronUp size={18} />
                                ) : (
                                    <ChevronDown size={18} />
                                )}
                            </div>
                        </div>
                    </button>

                    {/* Courses table */}
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="px-5 pb-5 border-t border-slate-100 dark:border-dark-border">
                                    <div className="overflow-x-auto mt-4">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="text-[10px] text-slate-400 uppercase tracking-wider">
                                                    <th className="text-left pb-3 font-bold">
                                                        Code
                                                    </th>
                                                    <th className="text-left pb-3 font-bold">
                                                        Course Name
                                                    </th>
                                                    <th className="text-center pb-3 font-bold">
                                                        Credits
                                                    </th>
                                                    <th className="text-center pb-3 font-bold">
                                                        Grade
                                                    </th>
                                                    <th className="text-right pb-3 font-bold">
                                                        Points
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-dark-border">
                                                {sem.courses.map(
                                                    (course, i) => {
                                                        const gcolor =
                                                            GRADE_COLORS[
                                                                course.grade
                                                            ] ||
                                                            GRADE_COLORS["C"];
                                                        const points =
                                                            course.credits *
                                                            (GRADE_POINTS[
                                                                course.grade
                                                            ] || 0);
                                                        return (
                                                            <motion.tr
                                                                key={i}
                                                                initial={{
                                                                    opacity: 0,
                                                                    y: 8,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                }}
                                                                transition={{
                                                                    delay:
                                                                        i *
                                                                        0.04,
                                                                }}
                                                                className="group"
                                                            >
                                                                <td className="py-2.5 pr-4">
                                                                    <span
                                                                        className="font-mono text-xs font-bold
                                  text-accent-blue bg-accent-blue/10
                                  px-2 py-1 rounded-lg"
                                                                    >
                                                                        {
                                                                            course.code
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td className="py-2.5 pr-4">
                                                                    <span
                                                                        className="text-slate-700 dark:text-slate-300
                                  text-sm font-medium"
                                                                    >
                                                                        {
                                                                            course.name
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td className="py-2.5 text-center">
                                                                    <span
                                                                        className="text-slate-500 dark:text-slate-400
                                  font-medium text-sm"
                                                                    >
                                                                        {
                                                                            course.credits
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td className="py-2.5 text-center">
                                                                    <span
                                                                        className={`inline-block px-2.5 py-1 rounded-lg
                                  text-xs font-bold border
                                  ${gcolor.bg} ${gcolor.text} ${gcolor.border}`}
                                                                    >
                                                                        {
                                                                            course.grade
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td className="py-2.5 text-right">
                                                                    <span
                                                                        className="text-slate-500 dark:text-slate-400
                                  font-medium text-sm"
                                                                    >
                                                                        {points}
                                                                    </span>
                                                                </td>
                                                            </motion.tr>
                                                        );
                                                    },
                                                )}
                                            </tbody>
                                            <tfoot>
                                                <tr className="border-t-2 border-slate-200 dark:border-dark-border">
                                                    <td
                                                        colSpan={2}
                                                        className="pt-3 text-xs font-bold text-slate-500 uppercase"
                                                    >
                                                        Total
                                                    </td>
                                                    <td className="pt-3 text-center text-sm font-bold text-slate-700 dark:text-white">
                                                        {totalCredits}
                                                    </td>
                                                    <td />
                                                    <td className="pt-3 text-right text-sm font-bold grad-text">
                                                        SGPA: {sem.sgpa}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}

export default function AcademicTimeline() {
    const [semesters, setSemesters] = useState([]);
    const [cgpa, setCgpa] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        semesterAPI
            .getAll()
            .then((res) => {
                setSemesters(res.data?.data || []);
                setCgpa(res.data?.cgpa || 0);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (!loading && semesters.length === 0) return null;

    const totalCredits = semesters
        .flatMap((s) => s.courses)
        .reduce((sum, c) => sum + c.credits, 0);

    const cgpaColor =
        cgpa >= 9
            ? "from-emerald-400 to-green-500"
            : cgpa >= 8
              ? "from-blue-400 to-cyan-500"
              : cgpa >= 7
                ? "from-yellow-400 to-amber-500"
                : "from-orange-400 to-red-500";

    return (
        <section
            id="academic"
            className="py-20 bg-slate-50/50 dark:bg-dark-bg2/50"
        >
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span
                        className="text-xs font-bold tracking-widest
            text-accent-blue uppercase mb-3 block"
                    >
                        Academic Record
                    </span>
                    <h2 className="section-heading text-slate-900 dark:text-white">
                        University <span className="grad-text">Transcript</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto mt-2 text-sm">
                        Lovely Professional University · B.Tech CSE · 2022–2026
                    </p>
                </motion.div>

                {/* CGPA summary bar */}
                {!loading && semesters.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto mb-12"
                    >
                        <div
                            className="bg-white dark:bg-dark-card
              border border-slate-100 dark:border-dark-border
              rounded-2xl p-6 flex flex-col sm:flex-row
              items-center justify-between gap-6"
                        >
                            {/* CGPA circle */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={`text-5xl font-black bg-gradient-to-br
                  ${cgpaColor} bg-clip-text text-transparent`}
                                >
                                    {cgpa}
                                </div>
                                <div
                                    className="text-xs text-slate-400 uppercase
                  tracking-widest font-bold mt-1"
                                >
                                    CGPA
                                </div>
                            </div>

                            <div className="flex-1 w-full">
                                {/* CGPA bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                                        <span>Overall Performance</span>
                                        <span>{cgpa}/10</span>
                                    </div>
                                    <div
                                        className="h-3 bg-slate-100 dark:bg-dark-border
                    rounded-full overflow-hidden"
                                    >
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{
                                                width: `${(cgpa / 10) * 100}%`,
                                            }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 1,
                                                ease: "easeOut",
                                            }}
                                            className={`h-full rounded-full bg-gradient-to-r ${cgpaColor}`}
                                        />
                                    </div>
                                </div>

                                {/* Stats row */}
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        {
                                            label: "Semesters",
                                            value: semesters.length,
                                        },
                                        {
                                            label: "Total Credits",
                                            value: totalCredits,
                                        },
                                        {
                                            label: "Courses",
                                            value: semesters.flatMap(
                                                (s) => s.courses,
                                            ).length,
                                        },
                                    ].map((s) => (
                                        <div
                                            key={s.label}
                                            className="text-center p-2 rounded-xl
                        bg-slate-50 dark:bg-dark-bg
                        border border-slate-100 dark:border-dark-border"
                                        >
                                            <div className="text-base font-bold grad-text">
                                                {s.value}
                                            </div>
                                            <div
                                                className="text-[9px] text-slate-400 uppercase
                        tracking-wider mt-0.5"
                                            >
                                                {s.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="max-w-2xl mx-auto space-y-4">
                        {Array(4)
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className="skeleton h-24 rounded-2xl"
                                />
                            ))}
                    </div>
                )}

                {/* Timeline */}
                {!loading && (
                    <div className="max-w-2xl mx-auto">
                        {semesters.map((sem, i) => (
                            <SemesterCard
                                key={sem._id}
                                sem={sem}
                                index={i}
                                isLast={i === semesters.length - 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
