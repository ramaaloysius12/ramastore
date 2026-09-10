"use client";
import { useState, useEffect } from "react";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
}

export default function NewsSlider() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const json = await res.json();
        if (json.success) {
          setNews(json.data);
        } else {
          setErrorMsg(json.error || "Gagal memuat dari server");
        }
      } catch (error) {
        setErrorMsg("Koneksi ke API berita gagal");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // 👇 Bagian Debugging (Agar terlihat jika kosong atau error)
  if (loading) {
    return <div className="py-10 text-center text-sm text-slate-400">🔄 Memuat Slider Berita...</div>;
  }

  if (errorMsg) {
    return <div className="py-10 text-center text-sm text-red-500">❌ Error Berita: {errorMsg}</div>;
  }

  if (news.length === 0) {
    return <div className="py-10 text-center text-sm text-amber-600">⚠️ Slider Berita Kosong (Belum ada berita yang diposting di Admin Dashboard).</div>;
  }

  return (
    <section className="py-20 bg-slate-50" id="berita">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Berita & Pembaruan</h2>
          <p className="mt-4 text-slate-600">Informasi terbaru seputar layanan, teknologi, dan aktivitas perusahaan kami.</p>
        </div>

        {/* AREA SLIDER */}
        <div className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {news.map((item) => (
            <div 
              key={item.id} 
              className="flex w-[85vw] min-w-[280px] max-w-[400px] flex-none snap-center flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg transition-transform hover:-translate-y-1 sm:w-[350px]"
            >
              {item.imageUrl ? (
                <div className="h-52 w-full bg-slate-100">
                  <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="flex h-52 w-full items-center justify-center bg-slate-100 text-4xl">📰</div>
              )}
              
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-2 text-xs font-semibold text-blue-600">
                  {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <h3 className="mb-3 text-xl font-bold text-slate-800 line-clamp-2">{item.title}</h3>
                <p className="mb-6 flex-1 text-sm text-slate-600 line-clamp-3">{item.content}</p>
                
                <button 
                  onClick={() => setSelectedNews(item)}
                  className="flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-800"
                >
                  Lihat Selengkapnya <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POP-UP MODAL */}
      {selectedNews && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 pt-10 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedNews(null)}
        >
          <div 
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedNews(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70"
            >
              ✕
            </button>
            {selectedNews.imageUrl && (
              <img src={selectedNews.imageUrl} alt={selectedNews.title} className="h-64 w-full object-cover shrink-0" />
            )}
            <div className="overflow-y-auto p-6 md:p-10">
              <span className="mb-2 block text-sm font-semibold text-blue-600">
                Diterbitkan pada {new Date(selectedNews.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">{selectedNews.title}</h2>
              <div className="whitespace-pre-wrap text-base leading-relaxed text-slate-700">
                {selectedNews.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
