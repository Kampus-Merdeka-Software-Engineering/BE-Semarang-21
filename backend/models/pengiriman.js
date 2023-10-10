const db = require('./db');

const Pengiriman = {
  semuaPengiriman: (callback) => {
    db.query('SELECT * FROM pengiriman', (err, result) => {
      if (err) {
        console.error('Error saat mengambil semua pengiriman:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
// 
  buat: (data, callback) => { 
    if (!data || !data.nama || !data.alamat || !data.kota || !data.provinsi || !data.kodepos || !data.namapenerima || !data.alamatpenerima || !data.kotapenerima || !data.provinsipenerima || !data.kodepospenerima || !data.tanggal || !data.berat) {
      const error = new Error('Data isi diperlukan. Mohon periksa kembali');
      console.error('Error saat membuat pengiriman:', error);
      callback(error, null);
    } else {
      db.query('INSERT INTO pengiriman (nama, alamat, kota, provinsi, kodepos, namapenerima, alamatpenerima, kotapenerima, provinsipenerima, kodepospenerima, tanggal, berat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.nama, data.alamat, data.kota, data.provinsi, data.kodepos, data.namapenerima, data.alamatpenerima, data.kotapenerima, data.provinsipenerima, data.kodepospenerima, data.tanggal, data.berat], (err, result) => {
        if (err) {
          console.error('Error saat membuat pengiriman:', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },

  hapus: (id, callback) => {
    if (!id) {
      const error = new Error('ID pengiriman diperlukan.');
      console.error('Error saat menghapus pengiriman:', error);
      callback(error, null);
    } else {
      db.query('DELETE FROM pengiriman WHERE id = ?', [id], (err, result) => {
        if (err) {
          console.error('Error saat menghapus pengiriman:', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },

  edit: (id, data, callback) => {
    if (!id || !data || (!data.nama && !data.alamat && !data.kota && !data.provinsi && !data.kodepos && !data.namapenerima && !data.alamatpenerima && !data.kotapenerima && !data.provinsipenerima && !data.kodepospenerima && !data.tanggal && !data.berat )) {
      const error = new Error('ID pengiriman dan data diperlukan.');
      console.error('Error saat mengedit pengiriman:', error);
      callback(error, null);
    } else {
      db.query('UPDATE pengiriman SET nama = ?, alamat = ?, kota = ?, provinsi = ?, kodepos = ?, namapenerima = ?, alamatpenerima = ?, kotapenerima = ?, provinsipenerima = ?, kodepospenerima = ?, tanggal = ?, berat = ? WHERE id = ?', [data.nama, data.alamat, data.kota, data.provinsi, data.kodepos, data.namapenerima, data.alamatpenerima, data.kotapenerima, data.provinsipenerima, data.kodepospenerima, data.tanggal, data.berat, id], (err, result) => {
        if (err) {
          console.error('Error saat mengedit pengiriman:', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },

  tampilkanByID: (id, callback) => {
    if (!id) {
      const error = new Error('ID pengiriman diperlukan.');
      console.error('Error saat menampilkan pengiriman berdasarkan ID:', error);
      callback(error, null);
    } else {
      db.query('SELECT * FROM pengiriman WHERE id = ?', [id], (err, result) => {
        if (err) {
          console.error('Error saat menampilkan pengiriman berdasarkan ID:', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },

};


module.exports = Pengiriman;
