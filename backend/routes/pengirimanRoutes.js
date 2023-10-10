const express = require('express');
const PengirimanController = require('../controllers/PengirimanController');


const router = express.Router();

router.get('/pengiriman', PengirimanController.tampilkanSemuaPengiriman);
router.post('/pengiriman', PengirimanController.buatPengiriman);
router.put('/pengiriman/:id', PengirimanController.editPengiriman);
router.delete('/pengiriman/:id', PengirimanController.hapusPengiriman);
router.get('/pengiriman/:id', PengirimanController.tampilkanPengirimanByID);

module.exports = router;
