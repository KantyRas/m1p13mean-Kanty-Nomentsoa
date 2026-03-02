const mongoose = require('mongoose');

const BoutiqueSchema = mongoose.Schema(
    {
        reference: { type: String },
        nomboutique: { type: String, required: true },
        description: { type: String },
        surface: { type: Number, required: true },
        loyer: { type: Number, required: true },
        nombrepiece: { type: Number, required: true },
        localisation: { type: String },
        statut: { type: Number, required: true },
        details: {
            proprietaire: {
                type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null
            },
            categorie: {
                type: String,
                default: null
            },
            date_activation: {
                type: Date,
                default: null
            },
            date_resilliation: {
                type: Date,
                default: null
            },
        },
    }
);

const Boutique = mongoose.model('boutique', BoutiqueSchema);
module.exports = Boutique;