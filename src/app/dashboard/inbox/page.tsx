"use client";
import { useState, useEffect } from "react";

interface ContactLead {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  createdAt: string;
}

export default function InboxPage() {
  const [messages, setMessages] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<ContactLead | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      const json = await res.json();
      if (json.success) setMessages(json.data);
    } catch (error) {
      console.error("Gagal memuat pesan");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setSelectedMsg(null); // Tutup modal jika yang dihapus sedang dibuka
        fetchMessages(); // Refresh daftar
      }
    } catch (error) {
      alert("Gagal menghapus pesan");
    }
  };

  // Format Badge Layanan
  const getServiceBadge = (service: string) => {
    switch (service) {
      case "web-dev": return <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Web Development</span>;
      case "devops": return <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">DevOps & Cloud</span>;
      case "security": return <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">Security & OSINT</span>;
      default: return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{service}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Inbox Pesan Utama</h1>
          <p className="text-sm text-slate-500">Pesan dari calon klien via Landing Page akan masuk ke sini.</p>
        </div>
        <div className="rounded-lg bg-pink-100 px-4 py-2 text-sm font-bold text-pink-600 border border-pink-200">
          Total: {messages.length} Pesan
        </div>
      </div>

      {/* LIST PESAN (Grid Style) */}
      {loading ? (
        <div className="py-20 text-center animate-pulse text-slate-400">Memuat Inbox...</div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-20 text-slate-500">
          <span className="text-4xl mb-4">📭</span>
          <p>Inbox Anda masih kosong.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              onClick={() => setSelectedMsg(msg)}
              className="group cursor-pointer rounded-2xl bg-white p-6 shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:shadow-pink-100 hover:-translate-y-1 hover:border-pink-200 relative overflow-hidden"
            >
              {/* Ornamen Glassmorphism */}
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-400 opacity-10 blur-xl rounded-full group-hover:opacity-30 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-white font-bold shadow-md">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 line-clamp-1">{msg.name}</h3>
                    <p className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4 relative z-10">
                {getServiceBadge(msg.service)}
              </div>
              
              <p className="text-sm text-slate-600 line-clamp-2 relative z-10 italic">
                "{msg.message}"
              </p>
            </div>
          ))}
        </div>
      )}

      {/* POP-UP BACA PESAN & BALAS VIA GMAIL */}
      {selectedMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm" onClick={() => setSelectedMsg(null)}>
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-950 p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">Detail Pesan</h2>
              <button onClick={() => setSelectedMsg(null)} className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition">✕</button>
            </div>

            {/* Isi Pesan */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pengirim</p>
                  <p className="font-semibold text-slate-800">{selectedMsg.name}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                  <p className="font-semibold text-blue-600">{selectedMsg.email}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Layanan Diminta</p>
                  {getServiceBadge(selectedMsg.service)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tanggal</p>
                  <p className="font-semibold text-slate-800">{new Date(selectedMsg.createdAt).toLocaleString('id-ID')}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Isi Pesan</p>
                <div className="rounded-2xl bg-slate-50 p-5 text-slate-700 border border-slate-100 leading-relaxed whitespace-pre-wrap">
                  {selectedMsg.message}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                <button 
                  onClick={() => handleDelete(selectedMsg.id)} 
                  className="w-full sm:w-auto rounded-xl bg-red-50 px-6 py-3 font-semibold text-red-600 hover:bg-red-100 transition"
                >
                  Hapus Pesan
                </button>
                
                {/* 🚀 TOMBOL AJAIB GMAIL */}
                <a 
                  href={`mailto:${selectedMsg.email}?subject=Balasan dari Rama DevOps Company - Request: ${selectedMsg.service}&body=Halo ${selectedMsg.name},%0D%0A%0D%0ATerima kasih telah menghubungi Rama DevOps.%0D%0A%0D%0AKami telah menerima pesan Anda terkait layanan konsultasi.%0D%0A%0D%0A(Tulis balasan Anda di sini...)%0D%0A%0D%0ASalam Hangat,%0D%0ATim Rama DevOps`}
                  className="w-full flex-1 text-center rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 font-bold text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:-translate-y-0.5 transition-all"
                >
                  ✉️ Balas via Gmail Sekarang
                </a>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
