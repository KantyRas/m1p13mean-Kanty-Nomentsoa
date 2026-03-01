const Panier = require('../models/Panier');

exports.createPanier = async (req, res) => {
    try {
        const panier = new Panier(req.body);
        const saved = await panier.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.supprimerDetail = async (req, res) => {
  const { panierId, produitId } = req.body;

  try {
    // 1️⃣ Supprimer le produit du tableau details
    const panier = await Panier.findByIdAndUpdate(
      panierId,
      { $pull: { details: { produit: produitId } } },
      { new: true }
    );

    // Vérifier si panier existe
    if (!panier) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }

    // 2️⃣ Si le panier est vide → suppression complète
    if (panier.details.length === 0) {
      await Panier.findByIdAndDelete(panier._id);
      return res.json({ message: "Panier supprimé car vide" });
    }

    // 3️⃣ Sinon recalcul du total
    panier.totalAmount = panier.details.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );

    await panier.save();

    res.json(panier);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};