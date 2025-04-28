const jwt = require('jsonwebtoken');
const client = require('../utils/redisClient');
const User = require('../models/User');
const { jwtSecret, jwtExpiresIn } = require('../config');


async function blacklistToken(token) {
    const exp = jwt.decode(token).exp - Math.floor(Date.now() / 1000);
    await client.set(token, '1', { EX: exp });
}


exports.register = async (req, res, next) => {
    try {
        const u = await User.create(req.body);
        res.status(201).json("registered success");
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        next(err);
    }
};


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: jwtExpiresIn });
        res.json({ token });
    } catch (err) {
        next(err);
    }
};

exports.logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.decode(token);
        const ttl = decoded.exp - Math.floor(Date.now() / 1000);
        await blacklistToken(token, ttl);
        res.status(200).json({ message: 'Logged out and token blacklisted' });
    } catch (err) {
        res.status(400).json({ message: 'Logout failed' });
    }
};