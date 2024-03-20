const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { createProxyMiddleware } = require('http-proxy-middleware')
const session = require('express-session')
require('dotenv').config()
const utils = require('./util/utils')

const api = require('./api/api')
const auth = require('./api/auth')

const uri = "mongodb://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@"+process.env.DB_ADDRESS+"/type"
mongoose.set('strictQuery', true) 
mongoose.connect(uri)
    .then(() => console.log('READY: Database holbogdloo!'))
    .catch(err => console.log('FAILED: Database holboltiin aldaa: ' + err))

const checkDBConnection = (req, res, next) => {
    if(mongoose.connection.readyState == 1) {
        next()
        return
    }
    res.json({ status: 500, error: 'Өгөгдлийн сан холбогдоогүй байна' })
}

app.use(checkDBConnection)

app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true, cookie: { maxAge: 60 * 60 * 1000 }}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', api)
// app.use('/api', createProxyMiddleware({ target: process.env.FRONT_URL, changeOrigin: true }))

app.use('/auth', auth)
// app.use('/auth', createProxyMiddleware({ target: process.env.FRONT_URL, changeOrigin: true }))

app.listen(process.env.PORT, () => console.log('READY: Amjilttai backend server aslaa Port: ' + process.env.PORT))
