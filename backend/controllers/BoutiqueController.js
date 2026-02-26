const Boutique = require('../models/Boutique');

//GET liste boutique
exports.getAllBoutique = async (req,res) => {
  try {
    const boutiques = await Boutique.find().populate('details.proprietaire', 'name username');
    res.status(200).json(boutiques);
  }  catch(error){
    res.status(500).json({error:error});
  }
};

// POST create boutique
exports.createBoutique = async (req,res) => {
  try {
    const boutique = new Boutique(req.body);
    const savedBoutique = await boutique.save();
    res.status(200).json(savedBoutique);
  }  catch (error) {
    res.status(500).json({error:error});
  }
};

// PUT update boutique
exports.updateBoutique = async (req,res) => {
  try {
      const updatedBoutique = await Boutique.findByIdAndUpdate(
      req.params.id,
          { $set: req.body },
          { new: true });
      if (!updatedBoutique) {
          return res.status(404).json({ message: "Boutique introuvable" });
      }
      res.status(200).json(updatedBoutique);
  }  catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
};

// DELETE delete boutique
exports.deleteBoutique = async (req,res) => {
  try {
      const deletedBoutique = await Boutique.findByIdAndDelete(req.params.id);
      if (!deletedBoutique) {
          return res.status(404).json({ message: "Boutique introuvable" });
      }
      res.status(200).json(deletedBoutique);
  }  catch (error) {
      res.status(500).json({error:error});
  }
};

// GET boutiques par statut
exports.getBoutiquesByStatut = async (req, res) => {
    try {
        const { statut } = req.params; // exemple: 0 = libre, 1 = occupée
        const boutiques = await Boutique.find({ statut: Number(statut) }).populate('details.proprietaire', 'name username');
        res.status(200).json(boutiques);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// GET boutiques par propriétaire
exports.getBoutiquesByOwner = async (req, res) => {
    try {
        const { ownerId } = req.params;
        const boutiques = await Boutique.find({ 'details.proprietaire': ownerId }).populate('details.proprietaire', 'name username');
        res.status(200).json(boutiques);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// PUT update détails boutique
exports.updateDetails = async (req, res) => {
    try {
        const updatedBoutique = await Boutique.findByIdAndUpdate(
            req.params.id,
            { $set: {
                    details: req.body.details,
                    statut: 1 }
                },
            { new: true }
        );
        if (!updatedBoutique) {
            return res.status(404).json({ message: "Boutique introuvable" });
        }
        res.status(200).json(updatedBoutique);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// GET boutiques actives par proprietaire.
exports.getActiveBoutiquesWithOwner = async (req, res) => {
    try {
        const boutiques = await Boutique.find({ 'details.proprietaire': { $ne: null } })
            .populate('details.proprietaire', 'name username');
        res.status(200).json(boutiques);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Statistiques
exports.getBoutiquesStats = async (req, res) => {
    try {
        const total = await Boutique.countDocuments();
        const libres = await Boutique.countDocuments({ statut: 0 });
        const occupees = await Boutique.countDocuments({ statut: 1 });
        res.status(200).json({ total, libres, occupees });
    } catch (error) {
        res.status(500).json({ error });
    }
};