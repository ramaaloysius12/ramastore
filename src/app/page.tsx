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
  Terminal, LayoutTemplate, ShieldCheck, Play, Megaphone,
  Rocket, Zap, MessageCircle
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
// NAVBAR DENGAN SIDEBAR MENU
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
    { name: "Harga", href: "#pricing" },
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
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="video/banner-bg.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
      
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
            <a href="/layanan" className="inline-flex items-center justify-center h-14 px-8 bg-transparent text-white border border-white/30 rounded-md font-medium hover:bg-white/10 transition backdrop-blur-sm w-full sm:w-auto">
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

// ==========================================
// KENAPA MEMILIH RAMA DEV
// ==========================================
const WhyChooseUs = () => {
  return (
    <section id="features" className="py-20 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <FadeIn direction="up" delay={0.1}>
          <div className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-3xl p-8 md:p-14 flex flex-col justify-center items-center text-center border border-blue-500 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                Kenapa Memilih <span className="text-blue-300">Rama Dev?</span>
              </h3>
              <p className="text-blue-100/90 text-sm md:text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
                Kami paham bahwa setiap bisnis memiliki keunikan tersendiri. Di Rama Dev, kami menggabungkan keahlian teknis dengan kreativitas tanpa batas untuk menciptakan website yang responsif, cepat, dan aman. Bersama kami, proses go-digital menjadi lebih mudah, transparan, dan terukur untuk melejitkan bisnis Anda ke level berikutnya.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                <div className="flex items-center gap-2 bg-white/10 px-4 md:px-6 py-2.5 rounded-full border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <Rocket className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                  <span className="text-xs md:text-sm font-bold text-white tracking-wide">INOVASI TERDEPAN</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 md:px-6 py-2.5 rounded-full border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                  <span className="text-xs md:text-sm font-bold text-white tracking-wide">KEAMANAN EKSTRA</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 md:px-6 py-2.5 rounded-full border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
                  <span className="text-xs md:text-sm font-bold text-white tracking-wide">PERFORMA MAKSIMAL</span>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl group-hover:bg-blue-400/30 transition-all duration-700"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all duration-700"></div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// ==========================================
// SECTION LAYANAN
// ==========================================
const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-900 text-white border-t border-gray-800">
      {/* max-w-7xl ditambahkan di sini agar layout desktop tidak kelebaran */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Solusi Digital Komprehensif</h2>
            <p className="text-gray-400 text-lg">Dari pembuatan website interaktif hingga pemasaran digital dan keamanan siber, kami siap mengembangkan bisnis Anda.</p>
          </div>
        </FadeIn>

        {/* Grid ini dirancang khusus bergaya bento-box. Sangat responsif di Mobile, Tablet, maupun Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FadeIn direction="up" delay={0.1}>
            <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-3xl p-8 xl:p-10 border border-gray-700 hover:border-blue-500/50 transition-colors h-full min-h-[280px] flex flex-col justify-between group">
              <LayoutTemplate className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-2xl font-bold mb-3">Web Development & UI/UX</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">Pembuatan website responsif, landing page, dan sistem informasi berkinerja tinggi menggunakan teknologi Next.js dan database modern.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="col-span-1 bg-blue-600 rounded-3xl p-8 xl:p-10 h-full min-h-[280px] flex flex-col justify-between hover:bg-blue-700 transition-colors group">
              <Megaphone className="w-12 h-12 text-blue-200 mb-6 group-hover:rotate-12 transition-transform" />
              <div>
                <h3 className="text-2xl font-bold mb-3">Digital Marketing</h3>
                <p className="text-blue-100 text-sm md:text-base leading-relaxed">Manajemen sosial media, strategi kampanye digital, dan optimasi SEO untuk meningkatkan visibilitas merek Anda.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="col-span-1 bg-gray-800 rounded-3xl p-8 xl:p-10 border border-gray-700 hover:border-blue-500/50 transition-colors h-full min-h-[280px] flex flex-col justify-between group">
              <Terminal className="w-12 h-12 text-blue-400 mb-6 group-hover:-translate-y-1 transition-transform" />
              <div>
                <h3 className="text-2xl font-bold mb-3">Maintenance & Integrasi</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">Dukungan teknis, perbaikan berkelanjutan, dan integrasi API agar sistem digital Anda tetap berjalan lancar tanpa hambatan.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-gray-950 rounded-3xl p-8 xl:p-10 border border-gray-800 h-full min-h-[280px] flex flex-col justify-between group overflow-hidden relative">
              <ShieldCheck className="w-12 h-12 text-green-400 mb-6 relative z-10 group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">Keamanan Siber & OSINT</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">Audit keamanan presisi, vulnerability scanning, dan pemantauan intelijen sumber terbuka (OSINT) untuk melindungi aset digital perusahaan Anda dari celah kerentanan.</p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gray-800/50 rounded-full blur-3xl"></div>
            </div>
          </FadeIn>
        </div>

        {/* Tombol Lihat Selengkapnya Layanan */}
        <FadeIn direction="up" delay={0.5}>
          <div className="mt-16 flex justify-center">
            <Link 
              href="/layanan" 
              className="group inline-flex items-center justify-center px-8 py-4 bg-gray-800 border border-gray-700 text-white rounded-full font-semibold hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-600/30"
            >
              Lihat Selengkapnya Layanan Kami
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// ==========================================
// SECTION PRICING HARGA
// ==========================================
const Pricing = () => {
  const plans = [
    {
      name: "UMKM",
      price: "Rp 200.000",
      description: "Solusi digital hemat untuk usaha kecil menengah yang baru merintis.",
      features: [
        "Include Domain & Hosting",
        "Free Maintenance",
        "Bebas Request Fitur",
        "Desain Responsif (Mobile Friendly)",
        "Optimasi SEO Dasar"
      ],
      isPopular: false,
      waText: "Halo Rama Dev, saya tertarik dengan paket pembuatan Website UMKM (Rp 200 Ribu)."
    },
    {
      name: "Company Profile",
      price: "Rp 1,5 Juta",
      description: "Tingkatkan kredibilitas perusahaan dengan profil digital profesional.",
      features: [
        "Include Domain Premium & Hosting",
        "Free Maintenance",
        "Bebas Request Fitur",
        "Desain Premium & UI/UX Modern",
        "Integrasi Google Analytics"
      ],
      isPopular: true,
      waText: "Halo Rama Dev, saya tertarik dengan paket pembuatan Website Company Profile (Rp 1,5 Juta)."
    },
    {
      name: "E-Commerce",
      price: "Rp 6 Juta",
      description: "Platform toko online lengkap untuk otomatisasi penjualan bisnis Anda.",
      features: [
        "Include Domain & Cloud Hosting",
        "Free Maintenance VIP",
        "Bebas Request Fitur Toko",
        "Integrasi Payment Gateway",
        "Manajemen Inventori & Ongkir Otomatis"
      ],
      isPopular: false,
      waText: "Halo Rama Dev, saya tertarik dengan paket pembuatan Website E-Commerce (Rp 6 Juta)."
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-950 text-white border-t border-gray-900">
      {/* max-w-6xl ditambahkan di sini agar layout desktop proposional */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Investasi Terjangkau, Hasil Maksimal</h2>
            <p className="text-gray-400 text-lg">Semua paket sudah termasuk <strong className="text-white">Domain, Hosting, Maintenance, dan Bebas Request Fitur</strong> tanpa biaya tersembunyi.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <FadeIn key={plan.name} direction="up" delay={0.1 * (index + 1)}>
              <div className={`relative flex flex-col h-full rounded-3xl p-8 transition-transform hover:-translate-y-2 ${
                plan.isPopular 
                  ? "bg-gradient-to-b from-blue-900 to-gray-900 border-2 border-blue-500 shadow-2xl shadow-blue-900/50" 
                  : "bg-gray-900 border border-gray-800"
              }`}>
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                    Paling Diminati
                  </div>
                )}
                
                <div className="mb-8 mt-2">
                  <h3 className="text-2xl font-bold text-gray-100 mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm h-10">{plan.description}</p>
                </div>
                
                <div className="mb-8">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                </div>
                
                <ul className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={`https://wa.me/6288227142563?text=${encodeURIComponent(plan.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-colors mt-auto ${
                    plan.isPopular 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  Checkout Via WhatsApp
                </a>
              </div>
            </FadeIn>
          ))}
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
                    <option value="security">Keamanan siber</option>
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
      <WhyChooseUs />
      <Services />
      <Pricing />
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
