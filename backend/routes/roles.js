const express = require('express');
const roleController = require('../controllers/rolecontroller');

const router = express.Router();

// create role
router.post("/newrole", roleController.createrole);
router.get("/getrole", roleController.getrole);

module.exports = router;