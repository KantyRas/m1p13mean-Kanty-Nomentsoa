const User = require('../models/User');

const getUser = async (req, res)=>{
    try {
    const users = await User.find().populate('roles');
    res.json(users);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

module.exports = {getUser};