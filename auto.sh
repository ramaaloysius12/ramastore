#!/bin/bash

echo "🚀 Memulai sinkronisasi ke GitHub..."

# 1. Inisialisasi git jika folder .git belum ada
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git repository diinisialisasi."
fi

# 2. Cek apakah remote origin sudah ada, jika belum tambahkan
if ! git remote -v | grep -q "origin"; then
    git remote add origin https://github.com/ramaaloysius12/ramastore.git
    echo "✅ Remote origin (ramastore) berhasil ditambahkan."
fi

# 3. Menambahkan semua file yang berubah
echo "📦 Menambahkan perubahan file..."
git add .

# 4. Meminta pesan commit
echo "📝 Masukkan pesan commit (tekan Enter untuk 'Auto Update'):"
read commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="Auto update: $(date +'%Y-%m-%d %H:%M:%S')"
fi

# 5. Eksekusi Commit
git commit -m "$commit_msg"

# 6. Pastikan berada di branch 'main'
git branch -M main

# 7. Push ke GitHub
echo "⏳ Mengunggah ke GitHub..."
git push -u origin main

echo "🎉 Selesai! Kode Anda sudah terbang ke GitHub!"
