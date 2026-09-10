"use client";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Tipe data untuk TypeScript
interface Client {
  id: string;
  companyName: string;
  address: string;
  order: string;
  price: number;
}

export default function ClientDataPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    order: "",
    price: "",
  });

  // Fetch Data saat halaman dimuat
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/client");
      const json = await res.json();
      if (json.success) setClients(json.data);
    } catch (error) {
      console.error("Gagal load data");
    } finally {
      setLoading(false);
    }
  };

  // Simpan Data Baru
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setClients([json.data, ...clients]); // Update tabel instan
        setIsModalOpen(false); // Tutup modal
        setFormData({ companyName: "", address: "", order: "", price: "" }); // Reset form
      }
    } catch (error) {
      alert("Gagal menyimpan data!");
    }
  };

  // 🖨️ Fungsi Print biasa
  const handlePrint = () => {
    window.print();
  };

  // 📊 Fungsi Export Excel
  const exportToExcel = () => {
    const dataToExport = clients.map((c, index) => ({
      "No": index + 1,
      "Nama Perusahaan": c.companyName,
      "Alamat": c.address,
      "Order / Layanan": c.order,
      "Harga (Rp)": c.price,
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataClient");
    XLSX.writeFile(workbook, "Data_Client_RamaDevOps.xlsx");
  };

  // 📄 Fungsi Export PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Laporan Data Client - Rama DevOps", 14, 15);
    
    autoTable(doc, {
      startY: 20,
      head: [["No", "Perusahaan", "Alamat", "Layanan", "Harga"]],
      body: clients.map((c, i) => [
        i + 1,
        c.companyName,
        c.address,
        c.order,
        `Rp ${c.price.toLocaleString("id-ID")}`
      ]),
      theme: "grid",
      headStyles: { fillColor: [37, 99, 235] } // Warna biru Tailwind
    });

    doc.save("Data_Client_RamaDevOps.pdf");
  };

  return (
    <div className="space-y-6">
      {/* Header & Tombol Aksi (Tidak ikut terprint) */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Data Client</h1>
          <p className="text-sm text-slate-500">Kelola daftar klien, order, dan harga layanan.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={handlePrint} className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300">
            🖨️ Print
          </button>
          <button onClick={exportToPDF} className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200">
            📄 PDF
          </button>
          <button onClick={exportToExcel} className="rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-200">
            📊 Excel
          </button>
          <button onClick={() => setIsModalOpen(true)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30">
            + Tambah Klien
          </button>
        </div>
      </div>

      {/* Tabel Data (Responsif) */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Nama Perusahaan</th>
                <th className="px-6 py-4 font-semibold">Alamat</th>
                <th className="px-6 py-4 font-semibold">Order Layanan</th>
                <th className="px-6 py-4 font-semibold">Harga</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500">Memuat data...</td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500">Belum ada data klien.</td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">{client.companyName}</td>
                    <td className="px-6 py-4">{client.address}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 border border-blue-200">
                        {client.order}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-green-600">
                      Rp {client.price.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Data */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="mb-4 text-xl font-bold text-slate-800">Tambah Data Client</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Nama Perusahaan / Klien</label>
                <input type="text" required value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="w-full rounded-lg border p-2.5 focus:border-blue-600 focus:outline-none" placeholder="PT Contoh Sukses" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Alamat Lengkap</label>
                <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full rounded-lg border p-2.5 focus:border-blue-600 focus:outline-none" placeholder="Jl. Sudirman No. 1..." />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Order / Jasa</label>
                <input type="text" required value={formData.order} onChange={(e) => setFormData({...formData, order: e.target.value})} className="w-full rounded-lg border p-2.5 focus:border-blue-600 focus:outline-none" placeholder="Web Development / Cloud Setup" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Harga (Rp)</label>
                <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full rounded-lg border p-2.5 focus:border-blue-600 focus:outline-none" placeholder="5000000" />
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">Batal</button>
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
