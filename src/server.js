import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const { DB_HOST, PORT = 3000 } = process.env;

if (!DB_HOST) {
  console.error('DB_HOST is not set');
  process.exit(1);
}

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');

    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });