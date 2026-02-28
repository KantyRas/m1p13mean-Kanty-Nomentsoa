const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Panier = mongoose.Schema(
    {
        proprietaire:{
            type: [Schema.Types.ObjectId],
            ref: "User"
        },
        details: [
            {
                produit: {
                    type: mongoose.Schema.Types.ObjectId, ref: 'produit', default: null
                },
                prix: Number,
                quantite: Number,
                subtotal: Number
            }
        ],
        totalAmount: Number
    },
);

module.exports = mongoose.model("Panier", Panier);