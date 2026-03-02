const mongoose = require('mongoose');

const ProduitSchema = mongoose.Schema({
    nomproduit: {  type:String, required:true },
    boutiqueOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'boutique' },
    categorieproduit: { type:mongoose.Schema.Types.ObjectId, ref: 'categorieproduit' },
    prix: {  type:Number, required:true },
    description: {type:String },
    quantite: { type:Number, required:true },
    seuilquantite: { type:Number },
    statut: { type:Number, default: 0 },
    promotion: { type:Number, default: 0 },
}, { timestamps: true });

const Produit = mongoose.model('produit', ProduitSchema);
module.exports = Produit;