"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
  const router = useRouter();
  
  // State untuk Keamanan (Satpam)
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [stats, setStats] = useState({
    client: 0,
    news: 0,
    crm: 0, // Typo diperbaiki (sebelumnya "0,)
    inbox: 0
  });
  const [loading, setLoading] = useState(true);

  // 🛡️ EFEK 1: Pengecekan Keamanan (Satpam)
  useEffect(() => {
    // Cek apakah ada token/sesi login di browser
    // Catatan: Ganti "token" jika Anda menggunakan nama key lain saat proses login sukses
    const token = localStorage.getItem("token") || localStorage.getItem("token_login") || localStorage.getItem("user");

    if (!token) {
      // Jika TIDAK ADA KUNCI -> Tendang paksa ke beranda
      router.replace("/");
    } else {
      // Jika ADA KUNCI -> Izinkan masuk
      setIsAuthorized(true);
    }
  }, [router]);

  // 📊 EFEK 2: Mengambil angka statistik secara real-time
  useEffect(() => {
    // Jangan ambil data dari API kalau belum diizinkan masuk
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
  }, [isAuthorized]); // Akan berjalan setelah satpam memberi izin (isAuthorized = true)

  // 🚧 LAYAR LOADING KEAMANAN 
  // Mencegah tampilan dashboard bocor sepersekian detik sebelum dicek
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center w-full rounded-3xl">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-medium tracking-wide">Memverifikasi akses keamanan...</p>
      </div>
    );
  }

  // ==========================================
  // 👇 KODE TAMPILAN DASHBOARD ANDA 👇
  // ==========================================
  
  // Konfigurasi Kartu dengan Gradien Premium
  const statCards = [
    { 
      title: "Total Client", value: stats.client, icon: "🏢", 
      grad: "from-blue-500 to-cyan-400", shadow: "shadow-cyan-500/40" 
    },
    { 
      title: "Berita Aktif", value: stats.news, icon: "📰", 
      grad: "from-emerald-400 to-teal-500", shadow: "shadow-emerald-500/40" 
    },
    { 
      title: "Data CRM", value: stats.crm, icon: "🤝", 
      grad: "from-purple-500 to-indigo-500", shadow: "shadow-purple-500/40" 
    },
    { 
      title: "Pesan Masuk", value: stats.inbox, icon: "✉️", 
      grad: "from-rose-400 to-pink-500", shadow: "shadow-rose-500/40" 
    },
  ];

  return (
    <div className="space-y-8 relative">
      
      {/* 🚀 BANNER SAMBUTAN (Dark Gradient Edition) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-8 sm:p-12 text-white shadow-2xl border border-slate-800">
        
        {/* Ornamen Cahaya Abstrak di Latar Banner */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-xs font-semibold backdrop-blur-md uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Sistem Online
          </div>
          
          <h1 className="mb-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Selamat Datang di <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 drop-shadow-sm">
              Pusat Kendali.
            </span>
          </h1>
          
          <p className="text-blue-100/70 max-w-2xl text-base sm:text-lg leading-relaxed mt-4">
            Ini adalah ruang komando utama Rama DevOps. Pantau lalu lintas data, kelola daftar klien, terbitkan berita terbaru, dan bangun relasi CRM secara instan.
          </p>
        </div>
      </div>

      {/* 📊 GRID STATISTIK KARTU KACA (Glassmorphism) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <div 
            key={i} 
            className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl p-6 border border-white shadow-xl shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-200/60"
          >
            {/* Ornamen Bercahaya Halus di Pojok Kartu */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${card.grad} opacity-10 blur-2xl rounded-full transition-all duration-500 group-hover:scale-150 group-hover:opacity-20`}></div>
            
            <div className="relative flex items-center z-10">
              {/* Ikon dengan Warna Gradien */}
              <div className={`mr-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${card.grad} text-2xl text-white shadow-lg ${card.shadow} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                {card.icon}
              </div>
              
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  {card.title}
                </p>
                <h3 className="text-3xl font-extrabold text-slate-800">
                  {loading ? (
                    <span className="inline-block h-8 w-16 animate-pulse rounded-lg bg-slate-200"></span>
                  ) : (
                    card.value
                  )}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
