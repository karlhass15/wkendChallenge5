var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgress://localhost:5432/messagebrd';



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/data', function(req, res) {
   var results = [];

   pg.connect(connectionString, function (err, client, done) {
      var query = client.query('SELECT * FROM zetamessage ORDER BY name ASC');

      query.on('row', function (row) {
         results.push(row);
      });

      query.on('end', function () {
         client.end();
         return res.json(results);
      });

      if (err) {
         console.log(err);
      }
   });
});
      app.post('/data', function (req, res) {
         var addedPersonMsg = {
            "name": req.body.personName,
            "message": req.body.inputMessage
         };
      console.log(addedPersonMsg);
         pg.connect(connectionString, function (err, client) {

            client.query("INSERT INTO zetamessage (name, message) VALUES ($1, $2) RETURNING id",
                [addedPersonMsg.name, addedPersonMsg.message],
                function (err, result) {
                   if (err) {
                      console.log("Error inserting Data: ", err);
                      res.send(false);
                   }
                   res.send(true);
                });
         });
      });

app.get("/*", function (req, res) {
   var file = req.params[0] || "/views/index.html";
   res.sendFile(path.join(__dirname, "./public", file));
});
app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function () {
   console.log("Listening on port: ", app.get("port"));
});