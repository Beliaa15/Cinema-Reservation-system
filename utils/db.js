const mongoose = require('mongoose');
const { mongoUri } = require('../config');

async function connectWithRetry(retries = 0) {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,        // still valid
            useUnifiedTopology: true,     // opt into new engine
            serverSelectionTimeoutMS: 5000 // wait up to 5s for initial server selection
        });
        console.log('MongoDB connected');
    } catch (err) {
        if (retries < MAX_RETRIES) {
            console.warn(`MongoDB connection failed. Retrying ${retries + 1}/${MAX_RETRIES}...`);
            setTimeout(() => connectWithRetry(retries + 1), RETRY_DELAY);
        } else {
            console.error('MongoDB connection failed after max retries:', err);
            process.exit(1);
        }
    }
}
module.exports = { connectWithRetry };
