require('dotenv').config()
const express = require('express')
const app = express()
const createHttpError = require('http-errors')
const UserRouter = require('./routes/user')
const AdminRouter = require('./routes/admin')
const LaptopRouter = require('./routes/laptops')
const RequestRouter = require('./routes/requests')
const fileUpload = require('express-fileupload');

app.use(fileUpload());

app.use('/public/laptops', express.static('public/laptops'))

//cors
const cors = require('cors')
app.use(cors())

app.use(express.json())

app.use('/api/v1/users', UserRouter);
app.use('/api/v1/admin', AdminRouter);
app.use('/api/v1/laptops', LaptopRouter)
app.use('/api/v1/requests', RequestRouter)

app.use((err, req, res, next) => {
    if (createHttpError.isHttpError(err)) {
        res.status(err.status).send({ message: err.message })
    } else {
        res.status(500).send({ message: err.message })
    }
    //error unknown
    res.status(500).send({ message: "Error Unknown" })
})

module.exports = app;