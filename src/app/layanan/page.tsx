"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Menu, X, ArrowRight, CheckCircle2, 
  LayoutTemplate, Code, Smartphone, 
  Megaphone, TrendingUp, Search,
  Terminal, ShieldCheck, Server,
  MessageSquare
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
// 2. NAVBAR (Disesuaikan untuk Halaman Dalam)
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
            Rama <span className="text-blue-500">DevOps</span>
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

      {/* Mobile Menu (Sama seperti Homepage) */}
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
// 3. HERO SECTION (Khusus Halaman Layanan)
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
// 5. DETAIL LAYANAN (DIGITAL MARKETING)
// ==========================================
const MarketingSection = () => {
  return (
    <section className="py-24 bg-slate-950 border-b border-slate-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
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
        <div className="flex flex-col lg:flex-row items-center gap-16">
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
                    <h4 className="text-white font-bold mb-2">Scurity Pentester</h4>
                    <p className="text-sm text-slate-400">Deteksi dini celah kerentanan sistem.</p>
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
      
      <footer className="bg-slate-950 text-slate-500 py-10 text-center text-sm border-t border-slate-900">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <p className="mb-2">📍 Beroperasi di Tasikmalaya & Bandung</p>
          <p>&copy; {new Date().getFullYear()} Rama DevOps Company. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
