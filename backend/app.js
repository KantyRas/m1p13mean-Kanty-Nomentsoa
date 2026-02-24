const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connecté"))
.catch(err => console.log(err));

// routes
app.use('/roles', require('./routes/roles'));
// app.use('/auth', require('./routes/auth'));
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));