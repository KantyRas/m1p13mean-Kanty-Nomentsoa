const Role = require('../models/Role');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register
const register = async (req, res, next)=>{

    const roleName = req.body.role;   // 👈 on récupère le rôle envoyé

    const role = await Role.findOne({ rolename: roleName });

    if (!role) {
        return res.status(400).json({ message: "Role non assigné" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        name: req.body.name, 
        username: req.body.username,
        password: hashPassword,
        roles:role
    })
    await newUser.save();
    
    return res.status(200).json({ message: " save ok"});

};

// login
const login = async (req, res, next)=>{

    try{
        const user = await User.findOne({username: req.body.username}).populate("roles");
        if(!user){
            return res.status(400).json({ error: "user not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({ error: "mot de passe incorrect" });
        }

        // Création du token JWT
        const token = jwt.sign(
            { id: user._id, username: user.username, roles: user.roles.map(r => r.rolename) }, // données incluses dans le token
            "SECRET_KEY", // à remplacer par une vraie clé secrète dans un fichier .env
            { expiresIn: "1h" } // durée de validité du token
        );

        return res.status(200).json({
            message: "Login ok",
            token: token
        });
    }catch (error) {
        return res.status(500).send("Something went wrong!!");
    }
};


module.exports = {register,login};  