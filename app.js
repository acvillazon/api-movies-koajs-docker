const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8090
const {json, urlencoded} = express;
const app = express();

const corsOptions ={
    origin: '*',
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port,()=>console.log("listening on port "+port))