const express = require('express');
const router = express.Router();
const panierController = require('../controllers/panierController');

router.post('/', panierController.createPanier);
router.delete('/deleteDetail', panierController.supprimerDetail);

module.exports = router;