const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
var mysql = require('mysql');
const e = require('express');
const bcrypt = require('bcrypt');
const pathInscritption = require('./pages/html/inscription.html');

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
    var data = []
    //connection et requete
    connPool.getConnection((err,conn)=> {
        if (err) throw err;
        console.log("Connected");
    
        var sqlQuery = "SELECT * FROM defaultdb.Utilisateur u WHERE u.user_name = ? AND u.user_password = ?";
        conn.query(sqlQuery,[username, password],(err, rows, fields)=>{
            if (err) throw err;
            if(rows!==undefined){
                data = rows;
            }

            conn.release();
            console.log("Deconnected");
            //call back recois le data selectionné en bd
            callback(data,err);
        })
    });
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

//API'S--------------------------------------


app.get("/api",(req,res)=>{

    //console.log(req.body);

    //res.send("ff").end();
    res.json({"answer":"succes"}).end();
});

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

//validation de connection utilisateur
app.post("/connection",(req,res)=>{
    let retMessage = {"EstUser":false};

    if(req.body.username !=null && req.body.password !=null){
    //callback avec le data et validation
    requeteSelectUser(req.body.username,req.body.password,(data,err)=>{
        if(err===null){
            console.log(data.length)
            if(data.length>0){
                console.log("est un user");
                retMessage.EstUser = true;
                res.json(retMessage).end();
            }else {
                console.log("pas un user");
                res.json(retMessage).end();
            }
        }else{
            console.log("error");
            res.json(retMessage).end();
        }
    });

    }else{
        console.log("body null");
        res.json(retMessage).end();
    }
})

//ecoute sur le port 5000
app.listen(5000 ,()=>{
    console.log("server listening on port 5000")
});

// Accueil
app.get("/", (req, res) => {
    const welcomeMessage = "<h1>Bienvenue sur la page d'accueil de votre calendrier.</h1>";
    res.send(welcomeMessage);
});

// inscription
app.get("/inscription", (req, res) => {
    res.sendFile(pathInscritption.join(__dirname, 'pages', 'inscription.html'));
});

app.post("/inscription", (req, res) => {
    const { username, password } = req.body;
    // hashage du password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error("Erreur de hachage de mot de passe");
            res.redirect("/inscription");
        } else {
            // insere l'utilisateur et le mot de passe hashé a la bd
            const sqlQuery = "INSERT INTO defaultdb.Utilisateur (user_name, user_password) VALUES (?, ?)";
            conn.query(sqlQuery, [username, hash], (err, result) => {
                if (err) {
                    console.error("Erreur lors de l'insertion de l'utilisateur dans la base de données");
                    res.redirect("/inscription");
                } else {
                    res.redirect("/");
                }
            });
        }
    });
});

