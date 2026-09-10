"use client";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface CrmContact {
  id: string;
  companyName: string;
  address: string;
  email: string;
  officePhone: string;
}

export default function CrmPage() {
  const [contacts, setContacts] = useState<CrmContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    email: "",
    officePhone: "",
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/crm");
      const json = await res.json();
      if (json.success) setContacts(json.data);
    } catch (error) {
      console.error("Gagal load data CRM");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (contact?: CrmContact) => {
    if (contact) {
      setEditId(contact.id);
      setFormData({
        companyName: contact.companyName,
        address: contact.address,
        email: contact.email,
        officePhone: contact.officePhone,
      });
    } else {
      setEditId(null);
      setFormData({ companyName: "", address: "", email: "", officePhone: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const bodyData = editId ? { ...formData, id: editId } : formData;

    try {
      const res = await fetch("/api/crm", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchContacts(); // Refresh tabel
      }
    } catch (error) {
      alert("Gagal menyimpan data CRM!");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus relasi ini?")) return;
    try {
      const res = await fetch(`/api/crm?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) fetchContacts();
    } catch (error) {
      alert("Gagal menghapus data");
    }
  };

  // 📊 Fungsi Export Excel
  const exportToExcel = () => {
    const dataToExport = contacts.map((c, i) => ({
      "No": i + 1,
      "Perusahaan": c.companyName,
      "Alamat": c.address,
      "Email": c.email,
      "No. Kantor": c.officePhone,
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataCRM");
    XLSX.writeFile(workbook, "Data_CRM_RamaDevOps.xlsx");
  };

  // 📄 Fungsi Export PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Laporan Data CRM - Rama DevOps", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [["No", "Perusahaan", "Alamat", "Email", "No. Kantor"]],
      body: contacts.map((c, i) => [i + 1, c.companyName, c.address, c.email, c.officePhone]),
      theme: "grid",
      headStyles: { fillColor: [147, 51, 234] } // Warna Purple untuk CRM
    });
    doc.save("Data_CRM_RamaDevOps.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen CRM</h1>
          <p className="text-sm text-slate-500">Kelola relasi klien, prospek, dan follow-up proyek.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={exportToPDF} className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200">
            📄 PDF
          </button>
          <button onClick={exportToExcel} className="rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-200">
            📊 Excel
          </button>
          <button onClick={() => openModal()} className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 shadow-lg shadow-purple-500/30">
            + Tambah Relasi
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Perusahaan / Klien</th>
                <th className="px-6 py-4 font-semibold">Kontak</th>
                <th className="px-6 py-4 font-semibold">Alamat</th>
                <th className="px-6 py-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr><td colSpan={4} className="py-8 text-center text-slate-500">Memuat data...</td></tr>
              ) : contacts.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-slate-500">Belum ada data relasi CRM.</td></tr>
              ) : (
                contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{c.companyName}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-2 text-blue-600">✉️ {c.email}</span>
                        <span className="flex items-center gap-2 text-slate-500">📞 {c.officePhone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{c.address}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Tombol Follow Up via Email (Otomatis buka Gmail) */}
                        <a 
                          href={`mailto:${c.email}?subject=Follow Up Proyek - Rama DevOps Company&body=Halo Tim ${c.companyName},%0D%0A%0D%0AKami dari Rama DevOps ingin menindaklanjuti rencana kerja sama kita...`} 
                          className="rounded-md bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-200"
                        >
                          🚀 Follow Up
                        </a>
                        <button onClick={() => openModal(c)} className="rounded-md bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-200">Edit</button>
                        <button onClick={() => handleDelete(c.id)} className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-200">Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM TAMBAH/EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="mb-4 text-xl font-bold text-slate-800">{editId ? "Edit Relasi CRM" : "Tambah Relasi Baru"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Nama Perusahaan</label>
                <input type="text" required value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="w-full rounded-lg border p-2.5 focus:border-purple-600 focus:outline-none" placeholder="PT Teknologi Nusantara" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email Utama</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full rounded-lg border p-2.5 focus:border-purple-600 focus:outline-none" placeholder="admin@perusahaan.com" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Nomor Telepon / Kantor</label>
                <input type="text" required value={formData.officePhone} onChange={(e) => setFormData({...formData, officePhone: e.target.value})} className="w-full rounded-lg border p-2.5 focus:border-purple-600 focus:outline-none" placeholder="0812-xxxx-xxxx" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Alamat</label>
                <textarea required rows={2} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full rounded-lg border p-2.5 focus:border-purple-600 focus:outline-none" placeholder="Jl. Raya Utama..."></textarea>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">Batal</button>
                <button type="submit" className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
