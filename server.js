var express = require("express");
var app = express();
var path = require('path');

var names = ["Iusti", "Martin", "Aniek", "Leon", "Nam", "Cao", "Talha", "Pitr", "Daniel", "Arina", "Terri", "Linh", "Liana"]
var matchings = {};
var nameDict = {
    "Iusti": "emA2eernAL",
    "Martin": "pmomspj5JA",
    "Aniek": "AJoHPDtMPV",
    "Leon": "159MawqrLz",
    "Nam": "2BrxTs5RrB",
    "Cao": "C8QCLQClYe",
    "Talha": "olN9f8bI8G",
    "Pitr": "0uOyAmBaL3",
    "Daniel": "CImjEkNiwl",
    "Arina": "qj9WZOAGPi",
    "Terri": "3z3SLhXWpD",
    "Linh": "aMdOBu4lE3",
    "Liana": "piKtpE3IwP"
};
var unmatched = ["Iusti", "Martin", "Aniek", "Leon", "Nam", "Cao", "Talha", "Pitr", "Daniel", "Arina", "Terri", "Linh", "Liana"];

function assign(secretSanta) {
    if (secretSanta in matchings) {
        return matchings[secretSanta];
    }

    var matchIndex = Math.floor(Math.random()*unmatched.length);
    var match = unmatched[matchIndex];
    
    while (secretSanta == match) {
        matchIndex = Math.floor(Math.random()*unmatched.length);
        match = unmatched[matchIndex];
    }
    
    if (secretSanta != match) {
        unmatched.splice(matchIndex,1);    
    }

    matchings[secretSanta] = match;

    return match;
}
app.use('/', express.static(__dirname + '/'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/names', function (req, res) {
    res.json(JSON.stringify({names: names}))
})

app.post('/assign', function(req, res) {
    var name = req.query.name;
    var secret = req.query.secret;
    if (secret == nameDict[name]){
        var gift = assign(name)
        res.send(gift)
    } else {
        res.send("notMatching")
    }
})

app.get('/', function (req, res) {
    console.log("client connected!")
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(8000, function() {
    console.log("listening on port 8000!");
})
