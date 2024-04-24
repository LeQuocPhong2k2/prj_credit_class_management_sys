import accountRouter from './accounts.js'
function route(app) {
  app.use('/account', accountRouter)
}

export default route
