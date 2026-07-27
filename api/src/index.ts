import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { votingRoutes } from './routes/voting.js';
import { sessionRoutes } from './routes/session.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/votes', votingRoutes);
app.use('/api/session', sessionRoutes);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Voting DApp API running on port ${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
});

export default app;
