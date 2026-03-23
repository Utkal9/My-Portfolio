import { useEffect, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useMotionTemplate,
} from "framer-motion";
import {
    Download,
    ExternalLink,
    Github,
    Linkedin,
    Code2,
    ArrowDown,
    Sparkles,
} from "lucide-react";
import { resumeAPI } from "../services/api.js";

const ROLES = [
    "Full Stack Developer",
    "MERN Stack Engineer",
    "React & Next.js Dev",
    "Cloud & DevOps Learner",
];

function TypingEffect({ texts }) {
    const [display, setDisplay] = useState("");
    const [idx, setIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const speed = deleting ? 40 : 80;

    useEffect(() => {
        const target = texts[idx];
        const timer = setTimeout(() => {
            if (!deleting) {
                if (display.length < target.length) {
                    setDisplay(target.slice(0, display.length + 1));
                } else {
                    setTimeout(() => setDeleting(true), 1800);
                }
            } else {
                if (display.length > 0) {
                    setDisplay(display.slice(0, -1));
                } else {
                    setDeleting(false);
                    setIdx((i) => (i + 1) % texts.length);
                }
            }
        }, speed);
        return () => clearTimeout(timer);
    }, [display, deleting, idx, texts]);

    return (
        <span className="grad-text font-extrabold drop-shadow-sm">
            {display}
            <span className="inline-block w-[3px] h-[1em] bg-accent-blue ml-1.5 animate-pulse align-middle rounded-full" />
        </span>
    );
}

// Stunning Ambient Background using your theme colors
function HeroBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated Ambient Light Orbs using your theme classes */}
            <motion.div
                animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent-blue/10 dark:bg-accent-blue/10 rounded-full blur-[120px]"
            />
            <motion.div
                animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-accent-blue/10 dark:bg-accent-blue/10 rounded-full blur-[120px]"
            />

            {/* Subtle Dot Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.4] dark:opacity-[0.2]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at center, #94a3b8 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    maskImage:
                        "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                }}
            />
        </div>
    );
}

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function Hero({ config }) {
    const hero = config?.hero || {};
    const socials = [
        {
            platform: "github",
            url: "https://github.com/Utkal9",
            icon: <Github size={22} />,
        },
        {
            platform: "linkedin",
            url: "https://www.linkedin.com/in/utkal-behera59/",
            icon: <Linkedin size={22} />,
        },
        {
            platform: "leetcode",
            url: "https://leetcode.com/u/utkal59/",
            icon: <Code2 size={22} />,
        },
    ];

    // --- Advanced 3D Tilt & Glare Effect ---
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(springY, [0, 1], ["12deg", "-12deg"]);
    const rotateY = useTransform(springX, [0, 1], ["-12deg", "12deg"]);

    // Dynamic glare based on mouse position
    const glareX = useTransform(springX, [0, 1], ["0%", "100%"]);
    const glareY = useTransform(springY, [0, 1], ["0%", "100%"]);
    const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, transparent 50%)`;

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-slate-50 dark:bg-dark-bg transition-colors duration-500"
        >
            <HeroBackground />

            <div className="section-container w-full relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12">
                    {/* --- Left: Text Content --- */}
                    <motion.div
                        className="flex-1 text-center lg:text-left z-10"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {/* Glossy Pill Badge */}
                        <motion.div
                            variants={item}
                            className="inline-flex items-center justify-center lg:justify-start mb-8 group cursor-pointer"
                        >
                            <div className="px-5 py-2.5 rounded-full text-sm font-bold border border-accent-blue/30 bg-accent-blue/5 dark:bg-accent-blue/10 text-accent-blue flex items-center gap-2 backdrop-blur-md shadow-lg shadow-accent-blue/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-accent-blue/20">
                                <Sparkles
                                    size={16}
                                    className="animate-pulse text-accent-blue"
                                />
                                {hero.tagline ||
                                    "Open to Internships & Placements"}
                            </div>
                        </motion.div>

                        <motion.div variants={item} className="mb-4">
                            <span className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase">
                                Hello World 👋, I'm
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={item}
                            className="text-5xl md:text-7xl lg:text-[5.5rem] font-black mb-6 leading-[1.05] tracking-tight text-slate-900 dark:text-white drop-shadow-sm"
                        >
                            {hero.name || "Utkal Behera"}
                        </motion.h1>

                        <motion.div
                            variants={item}
                            className="text-2xl md:text-3xl lg:text-4xl mb-8 h-12 flex justify-center lg:justify-start items-center"
                        >
                            <TypingEffect texts={ROLES} />
                        </motion.div>

                        <motion.p
                            variants={item}
                            className="text-slate-600 dark:text-slate-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium"
                        >
                            {hero.subtitle ||
                                "Building scalable web applications with MERN Stack · Next.js · Cloud & DevOps. Currently @ LPU, CSE."}
                        </motion.p>

                        {/* Premium CTAs using your theme classes */}
                        <motion.div
                            variants={item}
                            className="flex flex-wrap gap-5 justify-center lg:justify-start mb-14"
                        >
                            <a
                                href="#projects"
                                className="group relative flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base bg-grad-main text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow-blue"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                                <span className="relative z-10 flex items-center gap-2">
                                    <ExternalLink size={20} />{" "}
                                    {hero.cta1Text || "View Projects"}
                                </span>
                            </a>
                            <a
                                href={resumeAPI.download()}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base bg-white/80 dark:bg-dark-card/80 backdrop-blur-md text-slate-800 dark:text-white border-2 border-slate-200/50 dark:border-white/10 hover:border-accent-blue dark:hover:border-accent-blue hover:text-accent-blue dark:hover:text-accent-blue transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-lg hover:shadow-accent-blue/20"
                            >
                                <Download size={20} />{" "}
                                {hero.cta2Text || "Download CV"}
                            </a>
                        </motion.div>

                        {/* Floating Social Links */}
                        <motion.div
                            variants={item}
                            className="flex gap-5 justify-center lg:justify-start"
                        >
                            {socials.map((s) => (
                                <a
                                    key={s.platform}
                                    href={s.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/80 dark:bg-dark-card/80 backdrop-blur-md text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-white/10 hover:bg-grad-main hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-2 shadow-sm hover:shadow-xl hover:shadow-glow-blue group"
                                >
                                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                                        {s.icon}
                                    </div>
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* --- Right: Glassmorphic 3D Avatar Card --- */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                            filter: "blur(10px)",
                        }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{
                            duration: 1.2,
                            delay: 0.3,
                            ease: "easeOut",
                        }}
                        className="relative lg:w-1/2 flex justify-center perspective-[1200px]"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <motion.div
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d",
                            }}
                            className="relative w-[18rem] h-[18rem] md:w-[24rem] md:h-[24rem] lg:w-[28rem] lg:h-[28rem]"
                        >
                            {/* Spinning Gradient Aura using your theme class */}
                            <div
                                className="absolute inset-[-15px] rounded-full bg-grad-main opacity-30 dark:opacity-40 blur-3xl animate-spin-slow"
                                style={{ animationDuration: "12s" }}
                            />

                            {/* Main Avatar Container */}
                            <div className="absolute inset-0 rounded-full bg-white dark:bg-dark-card border-[8px] border-white/50 dark:border-white/5 backdrop-blur-sm z-10 shadow-2xl overflow-hidden group">
                                {/* Image */}
                                {hero.profileImage ? (
                                    <img
                                        src={hero.profileImage}
                                        alt="Profile"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-grad-main flex items-center justify-center text-white text-8xl font-extrabold">
                                        UB
                                    </div>
                                )}

                                {/* 3D Dynamic Glare Overlay */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-20 transition-opacity duration-300 mix-blend-overlay"
                                    style={{ background: glareBackground }}
                                />
                            </div>

                            {/* 3D Floating Glass Badge 1 */}
                            <motion.div
                                style={{ translateZ: "70px" }}
                                className="absolute top-8 -left-4 md:top-12 md:-left-8 bg-white/70 dark:bg-[#111827]/70 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-2xl z-20"
                            >
                                <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
                                    <Code2
                                        size={20}
                                        className="text-accent-blue"
                                    />
                                </div>
                                <div>
                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-0.5">
                                        Top Skill
                                    </div>
                                    <div className="text-sm md:text-base font-black text-slate-800 dark:text-white">
                                        React & Next.js
                                    </div>
                                </div>
                            </motion.div>

                            {/* 3D Floating Glass Badge 2 */}
                            <motion.div
                                style={{ translateZ: "100px" }}
                                className="absolute bottom-10 -right-4 md:bottom-16 md:-right-8 bg-white/70 dark:bg-[#111827]/70 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-2xl z-20"
                            >
                                <div className="relative flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                                </div>
                                <span className="text-sm md:text-base font-black text-slate-800 dark:text-white tracking-wide">
                                    Available for Work
                                </span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Minimalist Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="w-7 h-12 border-2 border-slate-400/30 dark:border-slate-600/50 rounded-full flex justify-center p-1.5 backdrop-blur-sm">
                            <div className="w-1.5 h-2.5 bg-accent-blue rounded-full" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
