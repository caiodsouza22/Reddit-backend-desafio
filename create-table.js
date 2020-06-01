const mysql = require("mysql");
var snoowrap = require("snoowrap")
var toDate = require("date-fns");
var fromUnixTime = require('date-fns/fromUnixTime');

const con = mysql.createConnection({
    host: '', // O host do banco. Ex: localhost
    user: '', // Um usuário do banco. Ex: user 
    password: '', // A senha do usuário. Ex: user123
    database: "", // A base de dados a qual a aplicação irá se conectar, por favor criar um para essa aplicação antes de executar a mesma.


});

   con.connect((err) => {
    if (err) {
        console.log('Erro connecting to database...', err)
        return
    }
    console.log('Connection established!')
})


const r = new snoowrap({
    userAgent: "myredditapp:v1.0 (by /u/caiodesouzadev)",
    clientId: "2AeVoSfzzKKGHg",
    clientSecret: "neDqYVyMKQHH_N33RTkSuRFAy9w",
    refreshToken: "512765828034-nXVmN4OvEKSM5fkakhMVZ1gmSJo",
  });

function createTable (con){
const sql = "CREATE TABLE IF NOT EXISTS postsHOT ( " +
   "id_num INT NOT NULL AUTO_INCREMENT," +
   "title VARCHAR(255), " +
    "author_name VARCHAR(100) ," +
   "up_number INT," +
    "comments_number INT," +
    "dates VARCHAR(255)," +
    "PRIMARY KEY (id_num)" +
    ");" ;

    con.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('criou a tabela!');
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
        var sql = "INSERT INTO postshot (dates) VALUES (?);";
        con.query(sql, [dates[j]], function (err, result) {
          if (err) throw err;
        });
      }
    
      
    })



    .catch(function (error) {
      console.log(error);
    });

}

createTable(con);




    