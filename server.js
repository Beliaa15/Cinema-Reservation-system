const express = require('express');
const helmet = require('helmet');
const { connectWithRetry } = require('./utils/db');

const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const showtimeRoutes = require('./routes/showtimeRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const theaterRoutes = require('./routes/theaterRoutes');

const { port } = require('./config/index')

const app = express();
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/showtimes', showtimeRoutes);
app.use('/api/theaters', theaterRoutes);

app.use(errorMiddleware);

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