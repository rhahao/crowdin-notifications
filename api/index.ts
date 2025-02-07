import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import requestIp from 'request-ip';
import logger from './services/logger.js';

const app = express();

app.use(requestIp.mw());

app.use(rateLimit({ windowMs: 1000, max: 20, message: JSON.stringify({ message: 'TOO_MANY_REQUESTS' }) }));

app.get('/', async (req, res) => {
  const log = { message: 'Welcome to Crowdin Notifications API', ip: req.clientIp };

  logger('info', JSON.stringify(log));

  res.status(200).json({ message: log.message });
});

export default app;
