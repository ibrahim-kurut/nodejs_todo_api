const mongoose = require("mongoose")

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log(`DB Connected Successfully ......`)
    }
    catch (error) {
        console.log(`connectin failed to Database ${error}`)
    }
}

module.exports = dbConnection