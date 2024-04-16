import mongoose from 'mongoose';
import config from './config';
import Components from './models/componentsModel';
import User from './models/users/userModel';
import { randomUUID } from 'crypto';

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (error) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['components', 'headings', 'users'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  await Components.create({
    image: 'fixtures/crybaby.jpg',
    name: 'Heading',
    requestUrl: '/heading',
  });

  await User.create({
    email: 'admin@gmail.com',
    password: 'admin',
    token: randomUUID(),
    role: 'superadmin',
  });

  await db.close();
};

void run();
