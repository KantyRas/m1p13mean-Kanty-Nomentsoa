const Role = require('../models/Role');

const createrole = async (req, res)=>{
    try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
};

const getrole = async (req, res)=>{
    try {
    const roles = await Role.find();
    res.json(roles);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}

module.exports = {createrole, getrole};