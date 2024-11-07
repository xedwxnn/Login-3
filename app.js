var express = require("express");
var app = express();
const path = require('path')
const session = require("express-session");

const mysql = require("mysql");

let conexion = mysql.createConnection({
    host: "localhost",
    database: "form",
    user: "root",
    password: ""
});

app.use(session({
    secret: "leodanny03",
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname + '/public')))
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/index", function(req, res){
    res.render("index");
});

app.post("/validarReg", function(req, res){
    const datos = req.body;

    let FullName = datos.name;
    let EmailUser  = datos.email;
    let PassUser  = datos.Password;

    let buscar = "SELECT * FROM users WHERE email = ?";
    let registrar = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    conexion.query(buscar, EmailUser , function(error, row) {
        if(error){
            throw error;
        }

        else {
            if(row.length>0){
                console.log("No se puede registrar. Email ya existente");
            }

            else {
                conexion.query(registrar, [FullName, EmailUser , PassUser ], function(error) {
                    if(error) {
                        throw error;
                    }
    
                    else {
                        console.log("Datos almacenados correctamente.")
                        res.redirect("/");
                    }
                })
            }
        }
    })
})

app.post("/validarLog", function(req, res){
    const datos = req.body;

    let EmailUser = datos.emailLog;
    let PassUser = datos.PasswordLog;

    let buscar = "SELECT * FROM users WHERE email = ? AND password = ?";
    let usuario;

    conexion.query(buscar, [EmailUser  , PassUser  ], function(error, row) {
        if(error) {
            throw error;
        }

        else {
            if(row.length > 0) {
                usuario = row[0];
                req.session.usuario = usuario;
                res.redirect("/index");
            } else {
                res.send("Email o contraseña incorrectos");
            }
        }
    })
})

app.listen(3000, function(){
    console.log("Server is listening on port 3000");
})