import { useEffect, useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
    useTransform,
    useMotionTemplate,
} from "framer-motion";
import {
    Download,
    ExternalLink,
    Play,
    X,
    Video,
    Sparkles,
    MapPin,
    GraduationCap,
} from "lucide-react";
import { Github, Linkedin } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import * as THREE from "three";
import { resumeAPI } from "../services/api.js";

const VIDEO_ID = "1NEe4Yi660D3P5eLqGm04MXYtb_MLHv_r";
const VIDEO_EMBED = `https://drive.google.com/file/d/${VIDEO_ID}/preview`;

const ROLES = [
    "Full Stack Developer",
    "MERN Stack Engineer",
    "React & Next.js Dev",
    "Cloud & DevOps Engineer",
];

// ── Three.js particle background ─────────────────────────────────────
function ThreeBackground() {
    const mountRef = useRef(null);

    useEffect(() => {
        const el = mountRef.current;
        if (!el) return;

        const W = el.clientWidth;
        const H = el.clientHeight;

        // Scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        el.appendChild(renderer.domElement);
        camera.position.z = 4;

        // Particles
        const COUNT = 1800;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(COUNT * 3);
        const col = new Float32Array(COUNT * 3);
        const sizes = new Float32Array(COUNT);

        const palette = [
            new THREE.Color("#4f8ef7"),
            new THREE.Color("#8b5cf6"),
            new THREE.Color("#06b6d4"),
            new THREE.Color("#10b981"),
        ];

        for (let i = 0; i < COUNT; i++) {
            const r = 3 + Math.random() * 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
            const c = palette[Math.floor(Math.random() * palette.length)];
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
            sizes[i] = Math.random() * 2.5 + 0.5;
        }
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
        geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const mat = new THREE.PointsMaterial({
            size: 0.04,
            vertexColors: true,
            transparent: true,
            opacity: 0.75,
            sizeAttenuation: true,
        });
        const points = new THREE.Points(geo, mat);
        scene.add(points);

        // Connecting lines between nearby particles
        const lineGeo = new THREE.BufferGeometry();
        const linePos = [];
        const lineCol = [];
        const SAMPLE = 120;
        const DIST_SQ = 1.2;

        for (let i = 0; i < SAMPLE; i++) {
            for (let j = i + 1; j < SAMPLE; j++) {
                const ax = pos[i * 3],
                    ay = pos[i * 3 + 1],
                    az = pos[i * 3 + 2];
                const bx = pos[j * 3],
                    by = pos[j * 3 + 1],
                    bz = pos[j * 3 + 2];
                const d2 = (ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2;
                if (d2 < DIST_SQ) {
                    linePos.push(ax, ay, az, bx, by, bz);
                    lineCol.push(
                        col[i * 3],
                        col[i * 3 + 1],
                        col[i * 3 + 2],
                        col[j * 3],
                        col[j * 3 + 1],
                        col[j * 3 + 2],
                    );
                }
            }
        }
        const lineMesh = new THREE.LineSegments(
            new THREE.BufferGeometry()
                .setAttribute(
                    "position",
                    new THREE.Float32BufferAttribute(linePos, 3),
                )
                .setAttribute(
                    "color",
                    new THREE.Float32BufferAttribute(lineCol, 3),
                ),
            new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: 0.12,
            }),
        );
        scene.add(lineMesh);

        // Mouse parallax
        let mx = 0,
            my = 0;
        const onMouse = (e) => {
            mx = (e.clientX / window.innerWidth - 0.5) * 0.4;
            my = (e.clientY / window.innerHeight - 0.5) * 0.4;
        };
        window.addEventListener("mousemove", onMouse);

        // Animate
        let frame;
        const clock = new THREE.Clock();
        const animate = () => {
            frame = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            points.rotation.y = t * 0.04 + mx;
            points.rotation.x = t * 0.02 - my;
            lineMesh.rotation.y = t * 0.04 + mx;
            lineMesh.rotation.x = t * 0.02 - my;
            mat.opacity = 0.6 + Math.sin(t * 0.5) * 0.15;
            renderer.render(scene, camera);
        };
        animate();

        // Resize
        const onResize = () => {
            const nW = el.clientWidth;
            const nH = el.clientHeight;
            camera.aspect = nW / nH;
            camera.updateProjectionMatrix();
            renderer.setSize(nW, nH);
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("mousemove", onMouse);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            geo.dispose();
            mat.dispose();
            if (el.contains(renderer.domElement))
                el.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                overflow: "hidden",
            }}
        />
    );
}

// ── Typing effect ─────────────────────────────────────────────────────
function TypingEffect({ texts }) {
    const [display, setDisplay] = useState("");
    const [idx, setIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const target = texts[idx];
        const timer = setTimeout(
            () => {
                if (!deleting) {
                    if (display.length < target.length)
                        setDisplay(target.slice(0, display.length + 1));
                    else setTimeout(() => setDeleting(true), 1800);
                } else {
                    if (display.length > 0) setDisplay(display.slice(0, -1));
                    else {
                        setDeleting(false);
                        setIdx((i) => (i + 1) % texts.length);
                    }
                }
            },
            deleting ? 40 : 80,
        );
        return () => clearTimeout(timer);
    }, [display, deleting, idx, texts]);

    return (
        <span className="grad-text font-extrabold">
            {display}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[3px] h-[0.9em] bg-accent-blue
          ml-1 align-middle rounded-sm"
            />
        </span>
    );
}

// ── Video CV Modal ────────────────────────────────────────────────────
function VideoCVModal({ onClose }) {
    useEffect(() => {
        const h = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", h);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", h);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4
        bg-black/85 backdrop-blur-lg"
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 40 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl"
            >
                {/* Glow */}
                <div
                    className="absolute -inset-2 bg-gradient-to-r from-accent-blue
          to-accent-purple rounded-3xl blur-2xl opacity-30 pointer-events-none"
                />

                <div
                    className="relative bg-[#070d1a] border border-white/10
          rounded-3xl overflow-hidden"
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between px-6 py-4
            border-b border-white/8"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl bg-gradient-to-br
                from-accent-blue to-accent-purple
                flex items-center justify-center shadow-glow-blue"
                            >
                                <Video size={17} className="text-white" />
                            </div>
                            <div>
                                <div className="font-bold text-white text-sm leading-tight">
                                    Video CV — Utkal Behera
                                </div>
                                <div className="text-[11px] text-slate-500 mt-0.5">
                                    Full Stack Developer · MERN & Cloud
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full
                bg-emerald-500/10 border border-emerald-500/20"
                            >
                                <motion.span
                                    animate={{ scale: [1, 1.4, 1] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                    }}
                                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 block"
                                />
                                <span className="text-[10px] font-bold text-emerald-400">
                                    LIVE
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20
                  text-slate-400 hover:text-red-400
                  flex items-center justify-center transition-all"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Video */}
                    <div
                        className="relative w-full bg-black"
                        style={{ paddingTop: "56.25%" }}
                    >
                        <iframe
                            src={VIDEO_EMBED}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                            style={{ border: "none" }}
                            title="Utkal Behera Video CV"
                        />
                    </div>

                    {/* Footer */}
                    <div
                        className="flex items-center justify-between px-6 py-3
            border-t border-white/8"
                    >
                        <div className="flex gap-2">
                            {["MERN", "Cloud", "DevOps", "Next.js"].map((t) => (
                                <span
                                    key={t}
                                    className="text-[10px] font-bold px-2.5 py-1 rounded-full
                    bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                        <a
                            href={`https://drive.google.com/file/d/${VIDEO_ID}/view`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-accent-blue hover:underline
                flex items-center gap-1"
                        >
                            <ExternalLink size={11} /> Open in Drive
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Social button ─────────────────────────────────────────────────────
function SocialBtn({ href, icon, label, color }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            title={label}
            className="group relative w-12 h-12 rounded-2xl flex items-center justify-center
        bg-white/5 dark:bg-white/5 border border-white/10
        text-slate-400 transition-all duration-300"
            style={{ "--hover-color": color }}
        >
            <div
                className="absolute inset-0 rounded-2xl opacity-0
        group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `${color}18`,
                    boxShadow: `0 0 20px ${color}40`,
                }}
            />
            <div className="relative text-xl" style={{ color: "inherit" }}>
                {icon}
            </div>
            <style>{`
        a:hover .social-icon-${label.toLowerCase().replace(/\s/g, "")} {
          color: ${color} !important;
        }
      `}</style>
        </motion.a>
    );
}

// ── Stat pill ─────────────────────────────────────────────────────────
function StatPill({ value, label, color }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-2xl font-black" style={{ color }}>
                {value}
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">
                {label}
            </span>
        </div>
    );
}

// ── Avatar card with 3D tilt ──────────────────────────────────────────
function AvatarCard({ hero, onVideoClick }) {
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
    const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });
    const rotateX = useTransform(springY, [0, 1], ["10deg", "-10deg"]);
    const rotateY = useTransform(springX, [0, 1], ["-10deg", "10deg"]);
    const glareX = useTransform(springX, [0, 1], ["0%", "100%"]);
    const glareY = useTransform(springY, [0, 1], ["0%", "100%"]);
    const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.25) 0%, transparent 55%)`;

    return (
        <motion.div
            style={{ perspective: 1200 }}
            onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                mouseX.set((e.clientX - r.left) / r.width);
                mouseY.set((e.clientY - r.top) / r.height);
            }}
            onMouseLeave={() => {
                mouseX.set(0.5);
                mouseY.set(0.5);
            }}
            className="relative flex justify-center w-full"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]"
            >
                {/* Spinning gradient aura */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -inset-5 rounded-full opacity-25 dark:opacity-40"
                    style={{
                        background:
                            "conic-gradient(from 0deg, #4f8ef7, #8b5cf6, #06b6d4, #10b981, #4f8ef7)",
                        filter: "blur(20px)",
                    }}
                />

                {/* Outer ring */}
                <div className="absolute -inset-2 rounded-full border border-white/10" />
                <div className="absolute -inset-4 rounded-full border border-white/5" />

                {/* Main avatar circle */}
                <div
                    className="absolute inset-0 rounded-full overflow-hidden
          border-4 border-white/10 shadow-2xl z-10 group"
                >
                    {hero.profileImage ? (
                        <img
                            src={hero.profileImage}
                            alt="Utkal Behera"
                            className="w-full h-full object-cover object-top
                group-hover:scale-105 transition-transform duration-700"
                        />
                    ) : (
                        <div
                            className="w-full h-full bg-gradient-to-br
              from-accent-blue to-accent-purple
              flex items-center justify-center
              text-white text-7xl font-black"
                        >
                            UB
                        </div>
                    )}
                    {/* Glare */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none
              mix-blend-overlay opacity-40"
                        style={{ background: glare }}
                    />
                </div>

                {/* Badge — Top Skill */}
                <motion.div
                    style={{ translateZ: 60 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute top-8 -left-6 z-20
            flex items-center gap-3 px-4 py-3 rounded-2xl
            bg-white/10 dark:bg-[#0d1424]/90
            border border-white/15 backdrop-blur-xl shadow-xl"
                >
                    <div
                        className="w-9 h-9 rounded-xl bg-accent-blue/20
            border border-accent-blue/30
            flex items-center justify-center text-lg"
                    >
                        ⚛
                    </div>
                    <div>
                        <div
                            className="text-[10px] text-slate-400 font-bold
              uppercase tracking-widest"
                        >
                            Top Skill
                        </div>
                        <div className="text-sm font-bold text-white mt-0.5">
                            React & Next.js
                        </div>
                    </div>
                </motion.div>

                {/* Badge — Available */}
                <motion.div
                    style={{ translateZ: 80 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-14 -right-6 z-20
            flex items-center gap-3 px-4 py-3 rounded-2xl
            bg-white/10 dark:bg-[#0d1424]/90
            border border-white/15 backdrop-blur-xl shadow-xl"
                >
                    <div className="relative w-3 h-3">
                        <span
                            className="absolute inset-0 rounded-full bg-emerald-400
              animate-ping opacity-75"
                        />
                        <span className="relative block w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-sm font-bold text-white">
                        Available for Work
                    </span>
                </motion.div>

                {/* Badge — Video CV */}
                <motion.button
                    style={{ translateZ: 90 }}
                    onClick={onVideoClick}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20
            flex items-center gap-3 px-5 py-3 rounded-2xl
            bg-white/10 dark:bg-[#0d1424]/90
            border border-accent-purple/40 backdrop-blur-xl shadow-xl
            cursor-pointer hover:border-accent-purple/70
            transition-all duration-300 group"
                >
                    <div
                        className="relative w-9 h-9 rounded-xl flex-shrink-0
            bg-gradient-to-br from-accent-blue to-accent-purple
            flex items-center justify-center shadow-glow-blue"
                    >
                        <span
                            className="absolute inset-0 rounded-xl bg-accent-purple/40
              animate-ping opacity-0 group-hover:opacity-75"
                        />
                        <Play
                            size={13}
                            className="text-white ml-0.5 relative z-10"
                        />
                    </div>
                    <div className="text-left">
                        <div className="text-xs font-bold text-white leading-tight">
                            Video CV
                        </div>
                        <div className="text-[9px] text-slate-400 mt-0.5">
                            Watch my story
                        </div>
                    </div>
                    {/* Notification dot */}
                    <span
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full
            bg-accent-purple flex items-center justify-center"
                    >
                        <span
                            className="absolute inset-0 rounded-full bg-accent-purple
              animate-ping opacity-60"
                        />
                        <Play
                            size={7}
                            className="text-white relative z-10 ml-px"
                        />
                    </span>
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

// ── Animation variants ────────────────────────────────────────────────
const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
    hidden: { opacity: 0, y: 32 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

// ── Main Hero ─────────────────────────────────────────────────────────
export default function Hero({ config }) {
    const hero = config?.hero || {};
    const [showVideo, setShowVideo] = useState(false);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center
        pt-20 pb-12 overflow-hidden
        bg-[#060d1b] dark:bg-[#060d1b]"
        >
            {/* Three.js particle background */}
            <ThreeBackground />

            {/* Ambient glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute -top-40 -left-40 w-[600px] h-[600px]
          rounded-full bg-accent-blue/8 blur-[100px]"
                />
                <div
                    className="absolute -bottom-40 -right-40 w-[500px] h-[500px]
          rounded-full bg-accent-purple/8 blur-[100px]"
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2
          -translate-y-1/2 w-[800px] h-[400px]
          bg-accent-blue/3 blur-[120px] rounded-full"
                />
            </div>

            {/* Dot grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(79,142,247,0.4) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                    maskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
                }}
            />

            <div className="section-container w-full relative z-10">
                <div
                    className="flex flex-col lg:flex-row items-center
          justify-between gap-12 xl:gap-20"
                >
                    {/* ── LEFT ── */}
                    <motion.div
                        className="flex-1 max-w-2xl text-center lg:text-left"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {/* Status badge */}
                        <motion.div
                            variants={item}
                            className="inline-flex items-center gap-2.5 mb-8
                px-4 py-2 rounded-full
                bg-accent-blue/8 border border-accent-blue/20
                backdrop-blur-sm"
                        >
                            <motion.span
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2 h-2 rounded-full bg-accent-blue block"
                            />
                            <span
                                className="text-xs font-bold text-accent-blue
                tracking-wider uppercase"
                            >
                                {hero.tagline ||
                                    "Open to Internships & Placements"}
                            </span>
                            <Sparkles size={13} className="text-accent-blue" />
                        </motion.div>

                        {/* Greeting */}
                        <motion.p
                            variants={item}
                            className="text-slate-400 text-sm font-semibold
                tracking-[0.2em] uppercase mb-3"
                        >
                            Hello World 👋, I'm
                        </motion.p>

                        {/* Name */}
                        <motion.h1
                            variants={item}
                            className="text-5xl md:text-6xl lg:text-7xl xl:text-[5rem]
                font-black mb-5 leading-[1.0] tracking-tight text-white"
                        >
                            {hero.name || "Utkal Behera"}
                        </motion.h1>

                        {/* Typing */}
                        <motion.div
                            variants={item}
                            className="text-2xl md:text-3xl mb-6 h-10
                flex items-center justify-center lg:justify-start"
                        >
                            <TypingEffect texts={ROLES} />
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={item}
                            className="text-slate-400 text-base md:text-lg
                max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
                        >
                            {hero.subtitle ||
                                "Building scalable web applications with MERN Stack · Next.js · Cloud & DevOps. Currently @ LPU, CSE."}
                        </motion.p>

                        {/* Meta info */}
                        <motion.div
                            variants={item}
                            className="flex items-center gap-4 justify-center lg:justify-start
                mb-8 text-slate-500 text-xs font-medium"
                        >
                            <span className="flex items-center gap-1.5">
                                <MapPin
                                    size={13}
                                    className="text-accent-blue"
                                />
                                Phagwara, Punjab
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-600" />
                            <span className="flex items-center gap-1.5">
                                <GraduationCap
                                    size={13}
                                    className="text-accent-blue"
                                />
                                LPU · CSE · 2026
                            </span>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            variants={item}
                            className="flex items-center gap-6 justify-center lg:justify-start
                mb-10 pb-8 border-b border-white/6"
                        >
                            <StatPill
                                value="12+"
                                label="Projects"
                                color="#4f8ef7"
                            />
                            <div className="w-px h-8 bg-white/8" />
                            <StatPill
                                value="297+"
                                label="LC Solved"
                                color="#f59e0b"
                            />
                            <div className="w-px h-8 bg-white/8" />
                            <StatPill
                                value="7.6"
                                label="CGPA"
                                color="#10b981"
                            />
                            <div className="w-px h-8 bg-white/8" />
                            <StatPill
                                value="3+"
                                label="Internships"
                                color="#8b5cf6"
                            />
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={item}
                            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
                        >
                            {/* Primary */}
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="relative flex items-center gap-2.5
                  px-7 py-3.5 rounded-2xl font-bold text-sm text-white
                  overflow-hidden shadow-glow-blue"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #4f8ef7, #8b5cf6)",
                                }}
                            >
                                <div
                                    className="absolute inset-0 bg-white/15 opacity-0
                  hover:opacity-100 transition-opacity"
                                />
                                <ExternalLink size={17} />
                                {hero.cta1Text || "View Projects"}
                            </motion.a>

                            {/* Secondary */}
                            <motion.a
                                href={resumeAPI.download()}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl
                  font-bold text-sm text-slate-200
                  bg-white/5 border border-white/12
                  hover:bg-white/10 hover:border-accent-blue/40
                  hover:text-white transition-all duration-300"
                            >
                                <Download size={17} />
                                {hero.cta2Text || "Download CV"}
                            </motion.a>

                            {/* Video CV */}
                            <motion.button
                                onClick={() => setShowVideo(true)}
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="group relative flex items-center gap-2.5
                  px-7 py-3.5 rounded-2xl font-bold text-sm
                  text-accent-purple overflow-hidden
                  bg-accent-purple/8 border border-accent-purple/30
                  hover:bg-accent-purple/15 hover:border-accent-purple/60
                  transition-all duration-300"
                            >
                                <div
                                    className="relative w-7 h-7 rounded-lg flex-shrink-0
                  bg-gradient-to-br from-accent-blue to-accent-purple
                  flex items-center justify-center"
                                >
                                    <span
                                        className="absolute inset-0 rounded-lg
                    bg-accent-purple/50 opacity-0 group-hover:opacity-100
                    animate-ping"
                                    />
                                    <Play
                                        size={12}
                                        className="text-white ml-0.5 relative z-10"
                                    />
                                </div>
                                Watch Video CV
                            </motion.button>
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                            variants={item}
                            className="flex items-center gap-3 justify-center lg:justify-start"
                        >
                            <span
                                className="text-xs text-slate-600 font-medium
                tracking-wider uppercase mr-2"
                            >
                                Find me on
                            </span>

                            <motion.a
                                href="https://github.com/Utkal9"
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ y: -4, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="group w-11 h-11 rounded-2xl flex items-center justify-center
                  bg-white/5 border border-white/10
                  hover:bg-[#333]/80 hover:border-[#555]
                  transition-all duration-300 text-slate-400
                  hover:text-white hover:shadow-lg"
                                title="GitHub"
                            >
                                <Github size={20} />
                            </motion.a>

                            <motion.a
                                href="https://www.linkedin.com/in/utkal-behera59/"
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ y: -4, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="group w-11 h-11 rounded-2xl flex items-center justify-center
                  bg-white/5 border border-white/10
                  hover:bg-[#0077b5]/20 hover:border-[#0077b5]/60
                  transition-all duration-300 text-slate-400
                  hover:text-[#0077b5] hover:shadow-lg
                  hover:shadow-[#0077b5]/20"
                                title="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </motion.a>

                            <motion.a
                                href="https://leetcode.com/u/utkal59/"
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ y: -4, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="group w-11 h-11 rounded-2xl flex items-center justify-center
                  bg-white/5 border border-white/10
                  hover:bg-[#f89f1b]/15 hover:border-[#f89f1b]/50
                  transition-all duration-300 text-slate-400
                  hover:text-[#f89f1b] hover:shadow-lg
                  hover:shadow-[#f89f1b]/20"
                                title="LeetCode"
                            >
                                <SiLeetcode size={20} />
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* ── RIGHT — Avatar ── */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.85,
                            filter: "blur(12px)",
                        }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{
                            duration: 1.1,
                            delay: 0.25,
                            ease: "easeOut",
                        }}
                        className="relative lg:w-[45%] flex justify-center"
                    >
                        <AvatarCard
                            hero={hero}
                            onVideoClick={() => setShowVideo(true)}
                        />
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2
            flex flex-col items-center gap-2"
                >
                    <span
                        className="text-[10px] text-slate-600 uppercase
            tracking-widest font-medium"
                    >
                        Scroll to explore
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-6 h-10 border border-slate-700 rounded-full
              flex justify-center pt-2"
                    >
                        <div className="w-1 h-2 bg-accent-blue rounded-full" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {showVideo && (
                    <VideoCVModal onClose={() => setShowVideo(false)} />
                )}
            </AnimatePresence>
        </section>
    );
}
