import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// render principal page
app.get("/", (req, res) =>{
    res.render("index.ejs");
})

// reservation page
app.get("/reservation", (req, res) =>{
    res.render("reservation.ejs");
})

app.listen(port, () =>{
    console.log(`This server is running on port ${port}`);
})