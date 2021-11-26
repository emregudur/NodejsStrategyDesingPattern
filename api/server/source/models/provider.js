import mongoose, { Schema } from 'mongoose'

const ProviderModel = new Schema({
  api: {
    type: String,
    unique: true,
    required: true,
  },
  providerName: {
    type: String,
    required: true,
  },
})

export default mongoose.model('provider', ProviderModel)
