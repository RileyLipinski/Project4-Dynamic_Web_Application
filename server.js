// Built-in Node.js modules
var fs = require('fs');
var path = require('path');

// NPM modules
var express = require('express');


var public_dir = path.join(__dirname, 'public');

var app = express();
var port = 8000;

app.get('/', (req, res) =>
{
    fs.readFile(path.join(public_dir, "index.html"), (err, data) =>
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(data.toString());
        }
    });
});

app.use(express.static(public_dir));

var server = app.listen(port);
console.log("Now listening on Port: " + port);