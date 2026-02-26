const express = require('express');
const userController = require('../controllers/usercontroller');

const router = express.Router();

// create role  
router.get("/getUser", userController.getUser);

module.exports = router;