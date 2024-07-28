const express = require("express")
const dotenv = require("dotenv")
const dbConnection = require("./src/config/db")

dotenv.config()

// db Connect
dbConnection()

//  init app
const app = express()

// middleware
app.use(express.json())

// Router
app.use("/api/auth", require("./src/routes/authRoute"))
app.use("/api/users", require("./src/routes/usersRoute"))

app.use("/api/todos", require('./src/routes/todoRoute'))

// Running Server
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Server is running is ${process.env.NODE_ENV} MODE on port ${PORT}`)
})