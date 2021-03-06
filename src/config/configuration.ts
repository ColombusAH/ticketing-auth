export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret',
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || 36000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
