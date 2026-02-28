const Produit = require('../models/Produit');
const CategorieProduit = require('../models/CategorieProduit');

exports.createCategorie = async (req, res) => {
    try {
        const categorie = new CategorieProduit(req.body);
        const saved = await categorie.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await CategorieProduit.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.createProduit = async (req, res) => {
    try {
        const produit = new Produit(req.body);
        const savedProduit = await produit.save();
        res.status(201).json(savedProduit);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getAllProduits = async (req, res) => {
    try {
        const produits = await Produit.find()
            .populate('boutiqueOwner', 'nomboutique')
            .populate('categorieproduit', 'nom');

        res.status(200).json(produits);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getProduitById = async (req, res) => {
    try {
        const produit = await Produit.findById(req.params.id)
            .populate('boutiqueOwner', 'nomboutique')
            .populate('categorieproduit', 'nom');

        if (!produit) {
            return res.status(404).json({ message: "Produit introuvable" });
        }

        res.status(200).json(produit);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.updateProduit = async (req, res) => {
    try {
        const updatedProduit = await Produit.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedProduit) {
            return res.status(404).json({ message: "Produit introuvable" });
        }

        res.status(200).json(updatedProduit);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.deleteProduit = async (req, res) => {
    try {
        const deletedProduit = await Produit.findByIdAndDelete(req.params.id);

        if (!deletedProduit) {
            return res.status(404).json({ message: "Produit introuvable" });
        }

        res.status(200).json(deletedProduit);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getProduitsByBoutique = async (req, res) => {
    try {
        const { boutiqueId } = req.params;

        const produits = await Produit.find({ boutiqueOwner: boutiqueId })
            .populate('categorieproduit', 'nom');

        res.status(200).json(produits);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getProduitsByCategorie = async (req, res) => {
    try {
        const { categorieId } = req.params;

        const produits = await Produit.find({ categorieproduit: categorieId })
            .populate('boutiqueOwner', 'nomboutique');

        res.status(200).json(produits);
    } catch (error) {
        res.status(500).json({ error });
    }
};

//Statut : Publié sa cachena
exports.getProduitsDisponibles = async (req, res) => {
    try {
        const produits = await Produit.find({ statut: 0 });
        res.status(200).json(produits);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getProduitsEnPromotion = async (req, res) => {
    try {
        const produits = await Produit.find({ promotion: { $gt: 0 } });
        res.status(200).json(produits);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getProduitsStockFaible = async (req, res) => {
    try {
        const produits = await Produit.find({
            $expr: { $lte: ["$quantite", "$seuilquantite"] }
        });

        res.status(200).json(produits);
    } catch (error) {
        res.status(500).json({ error });
    }
};