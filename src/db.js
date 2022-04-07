const mongoose = require("mongoose");
const connexionString="mongodb+srv://acvillazon:YtHnMJwaB3ccEGKl@cluster0.ljsrg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const initDB = () => { 
    mongoose.connect(connexionString);
    mongoose.connection.once('open', () => { 
      console.log('connected to database'); 
    }); 
    
    mongoose.connection.on('error', console.error); 
} 

module.exports = initDB;