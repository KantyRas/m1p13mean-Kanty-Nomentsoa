const mongoose = require('mongoose');

const CategorieProduitSchema = mongoose.Schema({
    nom: { type: String, required: true },
});

const CategorieProduit = mongoose.model('categorieproduit', CategorieProduitSchema);
module.exports = CategorieProduit;