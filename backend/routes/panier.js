const express = require('express');
const router = express.Router();
const panierController = require('../controllers/panierController');

router.post('/', panierController.addToCart);
router.get('/getPanier', panierController.getPanier);
router.post('/remove', panierController.removeFromCart);
router.get('/total-produit', panierController.getTotalProduits);

module.exports = router;