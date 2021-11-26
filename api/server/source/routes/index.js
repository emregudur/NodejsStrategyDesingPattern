import createError from 'http-errors'

import taskRouter from './task'

export default function setRoutes(app) {
  app.use('/task', taskRouter)

  app.use((req, res, next) => {
    next()
  })

  app.use((req, res, next) => {
    next(createError(404))
  })

  app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    console.log(err)
    res.status(err.status || 500)
    res.send({ message: err.message })
  })
}
