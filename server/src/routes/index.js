import accountRouter from './accounts.js'
import studentRouter from './students.js'
function route(app) {
  app.use('/account', accountRouter)
  app.use('/student', studentRouter)
}

export default route
