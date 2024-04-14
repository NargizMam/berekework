import path from 'path';
import { configDotenv } from 'dotenv';

const envFile = process.env['NODE_ENV'] ? `.env.${process.env['NODE_ENV']}` : '.env';

configDotenv({ path: envFile });

const rootPath = __dirname;

const config = {
  rootPath,
  port: parseInt(process.env['PORT'] || '8000'),
  publicPath: path.join(rootPath, 'public'),
  mongoose: {
    db: process.env['MONGO_DB_URL '] || 'mongodb://localhost/bereke-work',
  },
  google: {
    clientId: process.env['GOOGLE_CLIENT_ID '],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET '],
  },
};

export default config;
