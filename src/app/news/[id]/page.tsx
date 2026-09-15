"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock, Share2, Image as ImageIcon, AlertCircle } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
}

export default function PublicNewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchNewsDetail = async () => {
      try {
        // Mengambil data berita dari API yang sama dengan CMS
        const res = await fetch("/api/news");
        const json = await res.json();
        
        if (json.success) {
          // Mencari berita spesifik berdasarkan ID dari URL
          const foundNews = json.data.find((item: NewsItem) => item.id === id);
          setNews(foundNews || null);
        }
      } catch (error) {
        console.error("Gagal memuat detail berita");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  // 1. TAMPILAN LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Memuat artikel...</p>
      </div>
    );
  }

  // 2. TAMPILAN JIKA BERITA TIDAK DITEMUKAN / DIHAPUS
  if (!news) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-16 h-16 text-slate-300 mb-4" />
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Berita Tidak Ditemukan</h1>
        <p className="text-slate-500 mb-6 text-center max-w-md">Artikel yang Anda cari mungkin telah dihapus atau URL tidak valid.</p>
        <button 
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  // 3. TAMPILAN ARTIKEL ASLI
  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* NAVBAR SIMPLE UNTUK HALAMAN BACA */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button 
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors bg-slate-100 hover:bg-blue-50 px-4 py-2 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </button>
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* HEADER ARTIKEL */}
        <header className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
            Publikasi Rama Dev
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {news.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-sm text-slate-500 font-medium border-y border-slate-200 py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 overflow-hidden flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="text-slate-700 font-bold">Admin Rama</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(news.createdAt).toLocaleDateString('id-ID', { 
                  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>5 Menit Baca</span>
            </div>
          </div>
        </header>

        {/* GAMBAR COVER JIKA ADA */}
        {news.imageUrl && (
          <div className="mb-10 w-full overflow-hidden rounded-3xl shadow-lg border border-slate-100 bg-white">
            <img 
              src={news.imageUrl} 
              alt={news.title} 
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* ISI ARTIKEL */}
        <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200">
          {/* Gunakan whitespace-pre-wrap agar enter/paragraf dari textarea CMS terbaca dengan benar */}
          <div className="whitespace-pre-wrap">
            {news.content}
          </div>
        </div>

      </article>
    </main>
  );
}
