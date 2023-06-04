const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")

const routes = require("./routes/DashboardRoute")

require('dotenv').config()

const app = express()
const PORT = process.env.port || 5000

app.use(express.json())
app.use(cors())

mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err))

app.use(routes)

//heroku

// if (process.env.NODE_ENV == "production") {
//     app.use(express.static("dashboard/build"))
// }

app.listen(PORT, () => console.log(`Port Running at ${PORT}`))