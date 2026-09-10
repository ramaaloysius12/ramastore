"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
}

export default function NewsCmsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State untuk Form (Bisa untuk Tambah atau Edit)
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");
      const json = await res.json();
      if (json.success) setNews(json.data);
    } catch (error) {
      console.error("Gagal load berita");
    } finally {
      setLoading(false);
    }
  };

  // FUNGSI UPLOAD FOTO (Convert ke Base64)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Cek ukuran maksimal 2MB agar database tidak berat
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran gambar terlalu besar! Maksimal 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = (item?: NewsItem) => {
    if (item) {
      setEditId(item.id);
      setFormData({ title: item.title, content: item.content, imageUrl: item.imageUrl || "" });
    } else {
      setEditId(null);
      setFormData({ title: "", content: "", imageUrl: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const bodyData = editId ? { ...formData, id: editId } : formData;

    try {
      const res = await fetch("/api/news", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
      const json = await res.json();
      
      if (json.success) {
        setIsModalOpen(false);
        fetchNews(); // Refresh data
      }
    } catch (error) {
      alert("Gagal menyimpan berita!");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus berita ini?")) return;
    try {
      const res = await fetch(`/api/news?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) fetchNews();
    } catch (error) {
      alert("Gagal menghapus berita");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Berita & Publikasi (CMS)</h1>
          <p className="text-sm text-slate-500">Kelola artikel dan berita yang akan tampil di halaman utama.</p>
        </div>
        <button 
          onClick={() => openModal()} 
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700"
        >
          + Tulis Berita
        </button>
      </div>

      {/* Grid Tampilan Berita */}
      {loading ? (
        <div className="text-center py-10 text-slate-500">Memuat berita...</div>
      ) : news.length === 0 ? (
        <div className="text-center py-10 text-slate-500 bg-white rounded-xl border">Belum ada berita yang diterbitkan.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <div key={item.id} className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
              {item.imageUrl ? (
                <div className="relative h-48 w-full bg-slate-100">
                  <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-slate-100 text-slate-400">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 text-lg font-bold text-slate-800 line-clamp-2">{item.title}</h3>
                <p className="mb-4 flex-1 text-sm text-slate-500 line-clamp-3">{item.content}</p>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-xs text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString('id-ID')}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => openModal(item)} className="rounded px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50">Hapus</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="mb-4 text-xl font-bold text-slate-800">
              {editId ? "Edit Berita" : "Tulis Berita Baru"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Judul Berita</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full rounded-lg border p-2.5 focus:border-blue-600 focus:outline-none" placeholder="Masukkan judul..." />
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Upload Foto (Opsional, Max 2MB)</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full rounded-lg border p-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100" />
                {formData.imageUrl && (
                  <div className="mt-2 h-32 w-full overflow-hidden rounded-lg bg-slate-100">
                    <img src={formData.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Isi Berita</label>
                <textarea required rows={5} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full rounded-lg border p-2.5 focus:border-blue-600 focus:outline-none" placeholder="Tulis isi berita di sini..."></textarea>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">Batal</button>
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Publikasikan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
