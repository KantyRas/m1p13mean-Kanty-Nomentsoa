const Panier = require('../models/Panier');
const Produit = require('../models/Produit');

exports.createPanier = async (req, res) => {
    try {
        const panier = new Panier(req.body);
        const saved = await panier.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getPanier = async (req, res) => {
  try {
    const { proprietaire, guestId } = req.query;

    let panier = null;

    // 🔎 Si user connecté
    if (proprietaire) {
      panier = await Panier.findOne({ proprietaire })
        .populate({
        path: 'details.produit', 
        select: 'nomproduit prix image categorieproduit', 
        populate: {                      
          path: 'categorieproduit',       
          select: 'nomcategorie'          
        }
        });
    }

    // Sinon chercher par guestId
    else if (guestId) {
      panier = await Panier.findOne({ guestId })
        .populate({
        path: 'details.produit',       
        select: 'nomproduit prix image categorieproduit',
        populate: {                       
          path: 'categorieproduit',       
          select: 'nom'       
        }
        });
    }
    // Si pas trouvé → retourner panier vide
    if (!panier) {
      return res.status(200).json({
        details: [],
        totalAmount: 0
      });
    }
    res.status(200).json(panier);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
    try {
        const { userId, guestId, produitId, quantite, prix } = req.body;

        let panier;

        if (userId) {
            panier = await Panier.findOne({ proprietaire: userId });
        }

        else if (guestId) {
            panier = await Panier.findOne({ guestId: guestId });
        }

        // Si panier n'existe pas → créer
        if (!panier) {
            panier = new Panier({
                proprietaire: userId ? userId : null,
                guestId: userId ? null : guestId,
                details: [],
                totalAmount: 0
            });
        }
        // Vérifier si produit déjà présent
        const produitIndex = panier.details.findIndex(
            item => item.produit.toString() === produitId
        );

        if (produitIndex > -1) {
            panier.details[produitIndex].quantite += quantite;
            panier.details[produitIndex].subtotal =
                panier.details[produitIndex].quantite * prix;
        } else {
            panier.details.push({
                produit: produitId,
                quantite: quantite,
                prix: prix,
                subtotal: prix * quantite
            });
        }
        // Recalcul total
        panier.totalAmount = panier.details.reduce(
            (acc, item) => acc + item.subtotal,
            0
        );

        await panier.save();

        res.status(200).json(panier);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId, guestId, produitId } = req.body;

    let panier;

    // Chercher panier selon type d'utilisateur
    if (userId) {
      panier = await Panier.findOne({ proprietaire: userId });
    } else if (guestId) {
      panier = await Panier.findOne({ guestId: guestId });
    }

    if (!panier) {
      return res.status(404).json({ message: "Panier introuvable" });
    }

    //Supprimer le produit
    panier.details = panier.details.filter(
      item => item.produit.toString() !== produitId
    );

    //Si plus aucun produit → supprimer le panier
    if (panier.details.length === 0) {
      await Panier.deleteOne({ _id: panier._id });
      return res.status(200).json({ message: "Panier supprimé car vide" });
    }

    //Recalcul du total
    panier.totalAmount = panier.details.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );

    await panier.save();

    res.status(200).json(panier);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTotalProduits = async (req, res) => {
  try {
    const { userId, guestId } = req.query;

    let panier;

    // Chercher panier
    if (userId) {
      panier = await Panier.findOne({ proprietaire: userId });
    } 
    else if (guestId) {
      panier = await Panier.findOne({ guestId: guestId });
    }

    if (!panier) {
      return res.status(200).json({ totalProduits: 0 });
    }

    //Nombre de produits différents
    const totalProduits = panier.details.length;

    res.status(200).json({ totalProduits });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};