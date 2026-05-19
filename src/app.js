import express from 'express';
import swaggerUi from 'swagger-ui-express';
import logger from 'morgan';
import cors from 'cors';

import docs from './docs/index.js';

import usersRouter from './routes/api/users.js';
import purchasesRouter from './routes/api/purchases.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(docs, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  }),
);

app.use('/api/users', usersRouter);
app.use('/api/purchases', purchasesRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, _next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
