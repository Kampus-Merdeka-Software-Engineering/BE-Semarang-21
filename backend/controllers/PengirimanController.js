const Pengiriman = require('../models/pengiriman');

const PengirimanController = {

  tampilkanSemuaPengiriman: (req, res) => {
    Pengiriman.semuaPengiriman((err, hasil) => {
      if (err) {
        console.error('Error saat mengambil Pengiriman:', err);
        res.status(500).json({ error: 'Kesalahan Internal Server' });
        return;
      }
      res.status(200).json(hasil);
    });
  },
  
  buatPengiriman: (req, res) => {
    const { nama, alamat, kota, provinsi, kodepos, namapenerima, alamatpenerima, kotapenerima, provinsipenerima, kodepospenerima, tanggal, berat } = req.body;
  
    if (!nama || !alamat || !kota || !provinsi || !kodepos || !namapenerima || !alamatpenerima || !kotapenerima || !provinsipenerima || !kodepospenerima || !tanggal || !berat) {
      res.status(400).json({ error: 'Form isi diperlukan' });
      return;
    }
  
    const pengirimanBaru = { nama, alamat, kota, provinsi, kodepos, namapenerima, alamatpenerima, kotapenerima, provinsipenerima, kodepospenerima, tanggal, berat };
  
    Pengiriman.buat(pengirimanBaru, (err, hasil) => {
      if (err) {
        console.error('Error saat membuat pengiriman:', err);
        res.status(500).json({ error: 'Kesalahan Internal Server' });
        return;
      }
      res.status(201).json({ pesan: 'Pengiriman berhasil dibuat', pengiriman: hasil });
    });
  },
  
  editPengiriman: (req, res) => {
    const idPengiriman = req.params.id;
    const { nama, alamat, kota, provinsi, kodepos, namapenerima, alamatpenerima, kotapenerima, provinsipenerima, kodepospenerima, tanggal, berat } = req.body;

    if (!nama || !alamat || !kota || !provinsi || !kodepos || !namapenerima || !alamatpenerima || !kotapenerima || !provinsipenerima || !kodepospenerima || !tanggal || !berat) {
      res.status(400).json({ error: 'Form isi diperlukan' });
      return;
    }

    const pengirimanDiedit = { nama, alamat, kota, provinsi, kodepos, namapenerima, alamatpenerima, kotapenerima, provinsipenerima, kodepospenerima, tanggal, berat };

    Pengiriman.edit(idPengiriman, pengirimanDiedit, (err, hasil) => {
      if (err) {
        console.error('Error saat mengedit pengiriman:', err);
        res.status(500).json({ error: 'Kesalahan Internal Server' });
        return;
      }
      res.status(200).json({ pesan: 'Pengiriman berhasil diperbarui', pengiriman: hasil });
    });
  },

  hapusPengiriman: (req, res) => {
    const idPengiriman = req.params.id;

    Pengiriman.hapus(idPengiriman, (err) => {
      if (err) {
        console.error('Error saat menghapus pengiriman:', err);
        res.status(500).json({ error: 'Kesalahan Internal Server' });
        return;
      }
      res.status(200).json({ pesan: 'pengiriman berhasil dihapus' });
    });
  },

  tampilkanPengirimanByID: (req, res) => {
    const idPengiriman = req.params.id;

    Pengiriman.tampilkanByID(idPengiriman, (err, hasil) => {
      if (err) {
        console.error('Error saat mengambil data pengiriman:', err);
        res.status(500).json({ error: 'Kesalahan Internal Server' });
        return;
      }

      if (hasil) {
        res.status(200).json(hasil);
      } else {
        res.status(404).json({ error: 'Pengiriman tidak ditemukan' });
      }
    });
  },

};


module.exports = PengirimanController;