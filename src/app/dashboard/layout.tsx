"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Building2, 
  Newspaper, 
  Handshake, 
  Mail, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // 1. Hapus Kunci dari LocalStorage (Satpam Halaman)
    localStorage.removeItem("token_login");
    localStorage.removeItem("token");
    localStorage.clear(); // Bersihkan semua sisa
    
    // 2. HAPUS KUNCI DARI COOKIE (Satpam Middleware) 👈 INI KUNCI UTAMANYA
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // 3. Tendang kembali ke Home (Hard Redirect)
    window.location.href = "/";
  };

  // Desain: Emoji diganti dengan ikon Lucide React
  const menus = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Data Client", path: "/dashboard/client", icon: <Building2 className="w-5 h-5" /> },
    { name: "Berita & CMS", path: "/dashboard/news", icon: <Newspaper className="w-5 h-5" /> },
    { name: "CRM (Relasi)", path: "/dashboard/crm", icon: <Handshake className="w-5 h-5" /> },
    { name: "Inbox Pesan", path: "/dashboard/inbox", icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* Overlay untuk mobile saat sidebar terbuka (Ditambah efek blur) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigasi (Desain Premium Dark) */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-72 transform border-r border-slate-800 bg-slate-950 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 shadow-2xl ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        
        {/* Logo Area */}
        <div className="flex h-20 items-center gap-3 border-b border-slate-800/60 bg-slate-950/50 px-6 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-extrabold tracking-wide text-white">
            Rama <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">DevOps</span>
          </h1>
        </div>
        
        {/* Menu Navigasi */}
        <nav className="mt-8 flex flex-col gap-2 px-4">
          <p className="px-4 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Menu Utama</p>
          {menus.map((menu) => {
            const isActive = pathname === menu.path;
            return (
              <Link 
                key={menu.name} 
                href={menu.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40 border border-blue-500/30" 
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                <span className={`${isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"} transition-colors`}>
                  {menu.icon}
                </span>
                {menu.name}
              </Link>
            );
          })}
        </nav>

        {/* Tombol Logout */}
        <div className="absolute bottom-0 w-full p-6 border-t border-slate-800/60 bg-slate-950">
          <button 
            onClick={handleLogout}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-sm font-bold text-rose-400 transition-all hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-500/25"
          >
            <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Keluar Sistem
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Header Mobile dengan Hamburger (Desain Glassmorphism Dark) */}
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 shadow-sm lg:hidden sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-base font-bold text-white">Admin Panel</h2>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white focus:outline-none transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        {/* Render Konten Halaman */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
