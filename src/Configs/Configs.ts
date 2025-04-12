require('dotenv').config();

const RequiredEnvs = [ 'MONGO_PATH',"MONGO_USER","MONGO_PASSWORD"];
const missingEnvs = RequiredEnvs.filter((envName) => !process.env[envName]);

if (missingEnvs.length > 0) {
  throw new Error(`Missing required env variable(s): ${missingEnvs.join(', ')}`);
}

module.exports = {
  SaltRounds: parseInt(process.env.SALT_ROUNDS || '7', 10),
  JWTSecret: process.env.JWT_SECRET,
  DbUrl: process.env.MONGO_PATH,
  DbUser:process.env.MONGO_USER,
  DbPass:process.env.MONGO_PASSWORD,
  Port:process.env.PORT
};
