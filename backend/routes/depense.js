const express = require('express');
const router = express.Router();
const depenseController = require('../controllers/depenseController');

router.post("/newDepense", depenseController.createDepense);
router.delete("/:id", depenseController.deleteDepense);
router.get("/getDepense", depenseController.getAllDepense);
router.get("/getDepenseByDate", depenseController.getDepensesByDate);

module.exports = router;