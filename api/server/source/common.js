import { v4 as uuidv4 } from 'uuid'

export function generateUniqueId() {
  return uuidv4()
}

export const mongodbConnectionUri = () => {
  const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DBNAME, MONGO_PORT, MONGO_HOST } = process.env
  console.log(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`);
  return `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`
}
