const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");
var snoowrap = require("snoowrap")
var toDate = require("date-fns");
var fromUnixTime = require('date-fns/fromUnixTime');
var cron = require('node-cron');

const con = mysql.createConnection({
  host: "", // O host do banco. Ex: localhost
  user: "", // Um usuário do banco. Ex: user
  password: "", // A senha do usuário. Ex: user123
  database: "", // A base de dados a qual a aplicação irá se conectar, por favor criar um para essa aplicação antes de executar a mesma.
});

con.connect((err) => {
  if (err) {
    console.log("Erro connecting to database...", err);
    return;
  }
  console.log("Connection established!");
});



const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const r = new snoowrap({
  userAgent: "myredditapp:v1.0 (by /u/caiodesouzadev)",
  clientId: "2AeVoSfzzKKGHg",
  clientSecret: "neDqYVyMKQHH_N33RTkSuRFAy9w",
  refreshToken: "512765828034-nXVmN4OvEKSM5fkakhMVZ1gmSJo",
});

app.get("/", function (req, res) {
  res.render("home");

 
    
});

app.post("/search", function(req,res){
let order = req.body.order;
let date_one = req.body.initialDate;
let date_two = req.body.finalDate;


  con.query("SELECT * FROM postshot WHERE dates BETWEEN ('"  + date_one + "') AND ('" + date_two + "') ORDER BY " + order + " DESC;", function (err, result) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });

});


app.post("/search2", function(req,res ){
  let order = req.body.order;

  con.query("SELECT author_name, " + order + " FROM postshot  ORDER BY " + order + " DESC;", function (err, result) {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });

 });

 cron.schedule("00 30 11 * * 1-7", updateDB());
 
 function updateDB(){
   console.log("Atualiza o Banco de Dados todos os dias as 11:30:00 AM.");
    r.getHot("artificial").map(post => post.author.name).then(function (response) {
      let postAuthor = response;
     
      var i;
      for (i = 0; i < postAuthor.length; i++) {
        var sql = "UPDATE postshot SET author_name =(?) WHERE  id_num = ? ;";
        con.query(sql, [postAuthor[i],[i]], function (err, result) {
          if (err) throw err;
         
        });
      }

    })

    .catch(function (error) {
      console.log(error);
    });


   r.getHot("artificial")
    .map((post) => post.ups)
    .then(function (response) {
      let postUps = response;
      var i;
      for (i = 0; i < postUps.length; i++) {
        var sql = "UPDATE postshot SET up_number= (?) WHERE id_num = ? ;";
        con.query(sql, [postUps[i],[i]], function (err, result) {
          if (err) throw err;

        });
      }

      
    })
    .catch(function (error) {
      console.log(error);
    });

   r.getHot("artificial")
    .map((post) => post.num_comments)
    .then(function (response) {
      let postCom = response;
     
      var i;
      for (i = 0; i < postCom.length; i++) {
        var sql = "UPDATE postshot SET comments_number= (?) WHERE id_num =?;";
        con.query(sql, [postCom[i],[i]], function (err, result) {
          if (err) throw err;
        
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

   r.getHot("artificial")
    .map((post) => post.created_utc)
    .then(function (response) {
 
      let dates =[];
   let dates2= []; 
   let i;
   for (i=0; i< response.length; i++) {
 
   var resultado = fromUnixTime(response[i]);
   dates.push(resultado);
  

   dates2.push(dates);
  
  
   }

   var j;
      for (j = 0; j < dates.length; j++) {
        var sql = "UPDATE postshot SET dates =(?) WHERE id_num=?;";
        con.query(sql, [dates[j],[j]], function (err, result) {
          if (err) throw err;
        });
      }
    
      
    })
    .catch(function (error) {
      console.log(error);
    });

   r.getHot("artificial").map((post) => post.title).then(function (response) {
      let postTitles = response;
 
      var i;
      for (i = 0; i < postTitles.length; i++) {
        var sql = "UPDATE postshot SET title = (?) WHERE id_num=?;";
        con.query(sql, [postTitles[i],[i]], function (err, result) {
          if (err) throw err;
          
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
   
  }

  


app.post("/firstData", function(req,res){
 updateDB();
 res.redirect("/");
});


app.listen(3000, function () {
  console.log("Server started on port 3000.");
});

