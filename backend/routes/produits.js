const express = require('express');
const router = express.Router();
const produitController = require('../controllers/ProduitController');


// Créer catégorie
router.post('/categories', produitController.createCategorie);
// Lister catégories
router.get('/categories', produitController.getAllCategories);
// Créer produit
router.post('/', produitController.createProduit);
// Lister tous les produits
router.get('/', produitController.getAllProduits);
// Produit par ID
router.get('/:id', produitController.getProduitById);
// Modifier produit
router.put('/:id', produitController.updateProduit);
// Supprimer produit
router.delete('/:id', produitController.deleteProduit);
// Produits par boutique
router.get('/boutique/:boutiqueId', produitController.getProduitsByBoutique);
// Produits par catégorie
router.get('/categorie/:categorieId', produitController.getProduitsByCategorie);
// Produits disponibles
router.get('/statut/:statutId', produitController.getProduitsDisponibles);
// Produits en promotion
router.get('/promotion', produitController.getProduitsEnPromotion);
// Produits stock faible
router.get('/stock-faible', produitController.getProduitsStockFaible);

module.exports = router;