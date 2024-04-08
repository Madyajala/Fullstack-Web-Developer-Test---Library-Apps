function hitungTanggalKembali(tanggalPeminjaman) {
  const duaMinggu = 14 * 24 * 60 * 60 * 1000; // Satu minggu = 7 hari = 7 * 24 jam = 7 * 24 * 60 menit = 7 * 24 * 60 * 60 detik = 7 * 24 * 60 * 60 * 1000 milidetik
  const tanggalPeminjamanMs = new Date(tanggalPeminjaman).getTime();
  const tanggalKembaliMs = tanggalPeminjamanMs + duaMinggu;
  const tanggalKembali = new Date(tanggalKembaliMs);
  return tanggalKembali;
}

module.exports = hitungTanggalKembali