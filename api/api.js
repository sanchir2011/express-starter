const express = require('express')
const router = express.Router()
const utils = require('../util/utils')
const mw = require('../util/middlewares')
const mongoose = require('mongoose')
require('dotenv').config()

router.get('/', (req, res) => {
    res.json({ status: 200, message: 'Amjilttai backend server aslaa!' })
})

module.exports = router