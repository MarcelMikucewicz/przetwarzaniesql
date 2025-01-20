const express = require("express")
const mysql = require("mysql")

const app = express()

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "2progr2"
});
conn.connect((err)=>{
    if(err){
        console.log("nie polączona z bazą");
    } else {
        console.log("połączono z bazą");
    }
})

app.get("/all",(req, res)=>{

    const sql = "SELECT * FROM osoby"
conn.query(sql,(err, dane, info)=>{
    if(err){
        console.log(err);
        res.send("nie udało się pobrać danych")
    }else{
        console.log("pobrano wszystkie rekordy");
        res.send(dane)
    }
    })
})

app.get("/add/:imie/:nazwisko/:wiek", (req, res)=>{
    const imie = req.params.imie
    const nazwisko = req.params.nazwisko
    const wiek = req.params.wiek

    const sql = `INSERT INTO osoby (imie, nazwisko, wiek) VALUES ('${imie}','${nazwisko}','${wiek}')`

    console.log(sql);
    conn.query(sql, (err, dane, info)=>{
        if(err){
            console.log(err);
            res.send("nie udało się zapisać danych")
        }else{
            res.send("dodano rekord")
        }
    })
})
app.get("/check/:liczba", (req, res)=>{
    const liczba = req.params.liczba

    const sql=`SELECT * FROM osoby WHERE wiek>('${liczba})`
    conn.query(sql, (err, dane, info)=>{
        if(err){
            console.log(err);
        }else{
            res.send(sql)
        }
    })
})
app.listen(3000, ()=>{
    console.log("aplikacja działa");
})