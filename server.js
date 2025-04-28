const express = require('express');
const helmet = require('helmet');
const { connectWithRetry } = require('./utils/db');

const { port } = require('./config/index')
const app = express();
app.use(helmet());
app.use(express.json());


require('./utils/redisClient');

async function startServer() {
    try {
        await connectWithRetry();
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    }
}

startServer();