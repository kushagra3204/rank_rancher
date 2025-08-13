const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const routes = require('./routes');

app = express()

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))

app.use(express.json({ limit: '500mb' }))
app.use(cookieParser());
app.use('/api',routes);

module.exports = app