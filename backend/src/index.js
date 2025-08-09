const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const connectDB = require('./config/db')
const app = require('./app')
connectDB();

app.listen(process.env.BACKEND_PORT, () => {
    console.log("Server is Running");
});