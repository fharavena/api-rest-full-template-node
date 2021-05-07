const express = require('express')
var cors = require('cors')
require('dotenv').config()
var request = require('request');

const app = express()
app.use(cors())
const port = process.env.PORT || 5000

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json())

// simple route
app.get("/", (req, res) => {
    res.send("Welcome to Fharavena application API.")
});

app.use("/api/beer", require("./routes/beers"));
app.use("/api/banks", require("./routes/banks"));
app.use("/api/destinatario", require("./routes/destinatario"));

app.listen(port, () => console.log(`Listen on port ${port}`))