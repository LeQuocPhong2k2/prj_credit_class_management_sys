// Init server
import express from 'express'
import morgan from 'morgan'
import methodOverride from 'method-override'
import cors from 'cors'
import path from 'path'
import { Server } from 'socket.io'
import { createServer } from 'http'
import bodyParser from 'body-parser'
import passport from 'passport'

import passportLocal from 'passport-local'
const app = express()
const port = 3003
app.use(cors())

import route from './routes/index.js'
import db from './config/db/index.js'

// ...rest of your code
//connect to db
// db.connect()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.json({ extended: false }))

const LocalStrategy = passportLocal.Strategy

// //connect to db
// db.connect()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
//unlock cors
app.use((req, res, next) => {
  const origin = req.headers['origin'] || '*'
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
app.use(methodOverride('_method'))

// HTTP logger
app.use(morgan('combined'))

app.get('/', (req, res) => {
  return res.render('index')
})

// Routes initfbu
route(app)
db.connect()
  .then(() => {
    // const bucketname = process.env.s3_bucket
    // console.log('bucketname nhận là : ', bucketname)
    app.listen(port, () => {
      console.log(`App listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to connect to the database', error)
  })

// server.listen(port, () => {
//     console.log(`App listening on port ${port}`)
// })
// app.listen(port, () => {
//     console.log(`App listening on port ${port}`)
// })
