export default () => ({
  port: parseInt(process.env.PORT) || 3001,
  host: process.env.HOST || '0.0.0.0',
  session: {
    secret: process.env.SESSION_SECRET || '',
    salt: process.env.SESSION_SALT || '',
  },
  answerService: {
    apiKey: process.env.OPEN_AI_KEY || '',
  },
});
