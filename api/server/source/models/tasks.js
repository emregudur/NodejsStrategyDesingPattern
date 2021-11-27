import mongoose, { Schema } from 'mongoose'

const TasksModel = new Schema({
  taskId: {
    type: String,
    unique: true,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
})

export default mongoose.model('tasks', TasksModel)
