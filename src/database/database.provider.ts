import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        const connection = await mongoose.connect(
          'mongodb://auth-mongo-srv:27017/auth',
        );
        console.log('db connected');
        return connection;
      } catch (error) {
        console.error(error);
      }
    },
  },
];
