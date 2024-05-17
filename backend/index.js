const express = require('express');
const cors = require('cors');
require('dotenv').config()
require("./db")
const rootRouter = require('./routes/index.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin: process.env.URL, credentials:true}));

app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use("/api/v1", rootRouter)

app.listen(PORT, () => {
    console.log(`Server is active on port ${PORT}`);
})
