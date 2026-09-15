"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Menu, X, ArrowRight, CheckCircle2, 
  LayoutTemplate, Code, Smartphone, 
  Megaphone, TrendingUp, Search,
  Terminal, ShieldCheck, Server,
  MessageSquare, Users, Video, MessageCircle,
  Lock, Database
} from "lucide-react";

// ==========================================
// 1. KOMPONEN ANIMASI
// ==========================================
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const FadeIn = ({ children, delay = 0, direction = "up" }: FadeInProps) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// 2. NAVBAR
// ==========================================
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Layanan", href: "/layanan" },
    { name: "Kontak", href: "/#contact" },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm py-3" : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className={`text-2xl font-bold tracking-tighter transition-colors ${isScrolled ? "text-gray-900" : "text-white"}`}>
            RAMA <span className="text-blue-500">DEV</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={`text-sm font-medium transition-colors ${isScrolled ? "text-gray-600 hover:text-blue-600" : "text-gray-200 hover:text-white"}`}>
                {link.name}
              </Link>
            ))}
            <Link href="/#contact" className="bg-blue-600 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
              Mulai Proyek
            </Link>
          </nav>
          <button 
            className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"}`} 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`fixed top-0 right-0 h-screen w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <span className="text-xl font-extrabold text-blue-600">Menu</span>
          <button className="p-2 rounded-lg text-gray-500 bg-gray-50 hover:bg-red-50 hover:text-red-500" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={22} />
          </button>
        </div>
        <div className="flex flex-col p-6 gap-2 flex-1">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          <div className="mt-auto border-t border-gray-100 pt-6 flex flex-col gap-3">
            <Link href="/dashboard" className="text-center bg-slate-100 text-slate-600 px-5 py-3.5 rounded-xl text-base font-bold hover:bg-slate-200 transition-all">Dashboard Admin</Link>
          </div>
        </div>
      </div>
    </>
  );
};

// ==========================================
// 3. HERO SECTION
// ==========================================
const ServicesHero = () => {
  return (
    <section className="relative w-full pt-40 pb-20 overflow-hidden bg-slate-950">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/20 blur-[100px] rounded-full"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <FadeIn>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Solusi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Digital Terpadu</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed mb-10">
            Kami memadukan rekayasa perangkat lunak modern, pemasaran digital berbasis data, dan sistem keamanan tingkat tinggi untuk mendongkrak performa bisnis Anda.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

// ==========================================
// 4. DETAIL LAYANAN (WEB DEV)
// ==========================================
const WebDevSection = () => {
  return (
    <section className="py-24 bg-slate-900 border-b border-slate-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <FadeIn direction="right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
                <Code size={16} /> Web Development
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Bangun Kehadiran Digital yang <span className="text-blue-400">Cepat & Responsif</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Kami membangun website dan aplikasi web berkinerja tinggi menggunakan arsitektur Next.js dan Node.js. Mulai dari Company Profile, E-Commerce, hingga sistem Dashboard Admin yang kompleks.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "UI/UX Design modern bergaya Glassmorphism & Minimalis.",
                  "Performa super cepat (Optimasi SEO teknikal & Hydration).",
                  "Integrasi Database aman (PostgreSQL / Prisma / Supabase).",
                  "Mobile-First Responsive (Sempurna di layar HP maupun Desktop)."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <FadeIn direction="left">
              <div className="relative rounded-3xl bg-slate-800 border border-slate-700 p-8 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-500/30 transition-colors"></div>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
                    <LayoutTemplate className="text-blue-400 mb-4" size={32} />
                    <h4 className="text-white font-bold mb-2">Company Profile</h4>
                    <p className="text-sm text-slate-400">Tingkatkan kredibilitas merek di internet.</p>
                  </div>
                  <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
                    <Smartphone className="text-cyan-400 mb-4" size={32} />
                    <h4 className="text-white font-bold mb-2">Web Apps</h4>
                    <p className="text-sm text-slate-400">Aplikasi kasir, CRM, dan manajemen bisnis.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 5. DETAIL LAYANAN (DIGITAL MARKETING & ADS)
// ==========================================
const MarketingSection = () => {
  return (
    <section className="py-24 bg-slate-950 border-b border-slate-800">
      <div className="container mx-auto px-4 md:px-8">
        {/* Konten Utama Digital Marketing */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-24">
          <div className="lg:w-1/2">
            <FadeIn direction="left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold mb-6">
                <TrendingUp size={16} /> Digital Marketing
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Strategi Pemasaran <span className="text-purple-400">Berbasis Data & Terukur</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Website yang bagus butuh pengunjung. Kami merancang kampanye periklanan dan strategi konten yang dirancang khusus untuk meningkatkan eksposur merek dan mendatangkan prospek berkualitas.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Manajemen Iklan Meta (Facebook & Instagram) dan TikTok Ads.",
                  "Optimasi Mesin Pencari (SEO) untuk peringkat 1 Google.",
                  "Manajemen Konten & Sosial Media untuk interaksi pelanggan.",
                  "Laporan Analitik mendalam untuk mengukur konversi penjualan."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="text-purple-400 shrink-0 mt-0.5" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <FadeIn direction="right">
              <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full group-hover:bg-purple-500/30 transition-colors"></div>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800">
                    <Megaphone className="text-purple-400 mb-4" size={32} />
                    <h4 className="text-white font-bold mb-2">Social Ads</h4>
                    <p className="text-sm text-slate-400">Targeting presisi ke audiens yang tepat.</p>
                  </div>
                  <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800">
                    <Search className="text-pink-400 mb-4" size={32} />
                    <h4 className="text-white font-bold mb-2">SEO Blueprint</h4>
                    <p className="text-sm text-slate-400">Dominasi hasil pencarian organik.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Sub-Section Jasa Manajemen Iklan */}
        <div className="border-t border-slate-800/80 pt-20">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Manajemen Iklan Profesional</h3>
              <p className="text-slate-400 text-lg">Maksimalkan ROI (Return on Investment) Anda dengan kampanye iklan yang ditargetkan secara tajam di berbagai platform raksasa digital.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {/* Google Ads */}
            <FadeIn delay={0.1}>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-blue-500 transition-colors group h-full shadow-lg">
                <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Search size={28} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Google Ads</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Tangkap audiens yang memiliki niat beli tinggi. Kami mengelola kampanye Search, Display, dan Performance Max untuk mendatangkan traffic yang siap konversi langsung ke website Anda dengan biaya per klik yang optimal.
                </p>
              </div>
            </FadeIn>

            {/* Facebook / Meta Ads */}
            <FadeIn delay={0.2}>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-purple-500 transition-colors group h-full shadow-lg">
                <div className="w-14 h-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users size={28} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Facebook & IG Ads</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Manfaatkan algoritma canggih Meta untuk menargetkan audiens berdasarkan minat, perilaku, dan lokasi spesifik. Sangat efektif untuk membangun brand awareness, melakukan retargeting, dan lead generation berantai.
                </p>
              </div>
            </FadeIn>

            {/* TikTok Ads */}
            <FadeIn delay={0.3}>
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-pink-500 transition-colors group h-full shadow-lg">
                <div className="w-14 h-14 bg-pink-500/10 text-pink-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Video size={28} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">TikTok Ads</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Raih perhatian pasar milenial dan Gen Z dengan kampanye video pendek yang kreatif dan mudah viral. Tingkatkan angka interaksi (engagement) brand dan dorong volume penjualan melalui tren terbaru.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center">
              <a 
                href="https://wa.me/6288227142563?text=Halo%20Rama%20Dev,%20saya%20ingin%20konsultasi%20mengenai%20Jasa%20Manajemen%20Iklan%20(Google/Meta/TikTok)" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-600/30 hover:-translate-y-1"
              >
                <MessageCircle size={22} />
                Konsultasi Pemasaran Sekarang
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 6. DETAIL LAYANAN (MAINTENANCE & SECURITY)
// ==========================================
const MaintenanceSection = () => {
  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4 md:px-8">
        {/* Konten Utama Maintenance */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="lg:w-1/2">
            <FadeIn direction="right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6">
                <Server size={16} /> Maintenance & Keamanan
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Lindungi Aset Digital Anda dengan <span className="text-emerald-400">Infrastruktur Tangguh</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Kami memastikan sistem IT Anda beroperasi 24/7 tanpa henti. Dari otomatisasi pembaruan server hingga perlindungan keamanan proaktif agar bisnis Anda bebas dari ancaman siber.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Pengelolaan Server Linux & Cloud Architecture (AWS).",
                  "Automasi CI/CD Pipeline (Docker, Kubernetes, Jenkins).",
                  "Vulnerability Scanning & Analisis Keamanan .",
                  "Support Maintenance & Integrasi API Berkala."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <FadeIn direction="left">
              <div className="relative rounded-3xl bg-slate-800 border border-slate-700 p-8 shadow-2xl overflow-hidden group">
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full group-hover:bg-emerald-500/30 transition-colors"></div>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
                    <Terminal className="text-emerald-400 mb-4" size={32} />
                    <h4 className="text-white font-bold mb-2">DevOps Ops</h4>
                    <p className="text-sm text-slate-400">Deployment cepat tanpa downtime.</p>
                  </div>
                  <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
                    <ShieldCheck className="text-teal-400 mb-4" size={32} />
                    <h4 className="text-white font-bold mb-2">Security Pentester</h4>
                    <p className="text-sm text-slate-400">Deteksi dini celah kerentanan sistem.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Sub-Section Jasa Maintenance & Keamanan (BARU) */}
        <div className="border-t border-slate-800/80 pt-20">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Layanan Pemeliharaan & Keamanan Proaktif</h3>
              <p className="text-slate-400 text-lg">Tinggalkan kerumitan teknis kepada kami. Fokus kembangkan bisnis Anda sementara kami menjaga sistem Anda tetap aman, cepat, dan selalu online.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {/* Server Maintenance */}
            <FadeIn delay={0.1}>
              <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl hover:border-emerald-500 transition-colors group h-full shadow-lg">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Server size={28} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Server Maintenance</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Pemantauan server 24/7, pembaruan sistem operasi rutin, pengelolaan panel hosting (cPanel/CyberPanel), dan optimasi kinerja database untuk memastikan aplikasi Anda selalu berjalan di performa puncak.
                </p>
              </div>
            </FadeIn>

            {/* Audit & Keamanan */}
            <FadeIn delay={0.2}>
              <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl hover:border-teal-500 transition-colors group h-full shadow-lg">
                <div className="w-14 h-14 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Lock size={28} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Cyber Security Audit</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Deteksi dini celah keamanan sebelum dieksploitasi peretas. Kami melakukan vulnerability scanning, penetration testing berkala, pengawasan OSINT, dan implementasi WAF (Web Application Firewall) berlapis.
                </p>
              </div>
            </FadeIn>

            {/* Backup & Recovery */}
            <FadeIn delay={0.3}>
              <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl hover:border-cyan-500 transition-colors group h-full shadow-lg">
                <div className="w-14 h-14 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Database size={28} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Backup & Recovery</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Lindungi aset data bisnis Anda dari serangan ransomware atau kegagalan perangkat keras. Kami menyetel sinkronisasi backup otomatis ke cloud dengan skenario pemulihan data (Disaster Recovery) yang sangat cepat.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <div className="text-center">
              <a 
                href="https://wa.me/6288227142563?text=Halo%20Rama%20Dev,%20saya%20ingin%20konsultasi%20mengenai%20Layanan%20Maintenance%20dan%20Keamanan%20Server" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/30 hover:-translate-y-1"
              >
                <MessageCircle size={22} />
                Konsultasi Keamanan IT Sekarang
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 7. CALL TO ACTION (CTA)
// ==========================================
const CTASection = () => {
  return (
    <section className="py-24 bg-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 blur-[100px] rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Siap Mendigitalisasi Bisnis Anda?</h2>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Tim ahli kami yang berpusat di Jawa Barat (Tasikmalaya & Bandung) siap membantu Anda menyusun arsitektur sistem dan strategi digital dari nol hingga sukses.
          </p>
          <Link href="/#contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-900 bg-white rounded-xl shadow-2xl hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300">
            <MessageSquare className="mr-2" size={24} /> Konsultasi Proyek Sekarang
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};

// ==========================================
// 8. PAGE EXPORT UTAMA
// ==========================================
export default function ServicesPage() {
  return (
    <main className="min-h-screen font-sans bg-slate-950 selection:bg-blue-500/30">
      <Navbar />
      <ServicesHero />
      <WebDevSection />
      <MarketingSection />
      <MaintenanceSection />
      <CTASection />
      
      <footer className="bg-gray-950 text-gray-500 py-10 text-center text-sm border-t border-gray-900">
        <div className="container mx-auto px-4">
          
          <p className="mb-6 text-gray-400 font-medium">
            📍 M429+C9P, Sukamulya, Kec. Singaparna, Kabupaten Tasikmalaya, Jawa Barat 46416
          </p>
          
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://wa.me/6288227142563" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 hover:scale-110 transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 hover:scale-110 transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>

          <p className="text-gray-500">&copy; {new Date().getFullYear()} Rama DevOps Company. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
