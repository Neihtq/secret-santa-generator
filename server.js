var express = require("express");
var app = express();
var path = require('path');

var names = ["Thien", "Cao", "Nam", "Sam", "Viet", "Sunda"]
var matchings = {};
var nameDict = {
    "Thien": "uo3AhSh", 
    "Cao": "ka", 
    "Nam": "1233",
    "Sam": "12345", 
    "Viet": "123j", 
    "Sunda": "7337"
};
var unmatched = ["Thien", "Cao", "Nam", "Sam", "Viet", "Sunda"];

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
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(3000, function() {
    console.log("listening on port 3000!");
})