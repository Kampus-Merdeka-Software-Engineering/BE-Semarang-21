const db = require('./db');

const Pengiriman = {
  semuaPengiriman: (callback) => {
    db.query('SELECT * FROM xgrowPengiriman', (err, result) => {
      if (err) {
        console.error('Error saat mengambil semua Pengiriman:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  
  buat: (data, callback) => {
    if (!data ||  !data.kodePengiriman || !data.judul || !data.keterangan || !data.nama || !data.email || !data.pesan || !data.status || !data.tanggalPengiriman) {
      const error = new Error('Data isi diperlukan. Mohon periksa kembali');
      console.error('Error saat membuat Pengiriman:', error);
      callback(error, null);
    } else {        
      db.query('INSERT INTO xgrowPengiriman (kodePengiriman, judul, keterangan, nama, email, pesan, status, tanggalPengiriman ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [data.kodePengiriman, data.judul, data.keterangan, data.nama, data.email, data.pesan, data.status, data.tanggalPengiriman], (err, result) => {
        if (err) {
          console.error('Error saat membuat Pengiriman:', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },

  hapus: (id, callback) => {
    if (!id) {
      const error = new Error('ID Pengiriman diperlukan.');
      console.error('Error saat menghapus Pengiriman:', error);
      callback(error, null);
    } else {
      db.query('DELETE FROM xgrowPengiriman WHERE id = ?', [id], (err, result) => {
        if (err) {
          console.error('Error saat menghapus Pengiriman:', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },
  edit: (id, data, callback) => {
    if (!id || !data || (!data.kodePengiriman && !data.judul && !data.keterangan && !data.nama && !data.email  && !data.pesan  && !data.status  && !data.tanggalPengiriman )) {
      const error = new Error('ID Pengiriman dan data diperlukan.');
      console.error('Error saat mengedit Pengiriman:', error);
      callback(error, null);
    } else {
      db.query('UPDATE xgrowPengiriman SET kodePengiriman = ?, judul = ?, keterangan = ?, nama = ?, email = ?, pesan = ?, status = ?, tanggalPengiriman = ? WHERE id = ?', [data.kodePengiriman, data.judul, data.keterangan, data.nama, data.email, data.pesan, data.status, data.tanggalPengiriman, id], (err, result) => {
        if (err) {
          console.error('Error saat mengedit Pengiriman:', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },

  tampilkanByID: (id, callback) => {
    if (!id) {
      const error = new Error('ID Pengiriman diperlukan.');
      console.error('Error saat menampilkan Pengiriman berdasarkan ID:', error);
      callback(error, null);
    } else {
      db.query('SELECT * FROM xgrowPengiriman WHERE id = ?', [id], (err, result) => {
        if (err) {
          console.error('Error saat menampilkan Pengiriman berdasarkan ID:', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },

  tampilkanPengirimanByKode: (kodePengiriman, callback) => {
    if (!kodePengiriman) {
      const error = new Error('Kode Pengiriman diperlukan.');
      console.error('Error saat menampilkan Pengiriman berdasarkan kodePengiriman:', error);
      callback(error, null);
    } else {
      db.query('SELECT * FROM pengiriman WHERE kodePengiriman = ?', [kodePengiriman], (err, result) => {
        if (err) {
          console.error('Error saat menampilkan Pengiriman berdasarkan kodePengiriman:', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },
};

module.exports = Pengiriman;