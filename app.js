const express = require('express');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Nonaktifkan permintaan favicon
app.get('/favicon.ico', (req, res) => res.status(204));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Menangani submit form
app.post('/pengiriman', (req, res) => {
  const { pengirim, penerima, tanggal, berat, totalHarga } = req.body;

  // Mengubah string tanggal menjadi objek Date
  const parsedDate = new Date(tanggal);

  // Mengubah objek Date menjadi string dengan format "YYYY-MM-DD"
  const formattedDate = formatDate(parsedDate);

  const sql = 'INSERT INTO pengiriman (nama, alamat, kota, provinsi, kodepos, nama_penerima, alamat_penerima, kota_penerima, provinsi_penerima, kodepos_penerima, tanggal, berat, total_harga) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [
    pengirim.nama, pengirim.alamat, pengirim.kota, pengirim.provinsi, pengirim.kodepos,
    penerima.nama, penerima.alamat, penerima.kota, penerima.provinsi, penerima.kodepos,
    formattedDate, berat, totalHarga // Tambahkan berat dan total harga ke dalam query
  ], (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ message: 'Data pengiriman berhasil disimpan!' });
    }
  });
});


// Mendapatkan data pengiriman
app.get('/pengiriman', (req, res) => {
  const sql = 'SELECT * FROM pengiriman';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(result);
    }
  });
});




// Endpoint untuk mencari data berdasarkan nama penerima
app.get('/pengiriman/nama_penerima/:nama', (req, res) => {
  const nama = req.params.nama;

  const keyword = ("%"+nama+"%");
  const sql = 'SELECT * FROM pengiriman WHERE nama_penerima LIKE ?';

  db.query(sql, [keyword], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// app.listen(PORT, () => {console.log(`Server berjalan di http://localhost:${port}`);});

app.listen(PORT, "0.0.0.0", function () {});

// Fungsi untuk mengubah format tanggal ke "YYYY-MM-DD"
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
