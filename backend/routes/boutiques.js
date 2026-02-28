const express = require('express');
const router = express.Router();
const boutiquecontroller = require('../controllers/BoutiqueController');

router.get('/',boutiquecontroller.getAllBoutique);
router.get('/:id', boutiquecontroller.getBoutiqueById);
router.post('/', boutiquecontroller.createBoutique);
router.put('/:id',boutiquecontroller.updateBoutique);
router.delete('/:id',boutiquecontroller.deleteBoutique);

router.get('/statut/:statut', boutiquecontroller.getBoutiquesByStatut);
router.get('/owner/:ownerId', boutiquecontroller.getBoutiquesByOwner);
router.put('/details/:id', boutiquecontroller.updateDetails);
router.get('/active-owner', boutiquecontroller.getActiveBoutiquesWithOwner);
router.get('/stats', boutiquecontroller.getBoutiquesStats);

module.exports = router;