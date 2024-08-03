import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  try {
    console.log('Connected with Mongoose');
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(
        `University Management System running on port ${config.port}`,
      );
    });
  } catch (err: any) {
    console.log(err);
  }
}

main();
