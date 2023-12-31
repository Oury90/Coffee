import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "Wally90",
    port: 5432,
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

db.connect();



let reservation = [
    {
        id: 1,
        full_name: "Amadou Oury",
        phone: "12/34/56",
        dataTime: "12/04/2001-2343",
        numberP: 1,
        messages: "Bomjour le monde"
    },
    {
        id: 2,
        full_name: " Oury",
        phone: "12/34/56",
        dataTime: "12/04/2001-2343",
        numberP: 2,
        messages: "Bomjour le monde"
    },
    {
        id: 3,
        full_name: "Oumar",
        phone: "12/34/56",
        dataTime: "12/04/2001-2343",
        numberP: 3,
        messages: "Bomjour le monde"
    }
]

async function get_data(){
    const datas = await db.query("SELECT * FROM reservation");
    let new_dict = {}
    datas.rows.forEach((data) =>{
        reservation.push(data);
    })
}

get_data();


// render principal page
app.get("/", (req, res) =>{
    res.render("index.ejs");
})

// reservation page
app.get("/reservation", (req, res) =>{
    res.render("reservation.ejs");
})

// get information of reservation

app.get("/perso", (req, res) =>{
    res.render("perso.ejs", {
        datas: reservation
    });
})

//post infromation about reservation

app.post("/infos", (req, res) =>{
    const fName = req.body.inputName;
    const lName = req.body.inputLartName;
    const data_of_reservation = req.body.birthdaytime;
    const phoneNumber = req.body.numberPhone;
    const numberPeople = req.body.number;
    const message = req.body.message;
    console.log(`${fName}/${lName}/${data_of_reservation}/${phoneNumber}/${numberPeople}/${message}`);
})

app.listen(port, () =>{
    console.log(`This server is running on port ${port}`);
})