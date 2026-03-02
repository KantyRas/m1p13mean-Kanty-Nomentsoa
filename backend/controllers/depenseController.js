const Depense = require('../models/Depense');

exports.createDepense = async (req,res) => {
  try {
    const depense = new Depense(req.body);
    const saveDepense = await depense.save();
    res.status(200).json(saveDepense);
  }  catch (error) {
    res.status(500).json({error:error});
  }
};

exports.deleteDepense = async (req,res) => {
  try {
      const deleteDepense = await Depense.findByIdAndDelete(req.params.id);
      if (!deleteDepense) {
          return res.status(404).json({ message: "erreur de suppression"});
      }
      res.status(200).json(deleteDepense);
  } catch (error) {
      res.status(500).json({error:error});
  }
};

exports.getAllDepense = async (req,res) => {
  try {
    const depenses = await Depense.find();
    res.status(200).json(depenses);
  }  catch(error){
    res.status(500).json({error:error});
  }
};

exports.getDepensesByDate = async (req, res) => {
  try {
    const { dateDebut, dateFin } = req.query;

    const depenses = await Depense.find({
      date: {
        $gte: new Date(dateDebut),
        $lte: new Date(dateFin)
      }
    });

    res.json(depenses);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};