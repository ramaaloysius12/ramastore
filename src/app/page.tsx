"use client";

import NewsSlider from "../components/NewsSlider";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Menu, X, ArrowRight, CheckCircle2, 
  Cloud, Terminal, LayoutTemplate, ShieldCheck, Play, Megaphone 
} from "lucide-react";

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
// NAVBAR DENGAN SIDEBAR MENU (BARU)
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
    { name: "Layanan", href: "/layanan" },
    { name: "Keunggulan", href: "#features" },
    { name: "Kontak", href: "#contact" },
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
          
          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={`text-sm font-medium transition-colors ${isScrolled ? "text-gray-600 hover:text-blue-600" : "text-gray-200 hover:text-white"}`}>
                {link.name}
              </Link>
            ))}
            <a href="#contact" className="bg-blue-600 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
              Mulai Proyek
            </a>
          </nav>

          {/* Tombol Hamburger Mobile */}
          <button 
            className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"}`} 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* Overlay Gelap Mobile */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Sidebar Navigasi Muncul Dari Kanan */}
      <div className={`fixed top-0 right-0 h-screen w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden flex flex-col ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <span className="text-xl font-extrabold text-blue-600 tracking-tight">Menu Navigasi</span>
          <button 
            className="p-2 rounded-lg text-gray-500 bg-gray-50 hover:bg-red-50 hover:text-red-500 transition-colors" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={22} />
          </button>
        </div>
        
        <div className="flex flex-col p-6 gap-2 flex-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-colors" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="mt-auto border-t border-gray-100 pt-6 flex flex-col gap-3">
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="bg-blue-600 text-center text-white px-5 py-3.5 rounded-xl text-base font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all"
            >
              Mulai Proyek
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const HeroVideoBanner = () => {
  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="video/banner-bg.mp4" type="video/mp4" />
      </video>
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
      
      {/* Konten Hero Teks (Dibuang margin top-nya agar lebih pas di tengah) */}
      <div className="relative z-20 container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        <FadeIn direction="up" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-300 text-sm font-medium mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Tingkatkan Skala Bisnis Anda ke Level Selanjutnya.
          </div>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.2}>
          <h1 className="max-w-4xl mx-auto text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Otomatisasi Skala Bisnis Anda dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Teknologi Modern.</span>
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.3}>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
          Solusi digital end-to-end terpercaya. Dari pengembangan website responsif hingga strategi pemasaran digital yang terukur. Kami hadir untuk mentransformasi visi Anda menjadi realitas digital.
          </p>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#contact" className="inline-flex items-center justify-center h-14 px-8 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 w-full sm:w-auto">
              HUBUNGI KAMI<ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a href="#/layanan" className="inline-flex items-center justify-center h-14 px-8 bg-transparent text-white border border-white/30 rounded-md font-medium hover:bg-white/10 transition backdrop-blur-sm w-full sm:w-auto">
              LAYANAN<Play className="ml-2 h-4 w-4" />
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-300 font-medium">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-400" /> Web & Apps Ready</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-400" /> Next.js Optimized</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-400" /> Support 24/7</div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};


const ClientStats = () => {
  return (
    <section className="py-20 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <FadeIn direction="up" delay={0.1}>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 flex flex-col justify-center min-h-[220px] border border-blue-500 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-4">
                    <h3 className="text-6xl md:text-7xl font-extrabold text-white">85+</h3>
                    <div className="text-blue-100 text-sm md:text-base font-medium leading-tight">Klien<br/>Korporat &<br/>Startup</div>
                  </div>
                  <p className="text-blue-100/80 text-sm md:text-base">Telah mempercayakan transformasi digital, arsitektur cloud, dan keamanan infrastruktur mereka kepada kami.</p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-1">
            <FadeIn direction="up" delay={0.2}>
              <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 min-h-[220px] flex flex-col justify-between hover:border-blue-500/50 transition-colors">
                <div>
                  <div className="flex text-yellow-400 mb-4 gap-1">
                     {[...Array(5)].map((_, i) => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                  </div>
                  <p className="text-gray-300 text-sm mb-6">"Migrasi sangat mulus. Tim bekerja cepat dan hasil websitenya sangat memuaskan."</p>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">TechCorp Jabar</p>
                  <p className="text-gray-500 text-xs">Bandung, Indonesia</p>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-1">
            <FadeIn direction="up" delay={0.3}>
              <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 min-h-[220px] flex flex-col justify-between hover:border-blue-500/50 transition-colors">
                <div>
                  <div className="flex text-yellow-400 mb-4 gap-1">
                     {[...Array(5)].map((_, i) => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                  </div>
                  <p className="text-gray-300 text-sm mb-6">"Web apps kami load 3x lebih cepat berkat optimasi stack Next.js."</p>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Fintech Nusantara</p>
                  <p className="text-gray-500 text-xs">Tasikmalaya, Indonesia</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Solusi Digital Komprehensif</h2>
            <p className="text-gray-400 text-lg">Dari pembuatan website interaktif hingga pemasaran digital dan keamanan siber, kami siap mengembangkan bisnis Anda.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {/* Card 1: Web Dev (Besar) */}
          <FadeIn direction="up" delay={0.1}>
            <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-3xl p-8 border border-gray-700 hover:border-blue-500/50 transition-colors h-full flex flex-col justify-between group">
              <LayoutTemplate className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-xl font-bold mb-2">Web Development & UI/UX</h3>
                <p className="text-gray-400">Pembuatan website responsif, landing page, dan sistem informasi berkinerja tinggi menggunakan teknologi Next.js dan database modern.</p>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: Digital Marketing (Kecil Biru) */}
          <FadeIn direction="up" delay={0.2}>
            <div className="col-span-1 bg-blue-600 rounded-3xl p-8 h-full flex flex-col justify-between hover:bg-blue-700 transition-colors group">
              <Megaphone className="w-10 h-10 text-blue-200 mb-4 group-hover:rotate-12 transition-transform" />
              <div>
                <h3 className="text-xl font-bold mb-2">Digital Marketing</h3>
                <p className="text-blue-100 text-sm">Manajemen sosial media, strategi kampanye digital, dan optimasi SEO untuk meningkatkan visibilitas merek Anda.</p>
              </div>
            </div>
          </FadeIn>

          {/* Card 3: Maintenance (Kecil Gelap) */}
          <FadeIn direction="up" delay={0.3}>
            <div className="col-span-1 bg-gray-800 rounded-3xl p-8 border border-gray-700 hover:border-blue-500/50 transition-colors h-full flex flex-col justify-between group">
              <Terminal className="w-10 h-10 text-blue-400 mb-4 group-hover:-translate-y-1 transition-transform" />
              <div>
                <h3 className="text-xl font-bold mb-2">Maintenance & Integrasi</h3>
                <p className="text-gray-400 text-sm">Dukungan teknis, perbaikan berkelanjutan, dan integrasi API agar sistem digital Anda tetap berjalan lancar tanpa hambatan.</p>
              </div>
            </div>
          </FadeIn>

          {/* Card 4: Security (Besar) */}
          <FadeIn direction="up" delay={0.4}>
            <div className="col-span-1 md:col-span-2 bg-gray-950 rounded-3xl p-8 border border-gray-800 h-full flex flex-col justify-between group overflow-hidden relative">
              <ShieldCheck className="w-10 h-10 text-green-400 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Keamanan Siber & OSINT</h3>
                <p className="text-gray-400">Audit keamanan presisi, vulnerability scanning, dan pemantauan intelijen sumber terbuka (OSINT) untuk melindungi aset digital perusahaan Anda dari celah kerentanan.</p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gray-800/50 rounded-full blur-3xl"></div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  service: z.string().min(1, "Silakan pilih layanan"),
  message: z.string().min(10, "Pesan terlalu singkat (min. 10 karakter)"),
});
type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Gagal mengirim pesan");
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 border-t border-gray-200 text-gray-900">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-5 border border-gray-100">
          <div className="md:col-span-2 bg-blue-600 p-10 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">Mari Berkolaborasi</h3>
              <p className="text-blue-100 mb-8">Diskusikan kebutuhan infrastruktur dan pengembangan software Anda bersama tim kami.</p>
              <div className="space-y-4 text-blue-50">
                <p>📍 Area Layanan:<br/>Tasikmalaya & Bandung, Jawa Barat</p>
                <p>🕒 Jam Operasional:<br/>Senin - Jumat, 09:00 - 17:00</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 p-10">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Pesan Terkirim!</h3>
                <p className="text-gray-600">Kami akan segera menghubungi Anda kembali.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                  <input {...register("name")} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white" placeholder="John Doe" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input {...register("email")} type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white" placeholder="john@company.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Peminatan Layanan</label>
                  <select {...register("service")} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                    <option value="">Pilih layanan...</option>
                    <option value="web-dev">Web Development</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="maintenance">Maintenance </option>
                    <option value="security">Keamanan scurity</option>
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pesan</label>
                  <textarea {...register("message")} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none bg-white" placeholder="Ceritakan detail proyek Anda..."></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400">
                  {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <main className="min-h-screen font-sans bg-gray-900">
      <Navbar />
      <HeroVideoBanner />
      <ClientStats />
      <Services />
      <NewsSlider />
      <Contact />
      <footer className="bg-gray-950 text-gray-500 py-8 text-center text-sm border-t border-gray-900">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Rama DevOps Company. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}