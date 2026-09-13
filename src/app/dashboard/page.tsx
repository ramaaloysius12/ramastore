"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Users, FileText, Handshake, Mail, Activity, Sparkles } from "lucide-react";

export default function DashboardHome() {
  const router = useRouter();
  
  // State untuk Keamanan (Satpam)
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [stats, setStats] = useState({
    client: 0,
    news: 0,
    crm: 0,
    inbox: 0
  });
  const [loading, setLoading] = useState(true);

  // 🛡️ EFEK 1: Pengecekan Keamanan (Satpam)
  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("token_login") || localStorage.getItem("user");

    if (!token) {
      router.replace("/");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // 📊 EFEK 2: Mengambil angka statistik secara real-time
  useEffect(() => {
    if (!isAuthorized) return;

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        if (json.success) {
          setStats(json.data);
        }
      } catch (error) {
        console.error("Gagal memuat statistik");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [isAuthorized]); 

  // 🚧 LAYAR LOADING KEAMANAN (Diperbarui jadi lebih modern)
  if (!isAuthorized) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center w-full rounded-[2.5rem]">
        <div className="relative w-16 h-16 flex items-center justify-center mb-6">
          <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <Activity className="w-6 h-6 text-indigo-600 animate-pulse" />
        </div>
        <p className="text-slate-500 font-bold tracking-wide animate-pulse">Memverifikasi Keamanan...</p>
      </div>
    );
  }

  // ==========================================
  // 👇 KODE TAMPILAN DASHBOARD (Desain Diperbarui) 👇
  // ==========================================
  
  // Konfigurasi Kartu dengan Ikon Lucide & Warna Vibrant
  const statCards = [
    { 
      title: "Total Client", value: stats.client, icon: <Users className="w-7 h-7" />, 
      grad: "from-blue-600 to-cyan-400", shadow: "shadow-blue-500/30", text: "text-blue-600", bgGlow: "bg-blue-100"
    },
    { 
      title: "Berita Aktif", value: stats.news, icon: <FileText className="w-7 h-7" />, 
      grad: "from-emerald-500 to-teal-400", shadow: "shadow-emerald-500/30", text: "text-emerald-600", bgGlow: "bg-emerald-100"
    },
    { 
      title: "Data CRM", value: stats.crm, icon: <Handshake className="w-7 h-7" />, 
      grad: "from-violet-600 to-fuchsia-500", shadow: "shadow-violet-500/30", text: "text-violet-600", bgGlow: "bg-violet-100"
    },
    { 
      title: "Pesan Masuk", value: stats.inbox, icon: <Mail className="w-7 h-7" />, 
      grad: "from-rose-500 to-orange-400", shadow: "shadow-rose-500/30", text: "text-rose-600", bgGlow: "bg-rose-100"
    },
  ];

  return (
    <div className="space-y-8 relative font-sans">
      
      {/* 🚀 BANNER SAMBUTAN (Premium Vibrant Gradient) */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 p-10 sm:p-14 text-white shadow-2xl shadow-indigo-900/20 border border-white/10">
        
        {/* Ornamen Cahaya Abstrak (Gradient Mesh) */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-overlay blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-gradient-to-tr from-fuchsia-400 to-violet-500 rounded-full mix-blend-overlay blur-3xl opacity-60 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20 text-cyan-100 text-xs font-bold backdrop-blur-md uppercase tracking-wider shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
            </span>
            Sistem Online & Aktif
          </div>
          
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Selamat Datang di <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white drop-shadow-md flex items-center gap-3 mt-1">
              Pusat Kendali <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-cyan-300" />
            </span>
          </h1>
          
          <p className="text-blue-100/90 max-w-2xl text-base sm:text-lg leading-relaxed mt-6 font-medium">
            Ini adalah ruang komando utama Rama DevOps. Pantau lalu lintas data, kelola daftar klien, terbitkan berita terbaru, dan bangun relasi CRM secara instan.
          </p>
        </div>
      </div>

      {/* 📊 GRID STATISTIK KARTU (Modern Minimalist Card) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <div 
            key={i} 
            className="group relative overflow-hidden rounded-[2rem] bg-white p-7 border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-slate-200"
          >
            {/* Background Lembut di belakang icon saat hover */}
            <div className={`absolute -right-10 -top-10 w-40 h-40 ${card.bgGlow} rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-50 pointer-events-none`}></div>
            
            <div className="relative flex items-center z-10">
              {/* Ikon Box dengan Warna Gradient Penuh */}
              <div className={`mr-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${card.grad} text-white shadow-lg ${card.shadow} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                {card.icon}
              </div>
              
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  {card.title}
                </p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                  {loading ? (
                    <span className="inline-block h-8 w-16 animate-pulse rounded-lg bg-slate-100"></span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {card.value}
                    </span>
                  )}
                </h3>
              </div>
            </div>
            
            {/* Indikator Garis Bawah yang Muncul Saat Hover */}
            <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${card.grad} transition-all duration-500 group-hover:w-full`}></div>
          </div>
        ))}
      </div>

    </div>
  );
}
