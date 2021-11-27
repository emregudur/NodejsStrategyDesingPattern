import express from 'express'
const Router = express.Router()

import * as TaskController from '../controller/task'

Router.get('/', TaskController.Get)
Router.post('/addProvider', TaskController.AddProvider)

export default Router
