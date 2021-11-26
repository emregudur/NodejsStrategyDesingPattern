import express from 'express'
import cookieParser from 'cookie-parser'
import setRoutes from './source/routes/index'
import connectMongo from './source/db'
import cors from 'cors'

connectMongo()

const app = express()
app.use(
  cors({
    origin: '*',
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// app.use(express.static(path.join(__dirname, 'public')));
setRoutes(app)

export default app
