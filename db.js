const mysql = require("mysql2");

const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "12345",
    database: "krish_store"

});


connection.connect((err)=>{

    if(err){
        console.log("Database connection failed");
    }
    else{
        console.log("MySQL Connected");
    }

});


module.exports = connection;