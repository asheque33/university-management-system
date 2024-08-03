import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  // jwt_secret: process.env.JWT_SECRET,
  // jwt_expiration: process.env.JWT_EXPIRATION,
  // jwt_refresh_token_expiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
  // jwt_cookie_name: process.env.JWT_COOKIE_NAME,
};
