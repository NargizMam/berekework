import mongoose from 'mongoose';
import config from './config';
import Components from './models/componentsModel';

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

  const collections = ['components', 'headings'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  await Components.create({
    image: 'fixtures/crybaby.jpg',
    name: 'Heading',
    requestUrl: '/heading',
  });

  await db.close();
};

void run();
