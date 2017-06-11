var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
 
var clientPath = path.join(__dirname, "../client"); 
var jsonPath = path.join(__dirname, "data.json");
 
app.use(express.static(clientPath));
app.use(bodyParser.json());

app.route('/api/chirps')
    .get(function (req, res) {
        res.sendFile(jsonPath);
    })
    .post(function (req, res) {
            fs.readFile(jsonPath, "utf8", function (err, data) { 
                if (err) {
                    res.sendStatus(500); //500 = internal service error
                } else {
                    var allChirps = JSON.parse(data); //parses the data into an array
                    var newChirp = req.body; //Contains key-value pairs of data submitted in the request body. In this case, the key-value pairs in the 
                    allChirps.push(newChirp); //pushes to the newChirp
                    fs.writeFile(jsonPath, JSON.stringify(allChirps), function (err) { //stringifies the allChirps to send, callback for error
                        if (err) {
                            res.sendStatus(500); 
                        } else {
                            res.sendStatus(201);
                        }
                    });
                }
        });
    });

app.listen(3000);
console.log("Server listening on port 3000");