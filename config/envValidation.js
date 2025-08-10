const Joi = require('joi');

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().port().default(5000),
  MONGODB_URI: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().pattern(/^\d+[dhm]$/).default('7d'),
  COOKIE_EXPIRES_IN: Joi.number().min(1).default(7),
  RESET_TOKEN_EXPIRE: Joi.number().min(5).max(60).default(10),
  APP_NAME: Joi.string().default('Your App'),
  EMAIL_FROM: Joi.string().email().required(),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().port().required(),
  FRONTEND_URL: Joi.string().uri().default('http://localhost:3000')
}).unknown();

const validateEnv = () => {
  const { error, value } = envSchema.validate(process.env);
  
  if (error) {
    console.error('❌ Environment validation failed:');
    error.details.forEach((detail) => {
      console.error(`   ${detail.message}`);
    });
    process.exit(1);
  }
  
  console.log('✅ Environment variables validated successfully');
  return value;
};

module.exports = { validateEnv };