import Link from "next/link";

// 1. Tambahkan 'async' dan ubah tipe params menjadi 'Promise'
export default async function PublicNewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 2. Tambahkan 'await' untuk membuka isi dari params
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200">
        
        {/* Tombol Kembali ke Beranda */}
        <Link 
          href="/#berita"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors bg-slate-50 hover:bg-blue-50 px-4 py-2 rounded-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Beranda
        </Link>

        {/* Header Artikel */}
        <header className="mb-10 border-b border-slate-100 pb-8">
          <div className="flex gap-3 items-center mb-4">
            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs font-bold rounded-full uppercase tracking-wider">
              Berita Utama
            </span>
            <span className="text-sm text-slate-400 font-medium">ID Artikel: {id}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Memuat Judul Berita...
          </h1>
          
          <div className="flex items-center gap-4 mt-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-lg font-bold shadow-md">
              R
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Admin Rama</p>
              <p className="text-xs text-slate-500">Tim Rama DevOps</p>
            </div>
          </div>
        </header>

        {/* Isi Konten Artikel */}
        <article className="text-slate-700 text-lg leading-relaxed space-y-6">
          <p>
            Saat ini Anda sedang melihat halaman cetakan dinamis untuk artikel dengan ID: <strong className="text-blue-600">{id}</strong>.
          </p>
          <p>
            Pada tahap selanjutnya, kita akan menyambungkan halaman ini ke Database Prisma (seperti yang kita lakukan di NewsSlider) agar Judul, Gambar, dan Isi Teksnya berubah otomatis menyesuaikan berita mana yang Anda klik di halaman depan!
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl my-8 text-blue-900 font-medium italic">
            "Sistem routing dinamis Next.js membuat portal berita Anda bekerja secepat kilat tanpa perlu memuat ulang seluruh aset website."
          </div>
        </article>

      </div>
    </div>
  );
}
