const express = require('express');
const helmet = require('helmet');


const app = express();
app.use(helmet());
app.use(express.json());


async function startServer() {
    try {
        app.listen(3000, () => {
            console.log(`Server listening on port 3000`);
        });
    } catch (err) {
        console.error('Failed to start', err);
        process.exit(1);
    }
}

startServer();