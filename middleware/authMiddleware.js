const jwt = require('jsonwebtoken');
const client = require('../utils/redisClient');
const { jwtSecret } = require('../config');
const User = require('../models/User');
module.exports = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header?.startsWith('Bearer '))
            return res.sendStatus(401);
        const token = header.split(' ')[1];
        if (await client.get(token))
            return res.status(401).json({ message: 'Token invalidated' });
        const { id } = jwt.verify(token, jwtSecret);
        req.user = await User.findById(id).select('-password');
        next();
    } catch {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};