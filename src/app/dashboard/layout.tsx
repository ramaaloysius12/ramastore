"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Nanti kita buat logika hapus cookie di sini
    router.push("/login");
  };

  const menus = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Data Client", path: "/dashboard/client", icon: "🏢" },
    { name: "Berita & CMS", path: "/dashboard/news", icon: "📰" },
    { name: "CRM (Relasi)", path: "/dashboard/crm", icon: "🤝" },
    { name: "Inbox Pesan", path: "/dashboard/inbox", icon: "✉️" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Overlay untuk mobile saat sidebar terbuka */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigasi */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex h-16 items-center justify-center border-b border-slate-700 bg-slate-950 px-4 shadow-sm">
          <h1 className="text-xl font-bold tracking-wider text-blue-400">RAMA DEVOPS</h1>
        </div>
        
        <nav className="mt-6 flex flex-col gap-2 px-4">
          {menus.map((menu) => {
            const isActive = pathname === menu.path;
            return (
              <Link 
                key={menu.name} 
                href={menu.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive ? "bg-blue-600 text-white shadow-md" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>{menu.icon}</span>
                {menu.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Mobile dengan Hamburger */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm lg:hidden">
          <h2 className="text-lg font-bold text-slate-800">Admin Panel</h2>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
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
