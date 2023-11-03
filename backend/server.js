const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
var mysql = require('mysql');
const e = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cors = require("cors");

const path = require('path');
const pathInscription = path.join(__dirname,'..','pages', '/inscription.js');
const pathConnexion = path.join(__dirname,'..','pages', 'connexion.js');
const pathAccueil = path.join(__dirname,'..','App.js');



//pour allow la request origin
app.use(
  cors({
    origin: ["http://localhost:3000","http://localhost:3001"],
    methods: ["GET", "POST","DELETE","PUT"],
    credentials: true,
  })
);


//connection
//pool de connection permet d'avoir plusieurs connections et les réutiliser
var connPool = mysql.createPool({
    connectionLimit: 15,
    database: 'defaultdb',
    host: "tp2-database-cegeplimoilou-d98e.aivencloud.com",
    user: "tp2-user",
    password: "AVNS_Lr1bNoaKr9acqJQ-2Yx",
    port : "13923"
});

//requete et connection pour aller chercher l'utilisateur selon les paramètres
function requeteSelectUser(username,password,callback){  //operation dans le callback
    console.log(username + " "+password);
    //connection et requete
    connPool.getConnection((err,conn)=> {
        if (err) throw err;
        console.log("Connected");
    
        var sqlQuery = "SELECT * FROM defaultdb.Utilisateur u WHERE u.user_name = ?";
        conn.query(sqlQuery,[username, password],(err, rows, fields)=>{
            if (err){
                callback(null,bcryptErr);
            };
            if(rows.length>0){
                data = rows;
                const user = rows[0];
                const hashedPassword = user.user_password; 
            
            console.log(password +" "+hashedPassword)
            bcrypt.compare(password, hashedPassword, (bcryptErr, result) => {
                if(bcryptErr){
                    console.log("bcrypt error")
                    callback(null,null);
                }
                if (!result) {
                    console.log("invalide username password")
                    callback(null,null);
                }
                else{
                    console.log("valide ")
                    console.log(user)
                    callback(user,null );
                }
                conn.release();
            })
            }else{
                callback(null,null);
            }
    });
})
}

//requete et connection pour effacer des événements
function deleteEvent(eventid,callback){
    connPool.getConnection((err,conn)=>{
        if (err) throw err;
        console.log("Connected");

        var sqlQuery = "delete from defaultdb.EvenementsUser eu where eu.id_event = ?";
        conn.query(sqlQuery,[eventid],(err, rows, fields)=>{
            if (err) throw err;

            conn.release();
            console.log("Deconnected");
            callback(err);

        })
    })
}

//requete et connection pour créer des événements
function createEvent(type,userid,callback){
    connPool.getConnection((err,conn)=>{
        if (err) throw err;
        console.log("Connected");

        //valide que utilisateur existe bien
        const checkUserQuery = "SELECT id_utilisateur FROM defaultdb.Utilisateur WHERE id_utilisateur = ?";
        conn.query(checkUserQuery, [userid], (err, userRows, userFields) => {
            //si erreur sql
            if (err) {
                console.error("error select id_utilisateur dans Utilisateur", err);
                conn.release();
                //stop ici
                return callback(err);
            }

            //si utilisateur existe pas
            if (userRows.length === 0) {
                // User existe pas
                console.log("utilisateur n'existe pas");
                conn.release();
                //stop ici
                return callback(new Error("utilisateur n'existe pas"));
            }

        var sqlQuery = "insert into defaultdb.EvenementsUser (even_type, utilisateur_id, date_event)  VALUES ( ? , ? , ? )";
        let today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        conn.query(sqlQuery,[type,userid,formattedDate],(err, rows, fields)=>{
            if (err) throw err;

            conn.release();
            console.log("Deconnected");
            callback(err);
        })
    })
})
}

function generateToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }

//API'S--------------------------------------

// gestion de session
app.use(session({
    secret: 'Z5X34PJszv',
    resave: false,
    saveUninitialized: true
}));

/*app.get("/api",(req,res)=>{

    const session = req.session;

    // Modify the session cookie properties or add custom properties
    session.cookie.maxAge = 1000 * 60 * 60; // Change the max age to 1 hour (in milliseconds)
    session.cookie.httpOnly = true; // Make the cookie HTTP-only
    session.customProperty = "This is a custom property";
    console.log(req.session.cookie)
    console.log(req.session.customProperty)
    res.json({"answer":"succes"}).end();
});*/

app.post("/createEvent",(req,res)=>{
    let retMessage = {"EstCreer":false};

    if(req.body.typeevent !=null && req.body.userid !=null){
        createEvent(req.body.typeevent,req.body.userid,(err)=>{
            if(err===null){
                retMessage.EstCreer = true;
                console.log("event créer");
                res.json(retMessage).end();
            }
            else{
                console.log("error inserting event");
                res.json(retMessage).end();
            }
        })

    }else{
        console.log("body null");
        res.json(retMessage).end();
    }
})

//delete userevents dans la table sql
app.delete("/deleteEvent",(req,res)=>{
    let retMessage = {"EstDelete":false};

    if(req.body.idevent!=null){
        deleteEvent(req.body.idevent,(err)=>{
            if(err===null){
                retMessage.EstDelete = true;
                console.log("event effacé");
                res.json(retMessage).end();
            }
            else{
                console.log("error deleting event");
                res.json(retMessage).end();
            }
        })
    }
    else{
        console.log("body null");
        res.json(retMessage).end();
    }
})


// Accueil
app.get("/", (req, res) => {
    const messageBienvenue = "<h1>Bienvenue sur la page d'accueil de votre calendrier.</h1>";
    res.send(messageBienvenue);
    res.sendFile(pathAccueil);
});


app.post("/api/inscription", (req, res) => {
    const { username, password } = req.body;
    // hashage du password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error("Erreur de hachage de mot de passe");
            res.redirect("/inscription");
        } else {
            // insere l'utilisateur et le mot de passe hashé a la bd
            const sqlQuery = "INSERT INTO defaultdb.Utilisateur (user_name, user_password) VALUES (?, ?)";
            connPool.query(sqlQuery, [username, hash], (err, result) => {
                if (err) {
                    console.error("Erreur lors de l'insertion de l'utilisateur dans la base de données");
                    //res.redirect("/inscription");
                    res.send("user created").end();
                } else {
                   // res.redirect("/");
                   res.send("user created").end();
                }
            });
        }
    });
});

//validation de connexion utilisateur
app.post("/api/connexion",(req,res)=>{
    console.log(req.body)
    const { username, password } = req.body;
    // avec requeteSelectUser
    requeteSelectUser(username,password, (data, err) => {
        if (data==null) {
            console.error("erreur de connection");
            res.json({}).end();}
        else{
            console.error("connection succes");
            //set le token associé à cette connexion

            let token = req.session.token
            if(token==undefined){
                token = generateToken(10);
                req.session.token = token;
            }
            req.session.cookie.originalMaxAge = 999999;
            //save session
            req.session.save((err) => {
                if (err) {
                  console.error('Error saving session:', err);
                  res.send('Session not saved');
                } else {
                  //console.log("Session created"+ req.session);
                  res.send({"token":token}).end();
                }
              });
        }
    });
});

//valide que la session user contient bien un token valide
app.get("/api/getToken",(req,res)=>{
    console.log("comparetoken : "+"clientside : "+req.query.token+" serverside : "+req.session.token);
    if(req.session.token!==undefined){
        if(req.query.token==req.session.token){
            res.send({"isConnected":true}).end();
        }
        else{
            res.send({"isConnected":false}).end();
        }
    }
    else{
        res.send({"isConnected":false}).end();
    }


})


// DeConnexion
app.get("/deconnexion", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erreur lors de la déconnexion");
        }
        res.redirect("/");
    });
});

// calendrier
app.get("/calendrier", (req, res) => {
    // controller si l'utilisateur est connecté grace session
    if (req.session && req.session.user) {
        // Rendre la page de calendrier avec l'élément "Calendrier"
        // ...
    } else {
        // Rediriger vers la page d'accueil si l'utilisateur n'est pas connecté
        res.redirect("/");
    }
});

//ecoute sur le port 5000
app.listen(5000 ,()=>{
    console.log("server listening on port 5000")
});
