const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Depense = mongoose.Schema(
    {
        editeur:{
            type: [Schema.Types.ObjectId],
            requires: true,
            ref: "User"
        },

        description:{
            type: String,
            required: true
        },

        date:{
            type: Date
        },

        somme:{
            type: Number
        },

        categorie:{
            type: String
        }
    }
);

module.exports = mongoose.model("depense", Depense);