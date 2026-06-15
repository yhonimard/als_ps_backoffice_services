import "dotenv/config"
import Confidence from "confidence"

const config = {
  db_uri: process.env.DATABASE_URL,
  port: process.env.PORT,
  jwtKey: process.env.JWT_KEY,
  bcrypt:{
    salt: process.env.BCRYPT_HASH
  }

}

const store = new Confidence.Store(config)
export default (key) => store.get(key)
