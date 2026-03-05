import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} from "../lib/emailjs";

import {
  Calendar,
  MapPin,
  Users,
  Check,
  ChevronDown,
  Clock,
  Award,
  Target,
  TrendingUp,
  Shield,
  Briefcase,
  Globe,
  Mail,
  ArrowRight,
  Star,
  Building2,
  Plane,
  Coffee,
  Gift,
  Utensils,
  Network,
  ExternalLink,
} from "lucide-react";

import { SiWhatsapp, SiInstagram, SiLinkedin } from "react-icons/si";

/* =========================
   ASSETS (TU CARPETA)
   ========================= */
import cigeLogo from "../assets/logos/logo cige.png";

import resort1 from "../assets/images/resort1.jpg";
import resort2 from "../assets/images/resort2.jpg";
import resort3 from "../assets/images/resort3.jpg";
import resort4 from "../assets/images/resort4.jpg";
import resort5 from "../assets/images/resort5.jpg";
import resort6 from "../assets/images/resort6.jpg";

import logoAsoColombia from "../assets/logos/logo_asosiacion_colombia-removebg-preview.png";
import logoAvanzia from "../assets/logos/logo_avanzia-removebg-preview.png";
import logoCBRT from "../assets/logos/logo_cbrt-removebg-preview.png";
import logoCesiInternacional from "../assets/logos/logo_cesinternacional-removebg-preview.png";
import logoCesiTours from "../assets/logos/logo_cesitours-removebg-preview.png";
import logoCongelando from "../assets/logos/logo_congelando_historias-removebg-preview.png";
import logoDiclaTravels from "../assets/logos/logo_dicla_travels-removebg-preview.png";
import logoFiba from "../assets/logos/logo_fiba-removebg-preview.png";
import logoSnapCompliance from "../assets/logos/logo_snap_compliance-removebg-preview.png";

/* =========================
   THEME (concige vibe)
   ========================= */
const COLORS = {
  orange: "#F97316",
  orangeSoft: "rgba(249,115,22,.14)",
  blue: "#0EA5E9",
  blueSoft: "rgba(14,165,233,.14)",
  text: "#111827",
  muted: "#6B7280",
  border: "rgba(15, 23, 42, 0.10)",
  card: "rgba(255,255,255,0.85)",
};

// ✅ Framer Motion Variants (TS-friendly)
const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }, // 👈 en vez de "easeOut"
  },
} as const;

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
} as const;

const softIn = {
  hidden: { opacity: 0, scale: 0.985 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
} as const;


const hoverCard =
  "transition-all duration-200 hover:-translate-y-[2px] hover:scale-[1.01] hover:shadow-[0_14px_40px_rgba(2,6,23,0.12)]";

const hoverBtn =
  "transition-all duration-200 hover:-translate-y-[1px] hover:scale-[1.03] hover:shadow-[0_14px_30px_rgba(2,6,23,0.12)] active:scale-[0.99]";

/* =========================
   DATA
   ========================= */
type Speaker = {
  name: string;
  country: string;
  topic: string;
  linkedin: string; // placeholder (cámbialo luego por el real)
};

const speakers: Speaker[] = [
  { name: "Armando Díaz", country: "República Dominicana", topic: "Cibercrimen Real", linkedin: "https://www.linkedin.com/in/username" },
  { name: "Andrés Mauricio Castro", country: "Colombia", topic: "Estrategia Competitiva e IA", linkedin: "https://www.linkedin.com/in/username" },
  { name: "Milca N. Peguero", country: "República Dominicana", topic: "Personal Branding", linkedin: "https://www.linkedin.com/in/username" },
  { name: "Yleana Lazala", country: "República Dominicana", topic: "Compras con Integridad ESG", linkedin: "https://www.linkedin.com/in/username" },
  { name: "Óscar Moratto", country: "Colombia", topic: "Ventas de Alto Impacto", linkedin: "https://www.linkedin.com/in/username" },
  { name: "Luis Morel", country: "República Dominicana", topic: "Ciberseguridad ISO 27001", linkedin: "https://www.linkedin.com/in/username" },
  { name: "Carolina Saldarriaga", country: "Colombia", topic: "Cultura Preventiva", linkedin: "https://www.linkedin.com/in/username" },
  { name: "Wilmer Terrero", country: "República Dominicana", topic: "PMO Ágil de Riesgo", linkedin: "https://www.linkedin.com/in/username" },
  { name: "Alex Silie", country: "Costa Rica", topic: "Control y CEO", linkedin: "https://www.linkedin.com/in/username" },
  { name: "Luis Mellado", country: "Colombia", topic: "Fraude Empresarial", linkedin: "https://www.linkedin.com/in/username" },
  { name: "Juan José Acuña", country: "Costa Rica", topic: "Alta Dirección", linkedin: "https://www.linkedin.com/in/username" },
  { name: "Ariella Pepén", country: "República Dominicana", topic: "Gestión de Riesgos GRC", linkedin: "https://www.linkedin.com/in/username" }, {
    name: "Katia Morales",
    country: "República Dominicana",
    topic:
      "Confianza Empresarial en la Era Digital: Compliance, IA y Transparencia como Ejes Estratégicos",
    linkedin: "https://www.linkedin.com/in/username",
  },
  {
    name: "Gustavo A. de los Santos Coll",
    country: "República Dominicana",
    topic:
      "Prevención legal estratégica y gobernanza empresarial en la era de los desafíos globales",
    linkedin: "https://www.linkedin.com/in/username",
  },
];

const agenda = [
  {
    day: "Jueves 26",
    date: "26 de Marzo",
    title: "Bienvenida & Apertura",
    events: [
      { time: "6:30 pm - 7:00 pm", title: "Registro y acreditación", desc: "Centro de Convenciones" },
      { time: "7:00 pm - 7:20 pm", title: "Ceremonia de apertura", desc: "Palabras del Comité Organizador y patrocinadores" },
      { time: "7:20 pm - 9:00 pm", title: "Cena de Bienvenida", desc: '"Conectando Voluntades"' },
    ],
  },
  {
    day: "Viernes 27",
    date: "27 de Marzo",
    title: "Programa Completo",
    events: [
      { time: "9:00 - 9:45", title: "Alta Dirección, Cultura y Liderazgo", desc: "Juan José Acuña, Costa Rica" },
      { time: "9:45 - 10:45", title: "PMO Ágil de Riesgo: S&OP + Continuidad", desc: "Wilmer Terrero, Rep. Dominicana" },
      { time: "11:00 - 12:00", title: "Estrategia Competitiva e IA Aplicada", desc: "Andrés Mauricio Castro, Colombia" },
      { time: "1:15 - 2:15", title: "Ventas de Alto Impacto", desc: "Storytelling de valor y social selling" },
      { time: "2:15 - 3:00", title: "Compras con Integridad ESG", desc: "Yleana Lazala, Rep. Dominicana" },
      { time: "3:00 - 3:45", title: "Gestión de Riesgos y Control Interno GRC", desc: "Ariella Pepén, Rep. Dominicana" },
      { time: "3:45 - 4:30", title: "Fraude Empresarial", desc: "Luis Mellado, Colombia" },
      { time: "4:30 - 5:00", title: "Mesa Redonda 360°", desc: "Federico M. Santos, Colombia" },
    ],
  },
  {
    day: "Sábado 28",
    date: "28 de Marzo",
    title: "Programa Académico",
    events: [
      { time: "8:30 - 9:15", title: "Cultura Preventiva", desc: "Carolina Saldarriaga, Colombia" },
      { time: "9:15 - 10:00", title: "Cibercrimen Real", desc: "Armando Díaz, Rep. Dominicana" },
      { time: "10:15 - 11:00", title: "Control y Alertas para el CEO", desc: "Alex Silie, Costa Rica" },
      { time: "11:00 - 12:00", title: "Ciberseguridad ISO 27001 y COBIT", desc: "Luis Morel, Rep. Dominicana" },
      { time: "12:00 - 1:00", title: "Personal Branding y Marca Personal", desc: "Milca Peguero, Rep. Dominicana" },
      { time: "1:00 pm", title: "Clausura y brindis", desc: "Reconocimientos y próximos pasos" },
      { time: "1:30 pm", title: "Almuerzo networking libre", desc: "" },
    ],
  },
  {
    day: "Domingo 29",
    date: "29 de Marzo",
    title: "Día Libre y Salidas",
    events: [
      { time: "Mañana", title: "Día libre", desc: "Playa y reuniones 1:1" },
      { time: "12:00 pm", title: "Entrega de habitaciones", desc: "" },
      { time: "2:00 pm", title: "Almuerzo y Salida", desc: "" },
    ],
  },
];

const topics = [
  { icon: Target, title: "Alta Dirección y Liderazgo", desc: "Cultura y liderazgo que ejecuta" },
  { icon: TrendingUp, title: "Estrategia Competitiva e IA", desc: "IA aplicada al negocio" },
  { icon: Briefcase, title: "Ventas de Alto Impacto", desc: "Storytelling y motor comercial" },
  { icon: Shield, title: "Compras con Integridad ESG", desc: "Inclusión y transparencia" },
  { icon: Award, title: "Gestión de Riesgos GRC", desc: "Control interno y auditoría" },
  { icon: Globe, title: "Prevención de Fraudes", desc: "Antisoborno y cumplimiento" },
];

const packageIncludes = [
  { icon: Building2, text: "Sede de hospedaje: Dreams Playa Esmeralda" },
  { icon: Check, text: "Registro y acreditación al Congreso" },
  { icon: Coffee, text: "Estadía todo incluido (AI)" },
  { icon: Plane, text: "Traslados colectivos aeropuerto ↔ hotel" },
  { icon: MapPin, text: "Traslado colectivo Santo Domingo ↔ Miches" },
  { icon: Gift, text: "Materiales de apoyo y didácticos" },
  { icon: Users, text: "Asistencia de staff especializado" },
  { icon: Coffee, text: "Refrigerios en traslados" },
  { icon: Gift, text: "Regalo personalizado" },
  { icon: Utensils, text: "Cena de bienvenida" },
  { icon: Utensils, text: "Cóctel de clausura" },
  { icon: Network, text: "Networking con especialistas y patrocinadores" },
];

const sponsors = [
  { name: "Asociación Colombiana de Oficiales de Cumplimiento", url: "https://www.linkedin.com", img: logoAsoColombia },
  { name: "Avanzia Consulting", url: "https://www.linkedin.com", img: logoAvanzia },
  { name: "CBRT Cybersecurity Blue & Red Team", url: "https://www.linkedin.com", img: logoCBRT },
  { name: "CESI Internacional", url: "https://cesinternacional.com", img: logoCesiInternacional },
  { name: "CESI Tours & Events", url: "https://cesitours.com", img: logoCesiTours },
  { name: "Congelando Historias", url: "https://www.linkedin.com", img: logoCongelando },
  { name: "Dicla Travels", url: "https://www.linkedin.com", img: logoDiclaTravels },
  { name: "FIBA", url: "https://fiba.net", img: logoFiba },
  { name: "Snap Compliance", url: "https://www.linkedin.com", img: logoSnapCompliance },
];

/* =========================
   UI
   ========================= */
function Pill({
  children,
  tone = "blue",
}: {
  children: React.ReactNode;
  tone?: "blue" | "orange";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${hoverBtn}`}
      style={{
        borderColor: COLORS.border,
        background: tone === "blue" ? COLORS.blueSoft : COLORS.orangeSoft,
        color: COLORS.text,
      }}
    >
      {children}
    </span>
  );
}

function ButtonA({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
}) {
  const base = "inline-flex items-center justify-center rounded-xl px-5 py-3 font-bold";
  if (variant === "primary") {
    return (
      <a
        href={href}
        className={`${base} ${hoverBtn}`}
        style={{
          background: COLORS.orange,
          color: "white",
          boxShadow: "0 14px 30px rgba(249,115,22,.22)",
        }}
      >
        {children}
      </a>
    );
  }
  if (variant === "ghost") {
    return (
      <a
        href={href}
        className={`${base} ${hoverBtn}`}
        style={{ background: "white", color: COLORS.text, border: `1px solid ${COLORS.border}` }}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      className={`${base} ${hoverBtn}`}
      style={{ background: "transparent", color: COLORS.text, border: `1px solid ${COLORS.border}` }}
    >
      {children}
    </a>
  );
}

function CardA({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border ${hoverCard} ${className}`}
      style={{ borderColor: COLORS.border, background: COLORS.card, backdropFilter: "blur(10px)" }}
    >
      {children}
    </div>
  );
}

/* =========================
   HERO SLIDER (3 imágenes)
   ========================= */
function HeroSlider({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % images.length), 5200);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="absolute inset-0 -z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 1.05 }}
          style={{
            backgroundImage: `url(${images[idx]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      {/* overlay blanco tipo concige */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.86) 55%, rgba(255,255,255,0.94) 100%)",
        }}
      />

      {/* manchas suaves */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full blur-3xl" style={{ background: COLORS.orangeSoft }} />
      <div className="absolute -right-24 bottom-16 h-72 w-72 rounded-full blur-3xl" style={{ background: COLORS.blueSoft }} />
    </div>
  );
}

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

export default function Home() {
  const heroImages = useMemo(() => [resort1, resort2, resort3], []);
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; msg: string }>({
    type: "idle",
    msg: "",
  });

  // ✅ Inicializa EmailJS (una vez)
  useEffect(() => {
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    } catch {
      // no-op
    }
  }, []);

  const onChange = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
  };

  // ✅ ENVÍO REAL POR EMAILJS (READY)
  async function sendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;

    setStatus({ type: "idle", msg: "" });
    setSending(true);

    try {
      // Estos params deben coincidir con tu template de EmailJS
      // Recomendación: en EmailJS usa variables: {{name}} {{company}} {{email}} {{phone}} {{message}} {{subject}}
      const templateParams = {
        subject: "Nuevo registro / solicitud — CIGE 2026",
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        message: form.message,
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);

      setStatus({ type: "success", msg: "Enviado ✅ Te contactaremos pronto." });
      setForm({ name: "", company: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", msg: "Ups… no se pudo enviar. Revisa tu EmailJS y vuelve a intentar." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "#FFFFFF", color: COLORS.text }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          borderColor: COLORS.border,
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src={cigeLogo} alt="CIGE" className="h-8 w-auto" />
            <span className="font-extrabold" style={{ color: COLORS.text }}>2026</span>
          </div>

          <div className="hidden md:flex items-center gap-7 text-sm font-semibold" style={{ color: COLORS.muted }}>
            <a className="transition hover:text-black" href="#sobre">Sobre</a>
            <a className="transition hover:text-black" href="#agenda">Agenda</a>
            <a className="transition hover:text-black" href="#ponentes">Ponentes</a>
            <a className="transition hover:text-black" href="#sede">Sede</a>
            <a className="transition hover:text-black" href="#inversion">Inversión</a>
          </div>

          <ButtonA href="#registro">Registrarse</ButtonA>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[92vh] pt-16 overflow-hidden">
        <HeroSlider images={heroImages} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div className="mx-auto max-w-5xl text-center" initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="mb-6 inline-flex justify-center">
              <Pill tone="blue"><Calendar className="h-4 w-4" /> 26 - 29 de Marzo 2026</Pill>
            </motion.div>

            {/* TITULO MÁS FINO */}
            <motion.h1
              variants={fadeInUp}
              className="tracking-tight leading-[1.06]"
              style={{
                fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
                color: COLORS.text,
              }}
            >
              <span style={{ fontWeight: 650 }}>Congreso Internacional de</span>{" "}
              <span
                style={{
                  fontWeight: 650,
                  background: `linear-gradient(90deg, ${COLORS.orange} 0%, ${COLORS.blue} 55%, ${COLORS.orange} 100%)`,
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Gestión Empresarial
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="mt-4 font-serif italic" style={{ color: COLORS.blue, fontSize: "1.5rem" }}>
              SoberanIA Empresarial
            </motion.p>

            <motion.p variants={fadeInUp} className="mt-4 mx-auto max-w-2xl" style={{ color: COLORS.muted, fontSize: "1.05rem" }}>
              IA, Integridad y Crecimiento. El evento ejecutivo más importante de Latinoamérica
              para líderes que buscan transformar sus organizaciones.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <ButtonA href="#registro">Registrarse Ahora <ArrowRight className="ml-2 h-5 w-5" /></ButtonA>
              <ButtonA href="#agenda" variant="ghost">Ver Agenda</ButtonA>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap items-center justify-center gap-4" style={{ color: COLORS.muted }}>
              <Pill tone="orange"><MapPin className="h-4 w-4" /> Dreams Playa Esmeralda</Pill>
              <Pill tone="blue"><Globe className="h-4 w-4" /> Miches, República Dominicana</Pill>
              <Pill tone="orange"><Users className="h-4 w-4" /> +100 Ejecutivos</Pill>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="rounded-full border p-2"
            style={{ borderColor: COLORS.border, background: "rgba(255,255,255,0.7)" }}
          >
            <ChevronDown className="h-6 w-6" style={{ color: COLORS.muted }} />
          </motion.div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeInUp}>
            <div className="mb-4 inline-flex justify-center"><Pill tone="orange">Sobre el Congreso</Pill></div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: COLORS.text }}>Transformando la Gestión Empresarial</h2>
            <p className="mx-auto max-w-2xl" style={{ color: COLORS.muted }}>
              Un congreso diseñado para ejecutivos C-Suite que buscan liderar con integridad,
              implementar IA de manera estratégica y lograr crecimiento sostenible.
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            {topics.map((t, i) => (
              <motion.div key={i} variants={softIn}>
                <CardA>
                  <div className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(14,165,233,0.10)" }}>
                      <t.icon className="h-6 w-6" style={{ color: COLORS.blue }} />
                    </div>
                    <h3 className="text-lg font-extrabold mb-2" style={{ color: COLORS.text }}>{t.title}</h3>
                    <p className="text-sm" style={{ color: COLORS.muted }}>{t.desc}</p>
                  </div>
                </CardA>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AGENDA */}
      <section id="agenda" className="py-24" style={{ background: "rgba(14,165,233,0.04)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeInUp}>
            <div className="mb-4 inline-flex justify-center"><Pill tone="blue">Programa</Pill></div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: COLORS.text }}>Agenda del Congreso</h2>
            <p className="mx-auto max-w-2xl" style={{ color: COLORS.muted }}>
              Cuatro días de aprendizaje intensivo, networking y experiencias únicas.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {agenda.map((day, di) => (
              <CardA key={di}>
                <div className="border-b p-4" style={{ borderColor: COLORS.border, background: "rgba(255,255,255,0.7)" }}>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-extrabold text-lg" style={{ color: COLORS.text }}>{day.day}</p>
                      <p className="text-sm" style={{ color: COLORS.muted }}>{day.date}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold ${hoverBtn}`}
                      style={{ background: COLORS.orangeSoft, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
                    >
                      {day.title}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {day.events.map((ev, ei) => (
                    <div key={ei} className="flex gap-4">
                      <div className="w-32 text-sm flex-shrink-0" style={{ color: COLORS.muted }}>
                        <Clock className="inline h-4 w-4 mr-1" style={{ color: COLORS.blue }} />
                        {ev.time}
                      </div>
                      <div>
                        <p className="font-bold" style={{ color: COLORS.text }}>{ev.title}</p>
                        {ev.desc ? <p className="text-sm" style={{ color: COLORS.muted }}>{ev.desc}</p> : null}
                      </div>
                    </div>
                  ))}
                </div>
              </CardA>
            ))}
          </div>
        </div>
      </section>

      {/* PONENTES */}
      <section id="ponentes" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeInUp}>
            <div className="mb-4 inline-flex justify-center"><Pill tone="orange">Expertos</Pill></div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: COLORS.text }}>Especialistas Invitados</h2>
            <p className="mx-auto max-w-2xl" style={{ color: COLORS.muted }}>
              Referentes internacionales en liderazgo, estrategia, IA, marketing, ventas y prevención de fraudes.
            </p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            {speakers.map((s, i) => (
              <motion.div key={i} variants={softIn}>
                <CardA className="overflow-hidden">
                  <div className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(249,115,22,0.10)" }}>
                      <Users className="h-8 w-8" style={{ color: COLORS.orange }} />
                    </div>

                    <h3 className="font-extrabold" style={{ color: COLORS.text }}>{s.name}</h3>
                    <p className="text-sm" style={{ color: COLORS.muted }}>{s.country}</p>

                    <span
                      className="mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold"
                      style={{ background: COLORS.blueSoft, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
                    >
                      {s.topic}
                    </span>

                    <div className="mt-5 flex items-center justify-center gap-3">
                      <a
                        href={s.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold ${hoverBtn}`}
                        style={{ border: `1px solid ${COLORS.border}`, background: "rgba(255,255,255,0.85)", color: COLORS.text }}
                        title="LinkedIn (cámbialo luego por el real)"
                      >
                        <SiLinkedin className="h-4 w-4" style={{ color: COLORS.blue }} />
                        LinkedIn
                        <ExternalLink className="h-4 w-4" style={{ color: COLORS.muted }} />
                      </a>
                    </div>
                  </div>
                </CardA>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEDE + MAPA + FOTOS */}
      <section id="sede" className="py-24" style={{ background: "rgba(249,115,22,0.05)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeInUp}>
            <div className="mb-4 inline-flex justify-center"><Pill tone="blue">Sede</Pill></div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: COLORS.text }}>Dreams Playa Esmeralda</h2>
            <p className="mx-auto max-w-2xl" style={{ color: COLORS.muted }}>
              Miches, República Dominicana. Naturaleza prístina + infraestructura all-inclusive.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <CardA>
                <div className="p-8">
                  <blockquote className="text-lg font-serif italic" style={{ color: COLORS.text }}>
                    “Un escenario que eleva la experiencia ejecutiva y multiplica el valor percibido del evento.”
                  </blockquote>

                  <div className="mt-8 space-y-4">
                    {[
                      { icon: MapPin, title: "Ubicación privilegiada", desc: "Miches, costa noreste de RD" },
                      { icon: Star, title: "Resort 5 estrellas", desc: "Instalaciones premium con todo incluido" },
                      { icon: Users, title: "Centro de Convenciones", desc: "Espacios modernos para el programa" },
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: COLORS.blueSoft }}>
                          <f.icon className="h-5 w-5" style={{ color: COLORS.blue }} />
                        </div>
                        <div>
                          <h4 className="font-extrabold" style={{ color: COLORS.text }}>{f.title}</h4>
                          <p className="text-sm" style={{ color: COLORS.muted }}>{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardA>

              <div className={`mt-6 overflow-hidden rounded-2xl border ${hoverCard}`} style={{ borderColor: COLORS.border, background: "#fff" }}>
                <iframe
                  title="Mapa Dreams Playa Esmeralda"
                  src="https://www.google.com/maps?q=Dreams%20Playa%20Esmeralda%20Miches&output=embed"
                  width="100%"
                  height="320"
                  loading="lazy"
                  style={{ border: 0 }}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { img: resort4, title: "Resort", sub: "Suites de lujo" },
                { img: resort5, title: "Playa", sub: "Aguas cristalinas" },
                { img: resort6, title: "Convenciones", sub: "Confort ejecutivo" },
                { img: resort2, title: "Todo incluido", sub: "Restaurantes premium" },
              ].map((x, i) => (
                <div
                  key={i}
                  className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border ${hoverCard}`}
                  style={{ borderColor: COLORS.border, background: "#fff" }}
                >
                  <img
                    src={x.img}
                    alt={x.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent p-4 flex flex-col justify-end">
                    <p className="font-extrabold" style={{ color: COLORS.text }}>{x.title}</p>
                    <p className="text-sm" style={{ color: COLORS.muted }}>{x.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INVERSIÓN */}
      <section id="inversion" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-4 inline-flex justify-center"><Pill tone="orange">Inversión</Pill></div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: COLORS.text }}>Paquetes y Tarifas</h2>
            <p className="mx-auto max-w-2xl" style={{ color: COLORS.muted }}>
              4 días / 3 noches por persona. Todo incluido en Dreams Playa Esmeralda.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Suite Individual", desc: "Habitación individual exclusiva", old: "USD $1,995.00 después del 15/3", price: "$1,895", note: "Hasta el 15 de Marzo" },
              { title: "Suite Doble Compartida", desc: "Compartir suite con otro asistente", old: "USD $1,695.00 después del 15/3", price: "$1,595", note: "Hasta el 15 de Marzo", popular: true },
              { title: "Acompañante", desc: "En suite individual del titular", old: "", price: "$669", note: "Niños 2-12 años: $255", outline: true },
            ].map((p, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border p-8 ${hoverCard}`}
                style={{ borderColor: p.popular ? "rgba(249,115,22,0.55)" : COLORS.border, background: "rgba(255,255,255,0.90)" }}
              >
                {p.popular ? (
                  <div
                    className="absolute left-0 right-0 top-0 rounded-t-2xl text-center py-2 text-sm font-extrabold"
                    style={{ background: COLORS.orange, color: "white" }}
                  >
                    Más Popular
                  </div>
                ) : null}

                <div className={p.popular ? "pt-10" : ""}>
                  <h3 className="text-xl font-extrabold mb-2" style={{ color: COLORS.text }}>{p.title}</h3>
                  <p className="text-sm mb-6" style={{ color: COLORS.muted }}>{p.desc}</p>

                  {p.old ? <p className="text-sm line-through mb-1" style={{ color: "rgba(107,114,128,0.75)" }}>{p.old}</p> : null}

                  <p className="text-4xl font-extrabold" style={{ color: COLORS.text }}>
                    {p.price} <span className="text-base font-bold" style={{ color: COLORS.muted }}>USD</span>
                  </p>

                  <p className="text-sm mt-2" style={{ color: COLORS.muted }}>{p.note}</p>

                  <div className="mt-6">
                    <ButtonA href="#registro" variant={p.outline ? "outline" : "primary"}>
                      {p.outline ? "Agregar Acompañante" : "Reservar Ahora"}
                    </ButtonA>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CardA>
            <div className="p-8">
              <h3 className="text-xl font-extrabold mb-6 text-center" style={{ color: COLORS.text }}>El paquete incluye:</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {packageIncludes.map((x, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: COLORS.orangeSoft }}>
                      <x.icon className="h-4 w-4" style={{ color: COLORS.orange }} />
                    </div>
                    <span className="text-sm" style={{ color: COLORS.text }}>{x.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardA>
        </div>
      </section>

      {/* PATROCINADORES (solo logos, sin click, con hover) */}
      <section
        className="py-16 border-y"
        style={{ borderColor: COLORS.border, background: "rgba(255,255,255,0.70)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-4 inline-flex justify-center">
              <Pill tone="blue">Patrocinadores</Pill>
            </div>
            <h2 className="text-2xl font-extrabold" style={{ color: COLORS.text }}>
              Empresas que apoyan el congreso
            </h2>
            <p className="mt-2 text-sm" style={{ color: COLORS.muted }}>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsors.map((s, i) => (
              <div
                key={i}
                className={`rounded-2xl border p-6 flex items-center justify-center ${hoverCard}`}
                style={{ borderColor: COLORS.border, background: "rgba(255,255,255,0.92)" }}
                title={s.name}
                role="img"
                aria-label={s.name}
              >
                <img
                  src={s.img}
                  alt={s.name}
                  className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* REGISTRO */}
      <section id="registro" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-4 inline-flex justify-center lg:justify-start"><Pill tone="orange">Registro</Pill></div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: COLORS.text }}>Regístrate Ahora</h2>
              <p className="mb-8" style={{ color: COLORS.muted }}>
                Completa el formulario y nuestro equipo se pondrá en contacto contigo para finalizar tu inscripción.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: COLORS.blueSoft }}>
                    <Mail className="h-6 w-6" style={{ color: COLORS.blue }} />
                  </div>
                  <div>
                    <p className="font-extrabold" style={{ color: COLORS.text }}>Más Información</p>
                    <p style={{ color: COLORS.muted }}>info@cesinternacional.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(34,197,94,0.12)" }}>
                    <SiWhatsapp className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-extrabold" style={{ color: COLORS.text }}>WhatsApp</p>
                    <p className="mb-2" style={{ color: COLORS.muted }}>+1 809 756 3753</p>

                    <a
                      href="https://wa.me/18097563753?text=Hola%2C%20quiero%20información%20sobre%20CIGE%202026"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-extrabold text-white ${hoverBtn}`}
                      style={{ background: "#22c55e", boxShadow: "0 14px 30px rgba(34,197,94,.18)" }}
                    >
                      <SiWhatsapp className="h-4 w-4" /> Escríbenos
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(236,72,153,0.10)" }}>
                    <SiInstagram className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-extrabold" style={{ color: COLORS.text }}>Síguenos</p>
                    <div className="flex flex-wrap gap-3">
                      <a className="font-bold hover:underline" style={{ color: COLORS.text }} href="https://www.instagram.com/cesinternacional/" target="_blank" rel="noopener noreferrer">
                        @cesinternacional
                      </a>
                      <a className="font-bold hover:underline" style={{ color: COLORS.text }} href="https://www.instagram.com/cesitours/" target="_blank" rel="noopener noreferrer">
                        @cesitours
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CardA>
              <div className="p-8">
                <form className="space-y-4" onSubmit={sendEmail}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold" style={{ color: COLORS.text }}>Nombre Completo</label>
                      <input
                        value={form.name}
                        onChange={onChange("name")}
                        className="mt-2 w-full rounded-xl border px-4 py-3 outline-none transition"
                        style={{ borderColor: COLORS.border, background: "white" }}
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold" style={{ color: COLORS.text }}>Empresa</label>
                      <input
                        value={form.company}
                        onChange={onChange("company")}
                        className="mt-2 w-full rounded-xl border px-4 py-3 outline-none transition"
                        style={{ borderColor: COLORS.border, background: "white" }}
                        placeholder="Tu empresa"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold" style={{ color: COLORS.text }}>Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={onChange("email")}
                        className="mt-2 w-full rounded-xl border px-4 py-3 outline-none transition"
                        style={{ borderColor: COLORS.border, background: "white" }}
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold" style={{ color: COLORS.text }}>Teléfono</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={onChange("phone")}
                        className="mt-2 w-full rounded-xl border px-4 py-3 outline-none transition"
                        style={{ borderColor: COLORS.border, background: "white" }}
                        placeholder="+1 809 000 0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold" style={{ color: COLORS.text }}>Mensaje (opcional)</label>
                    <textarea
                      value={form.message}
                      onChange={onChange("message")}
                      className="mt-2 w-full rounded-xl border px-4 py-3 outline-none transition"
                      style={{ borderColor: COLORS.border, background: "white" }}
                      rows={4}
                      placeholder="¿Alguna pregunta o comentario?"
                    />
                  </div>

                  {/* ESTADO */}
                  {status.type !== "idle" ? (
                    <div
                      className="rounded-xl border px-4 py-3 text-sm font-bold"
                      style={{
                        borderColor: status.type === "success" ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)",
                        background: status.type === "success" ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
                        color: COLORS.text,
                      }}
                    >
                      {status.msg}
                    </div>
                  ) : null}

                  <button
                    className={`w-full rounded-xl py-3 font-extrabold text-white ${hoverBtn}`}
                    style={{
                      background: sending ? "rgba(249,115,22,.65)" : COLORS.orange,
                      boxShadow: "0 14px 30px rgba(249,115,22,.22)",
                      cursor: sending ? "not-allowed" : "pointer",
                    }}
                    type="submit"
                    disabled={sending}
                  >
                    {sending ? "Enviando..." : "Enviar Solicitud"}
                  </button>

                  <p className="text-xs mt-2" style={{ color: COLORS.muted }}>
                    Al enviar aceptas que el equipo de CIGE 2026 te contacte por email/WhatsApp para completar tu inscripción.
                  </p>
                </form>
              </div>
            </CardA>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-12" style={{ borderColor: COLORS.border, background: "white" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={cigeLogo} alt="CIGE" className="h-8 w-auto" />
                <span className="font-extrabold" style={{ color: COLORS.text }}>2026</span>
              </div>
              <p className="text-sm" style={{ color: COLORS.muted }}>
                Congreso Internacional de Gestión Empresarial. SoberanIA Empresarial: IA, Integridad y Crecimiento.
              </p>
            </div>

            <div>
              <h4 className="font-extrabold mb-4" style={{ color: COLORS.text }}>Evento</h4>
              <ul className="space-y-2 text-sm" style={{ color: COLORS.muted }}>
                <li>26 - 29 de Marzo 2026</li>
                <li>Dreams Playa Esmeralda</li>
                <li>Miches, República Dominicana</li>
              </ul>
            </div>

            <div>
              <h4 className="font-extrabold mb-4" style={{ color: COLORS.text }}>Organiza</h4>
              <p className="text-sm mb-2" style={{ color: COLORS.muted }}>CESI Internacional</p>
              <p className="text-sm" style={{ color: COLORS.muted }}>Congresos, Eventos y Seminarios Internacionales</p>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-sm" style={{ borderColor: COLORS.border, color: COLORS.muted }}>
            © 2026 CIGE - Congreso Internacional de Gestión Empresarial. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
