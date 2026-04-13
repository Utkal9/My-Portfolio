import { useEffect, useRef, useState, useCallback } from "react";
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
    Sparkles,
    MapPin,
    GraduationCap,
    Volume2,
    Github,
    Linkedin,
} from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import * as THREE from "three";
import { resumeAPI, projectsAPI } from "../services/api.js";

const DEFAULT_VIDEO_ID = "1NEe4Yi660D3P5eLqGm04MXYtb_MLHv_r";
const LC_USERNAME = "utkal59";
const GH_USERNAME = "Utkal9";

function parseDriveFileId(value) {
    if (!value) return "";
    const idMatch = value.match(/(?:file\/d\/|id=|\/d\/|open\?id=)([a-zA-Z0-9_-]+)/);
    if (idMatch) return idMatch[1];
    return value.trim();
}

function parseYouTubeVideoId(value) {
    if (!value) return "";
    const trimmed = value.trim();
    const urlMatch = trimmed.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
    if (urlMatch) return urlMatch[1];
    if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed;
    return "";
}

function parseVideoSource(value) {
    if (!value) return { type: "drive", id: "" };
    const youtubeId = parseYouTubeVideoId(value);
    if (youtubeId) return { type: "youtube", id: youtubeId };
    const driveId = parseDriveFileId(value);
    return { type: "drive", id: driveId };
}

function buildVideoEmbed(source) {
    if (!source?.id) return "";
    if (source.type === "youtube") {
        return `https://www.youtube.com/embed/${source.id}?rel=0&showinfo=0&autoplay=1`;
    }
    return `https://drive.google.com/file/d/${source.id}/preview?usp=sharing&embedded=true`;
}

function buildVideoOpenUrl(source) {
    if (!source?.id) return "";
    if (source.type === "youtube") {
        return `https://youtu.be/${source.id}`;
    }
    return `https://drive.google.com/file/d/${source.id}/view`;
}

function buildVideoThumbnail(source) {
    if (!source?.id) return "";
    if (source.type === "youtube") {
        return `https://img.youtube.com/vi/${source.id}/maxresdefault.jpg`;
    }
    return `https://drive.google.com/thumbnail?id=${source.id}&sz=w1200`;
}

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

        const COUNT = 1600;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(COUNT * 3);
        const col = new Float32Array(COUNT * 3);
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
        }
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
        const mat = new THREE.PointsMaterial({
            size: 0.04,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
        });
        const points = new THREE.Points(geo, mat);
        scene.add(points);

        let mx = 0,
            my = 0;
        const onMouse = (e) => {
            mx = (e.clientX / window.innerWidth - 0.5) * 0.4;
            my = (e.clientY / window.innerHeight - 0.5) * 0.4;
        };
        window.addEventListener("mousemove", onMouse);

        let frame;
        const startTime = performance.now();
        const animate = () => {
            frame = requestAnimationFrame(animate);
            const t = (performance.now() - startTime) / 1000;
            points.rotation.y = t * 0.04 + mx;
            points.rotation.x = t * 0.02 - my;
            mat.opacity = 0.55 + Math.sin(t * 0.5) * 0.15;
            renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
            const nW = el.clientWidth,
                nH = el.clientHeight;
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
                className="inline-block w-[3px] h-[0.9em] bg-accent-blue ml-1 align-middle rounded-sm"
            />
        </span>
    );
}

// ── Video CV Modal (with sound) ───────────────────────────────────────
function VideoCVModal({ videoSource, onClose }) {
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

    const embedUrl = buildVideoEmbed(videoSource);
    const thumbUrl = buildVideoThumbnail(videoSource);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9998,
                background: "rgba(0,0,0,0.9)",
                backdropFilter: "blur(16px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
            }}
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 32 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 32 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
                style={{ width: "100%", maxWidth: 720, position: "relative" }}
            >
                {/* Glow ring */}
                <div
                    style={{
                        position: "absolute",
                        inset: -4,
                        background: "linear-gradient(135deg, #4f8ef7, #8b5cf6)",
                        borderRadius: 28,
                        filter: "blur(16px)",
                        opacity: 0.35,
                        pointerEvents: "none",
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        background: "#070d1a",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 24,
                        overflow: "hidden",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "16px 20px",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                            }}
                        >
                            <div
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 10,
                                    background:
                                        "linear-gradient(135deg, #4f8ef7, #8b5cf6)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Volume2 size={16} color="white" />
                            </div>
                            <div>
                                <div
                                    style={{
                                        color: "white",
                                        fontWeight: 700,
                                        fontSize: 14,
                                    }}
                                >
                                    Video CV — Utkal Behera
                                </div>
                                <div
                                    style={{
                                        color: "#64748b",
                                        fontSize: 11,
                                        marginTop: 2,
                                    }}
                                >
                                    Full Stack Developer · MERN & Cloud · Sound
                                    enabled
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "#94a3b8",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Video 16:9 */}
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            paddingTop: "56.25%",
                            background: "#000",
                        }}
                    >
                        <iframe
                            src={embedUrl}
                            allow="autoplay; encrypted-media; fullscreen"
                            allowFullScreen
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                border: "none",
                            }}
                            title="Utkal Behera Video CV"
                        />
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "12px 20px",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        <div style={{ display: "flex", gap: 8 }}>
                            {["MERN", "Cloud", "DevOps", "Next.js"].map((t) => (
                                <span
                                    key={t}
                                    style={{
                                        fontSize: 10,
                                        fontWeight: 700,
                                        padding: "4px 10px",
                                        borderRadius: 999,
                                        background: "rgba(79,142,247,0.1)",
                                        color: "#4f8ef7",
                                        border: "1px solid rgba(79,142,247,0.2)",
                                    }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                        <a
                            href={buildVideoOpenUrl(videoSource)}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                fontSize: 11,
                                color: "#4f8ef7",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            <ExternalLink size={11} />
                            {videoSource.type === "youtube" ? "Open in YouTube" : "Open in Drive"}
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Stat pill ─────────────────────────────────────────────────────────
function StatPill({ value, label, color, loading }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <span
                style={{
                    fontSize: "1.4rem",
                    fontWeight: 900,
                    color,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
            >
                {loading ? (
                    <span
                        style={{
                            display: "inline-block",
                            width: 32,
                            height: 20,
                            background: "rgba(255,255,255,0.08)",
                            borderRadius: 4,
                            animation: "shimmer 1.5s infinite",
                        }}
                    />
                ) : (
                    value
                )}
            </span>
            <span
                style={{
                    fontSize: "0.6rem",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginTop: 2,
                    fontWeight: 600,
                }}
            >
                {label}
            </span>
        </div>
    );
}

// ── Avatar + silent video ─────────────────────────────────────────────
function AvatarWithVideo({ profileImage }) {
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
    const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });
    const rotateX = useTransform(springY, [0, 1], ["10deg", "-10deg"]);
    const rotateY = useTransform(springX, [0, 1], ["-10deg", "10deg"]);
    const glareX = useTransform(springX, [0, 1], ["0%", "100%"]);
    const glareY = useTransform(springY, [0, 1], ["0%", "100%"]);
    const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.2) 0%, transparent 55%)`;

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
                className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px]"
            >
                {/* Spinning conic gradient aura */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        position: "absolute",
                        inset: -16,
                        borderRadius: "50%",
                        background:
                            "conic-gradient(from 0deg, #4f8ef7, #8b5cf6, #06b6d4, #10b981, #4f8ef7)",
                        filter: "blur(20px)",
                        opacity: 0.22,
                        pointerEvents: "none",
                    }}
                />

                {/* Outer rings */}
                <div
                    style={{
                        position: "absolute",
                        inset: -6,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.08)",
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: -14,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.04)",
                        pointerEvents: "none",
                    }}
                />

                {/* Main circle */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "3px solid rgba(15,23,42,0.08)",
                        cursor: "default",
                        zIndex: 10,
                    }}
                >
                    {/* Profile photo — always present as base */}
                    {profileImage && (
                        <img
                            src={profileImage}
                            alt="Utkal Behera"
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "top",
                            }}
                        />
                    )}

                    {/* Fallback UB if no photo */}
                    {!profileImage && (
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(135deg, #4f8ef7, #8b5cf6)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "4rem",
                                fontWeight: 900,
                                color: "white",
                            }}
                        >
                            UB
                        </div>
                    )}

                    {/* Glare overlay */}
                    <motion.div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: glare,
                            mixBlendMode: "overlay",
                            opacity: 0.3,
                            pointerEvents: "none",
                        }}
                    />

                </div>

                {/* Badge — Top Skill */}
                <motion.div
                    style={{ translateZ: 60 }}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute top-8 -left-6 z-20
            flex items-center gap-3 px-4 py-3 rounded-2xl
            bg-slate-900/90 dark:bg-[#0d1424]/90 border border-slate-200/10 dark:border-white/12
            backdrop-blur-xl shadow-xl"
                >
                    <div
                        className="w-9 h-9 rounded-xl bg-accent-blue/20
            border border-accent-blue/30
            flex items-center justify-center text-lg text-white"
                    >
                        ⚛
                    </div>
                    <div>
                        <div
                            className="text-[10px] text-slate-300 dark:text-slate-400 font-bold
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
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-14 -right-6 z-20
            flex items-center gap-3 px-4 py-3 rounded-2xl
            bg-slate-900/90 dark:bg-[#0d1424]/90 border border-slate-200/10 dark:border-white/12
            backdrop-blur-xl shadow-xl"
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
            </motion.div>
        </motion.div>
    );
}

// ── Animation variants ────────────────────────────────────────────────
const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
};

// ── Main Hero ─────────────────────────────────────────────────────────
export default function Hero({ config }) {
    const hero = config?.hero || {};
    const videoSource = parseVideoSource(hero.videoCV || "") || {
        type: "drive",
        id: DEFAULT_VIDEO_ID,
    };
    if (!videoSource.id) {
        videoSource.id = DEFAULT_VIDEO_ID;
        videoSource.type = "drive";
    }

    const [showModal, setShowModal] = useState(false);
    const [stats, setStats] = useState({
        projects: null,
        lcSolved: null,
        cgpa: null,
        internships: null,
    });
    const [statsLoading, setStatsLoading] = useState(true);

    // Fetch all stats in parallel
    useEffect(() => {
        const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

        Promise.allSettled([
            // Projects count
            fetch(`${API}/projects`).then((r) => r.json()),
            // LeetCode
            fetch(`${API}/leetcode/${LC_USERNAME}`).then((r) => r.json()),
            // Experience (internships)
            fetch(`${API}/experience`).then((r) => r.json()),
            // Semesters (CGPA)
            fetch(`${API}/semesters`).then((r) => r.json()),
        ]).then(([projRes, lcRes, expRes, semRes]) => {
            const projects =
                projRes.status === "fulfilled"
                    ? projRes.value?.data?.length || projRes.value?.total || 0
                    : null;

            const lcSolved =
                lcRes.status === "fulfilled" && lcRes.value?.totalSolved
                    ? lcRes.value.totalSolved
                    : null;

            const internships =
                expRes.status === "fulfilled"
                    ? expRes.value?.data?.length || 0
                    : null;

            const cgpa =
                semRes.status === "fulfilled" && semRes.value?.cgpa
                    ? semRes.value.cgpa
                    : null;

            setStats({
                projects: projects !== null ? `${projects}+` : null,
                lcSolved: lcSolved !== null ? `${lcSolved}+` : null,
                cgpa: cgpa !== null ? `${cgpa}` : null,
                internships: internships !== null ? `${internships}+` : null,
            });
            setStatsLoading(false);
        });
    }, []);

    const socials = [
        {
            href: "https://github.com/Utkal9",
            icon: <Github size={19} />,
            label: "GitHub",
            hover: "hover:bg-[#333]/80 hover:border-[#555] hover:text-white",
        },
        {
            href: "https://www.linkedin.com/in/utkal-behera59/",
            icon: <Linkedin size={19} />,
            label: "LinkedIn",
            hover: "hover:bg-[#0077b5]/20 hover:border-[#0077b5]/60 hover:text-[#0077b5]",
        },
        {
            href: "https://leetcode.com/u/utkal59/",
            icon: <SiLeetcode size={19} />,
            label: "LeetCode",
            hover: "hover:bg-[#f89f1b]/15 hover:border-[#f89f1b]/50 hover:text-[#f89f1b]",
        },
    ];

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center pt-16 pb-10 overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-300"
        >
            <ThreeBackground />

            {/* Ambient glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute -top-32 -left-32 w-[500px] h-[500px]
          rounded-full blur-[120px]"
                    style={{ background: "rgba(79,142,247,0.07)" }}
                />
                <div
                    className="absolute -bottom-32 -right-32 w-[450px] h-[450px]
          rounded-full blur-[100px]"
                    style={{ background: "rgba(139,92,246,0.07)" }}
                />
            </div>

            {/* Dot grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.18]"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(79,142,247,0.5) 1px, transparent 1px)",
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
          justify-between gap-10 xl:gap-16"
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
                            className="inline-flex items-center gap-2 mb-6
                px-4 py-2 rounded-full
                border border-accent-blue/20"
                            style={{ background: "rgba(79,142,247,0.06)" }}
                        >
                            <motion.span
                                animate={{ scale: [1, 1.35, 1] }}
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
                            <Sparkles size={12} className="text-accent-blue" />
                        </motion.div>

                        {/* Greeting */}
                        <motion.p
                            variants={item}
                            className="text-slate-400 text-sm font-semibold
                tracking-[0.18em] uppercase mb-3"
                        >
                            Hello World 👋, I'm
                        </motion.p>

                        {/* Name */}
                        <motion.h1
                            variants={item}
                            className="font-black mb-4 leading-[1.0] tracking-tight text-slate-900 dark:text-white"
                            style={{
                                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                        >
                            {hero.name || "Utkal Behera"}
                        </motion.h1>

                        {/* Typing */}
                        <motion.div
                            variants={item}
                            className="text-2xl md:text-3xl mb-5 h-10
                flex items-center justify-center lg:justify-start"
                        >
                            <TypingEffect texts={ROLES} />
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={item}
                            className="text-slate-400 text-base md:text-lg
                max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed"
                        >
                            {hero.subtitle ||
                                "Building scalable web applications with MERN Stack · Next.js · Cloud & DevOps. Currently @ LPU, CSE."}
                        </motion.p>

                        {/* Meta */}
                        <motion.div
                            variants={item}
                            className="flex items-center gap-4 justify-center lg:justify-start
                mb-6 text-slate-500 text-xs font-medium"
                        >
                            <span className="flex items-center gap-1.5">
                                <MapPin
                                    size={12}
                                    className="text-accent-blue"
                                />
                                Phagwara, Punjab
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-700" />
                            <span className="flex items-center gap-1.5">
                                <GraduationCap
                                    size={12}
                                    className="text-accent-blue"
                                />
                                LPU · CSE · 2026
                            </span>
                        </motion.div>

                        {/* Stats row — real fetched data */}
                        <motion.div
                            variants={item}
                            className="flex items-center gap-5 justify-center lg:justify-start
                mb-8 pb-7"
                            style={{
                                borderBottom:
                                    "1px solid rgba(15,23,42,0.08)",
                            }}
                        >
                            <StatPill
                                value={stats.projects}
                                label="Projects"
                                color="#4f8ef7"
                                loading={statsLoading && !stats.projects}
                            />
                            <div
                                style={{
                                    width: 1,
                                    height: 32,
                                    background: "rgba(15,23,42,0.12)",
                                }}
                            />
                            <StatPill
                                value={stats.lcSolved}
                                label="LC Solved"
                                color="#f59e0b"
                                loading={statsLoading && !stats.lcSolved}
                            />
                            <div
                                style={{
                                    width: 1,
                                    height: 32,
                                    background: "rgba(15,23,42,0.12)",
                                }}
                            />
                            <StatPill
                                value={stats.cgpa}
                                label="CGPA"
                                color="#10b981"
                                loading={statsLoading && !stats.cgpa}
                            />
                            <div
                                style={{
                                    width: 1,
                                    height: 32,
                                    background: "rgba(15,23,42,0.12)",
                                }}
                            />
                            <StatPill
                                value={stats.internships}
                                label="Internships"
                                color="#8b5cf6"
                                loading={statsLoading && !stats.internships}
                            />
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={item}
                            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-7"
                        >
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="relative flex items-center gap-2.5
                  px-7 py-3.5 rounded-2xl font-bold text-sm text-white
                  overflow-hidden"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #4f8ef7, #8b5cf6)",
                                }}
                            >
                                <ExternalLink size={16} />
                                {hero.cta1Text || "View Projects"}
                            </motion.a>

                            <motion.a
                                href={resumeAPI.download()}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl
                  font-bold text-sm text-slate-900 dark:text-slate-200
                  border border-slate-300/70 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 transition-all duration-300"
                            >
                                <Download size={16} />
                                {hero.cta2Text || "Download CV"}
                            </motion.a>

                            <motion.button
                                type="button"
                                onClick={() => setShowModal(true)}
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl
                  font-bold text-sm text-white transition-all duration-300"
                                style={{
                                    background: "linear-gradient(135deg, #ef5350, #d32f2f)",
                                    border: "1px solid rgba(15,23,42,0.08)",
                                }}
                            >
                                <Play size={16} />
                                Video CV
                            </motion.button>
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                            variants={item}
                            className="flex items-center gap-3 justify-center lg:justify-start"
                        >
                            <span
                                className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold
                tracking-widest uppercase mr-1"
                            >
                                Find me
                            </span>
                            {socials.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ y: -4, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    title={s.label}
                                    className={`w-11 h-11 rounded-2xl flex items-center justify-center
                    border text-slate-500 dark:text-slate-300 bg-slate-100/85 dark:bg-white/5 border-slate-300/60 dark:border-white/10 transition-all duration-300 ${s.hover}`}
                                >
                                    {s.icon}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── RIGHT — Avatar with silent video ── */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.88,
                            filter: "blur(12px)",
                        }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{
                            duration: 1.1,
                            delay: 0.2,
                            ease: "easeOut",
                        }}
                        className="relative lg:w-[44%] flex justify-center"
                    >
                        <AvatarWithVideo
                            profileImage={hero.profileImage}
                        />
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2
            flex flex-col items-center gap-2"
                >
                    <span
                        className="text-[10px] text-slate-700 uppercase
            tracking-widest font-medium"
                    >
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 7, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-5 h-9 border border-slate-700 rounded-full
              flex justify-center pt-1.5"
                    >
                        <div className="w-1 h-2 bg-accent-blue rounded-full" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Video Modal with sound */}
            <AnimatePresence>
                {showModal && (
                    <VideoCVModal videoSource={videoSource} onClose={() => setShowModal(false)} />
                )}
            </AnimatePresence>
        </section>
    );
}
