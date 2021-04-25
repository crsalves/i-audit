const mysql = require('mysql')
var connectDB
function connectDb(configDB){
    if(!connectDB){
        connectDB = mysql.createConnection(configDB)
        connectDB.connect(function(err){
            if(err){
                console.log("Error connecting database: ")
                console.log(err)
            }
            else{
                console.log("Database connected successfully.")
            }
        })
    }
    return connectDB
}


module.exports = {connectDb}