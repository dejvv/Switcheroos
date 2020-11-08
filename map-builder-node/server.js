var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8080;

// Serve static files
app.use(express.static(__dirname + '/public'));

// app.get('/', function(req,res){
//     res.sendfile(__dirname + '/public/index.html');
// }); 
app.get('/create', function(req,res){
    res.sendFile(__dirname + '/public/createmaps.html');
}); 
app.get('/get', function(req,res){
    res.sendFile(__dirname + '/public/prebuildmaps.html');
}); 

app.get('/index2', function(req,res){
    res.sendFile(__dirname + '/public/index1.html');
}); 
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });
// app.get('/create', function(req, res) {
//     res.sendFile(path.join(__dirname + '/resources/routes/createmaps.html'));
// });

// app.get('/get', function(req, res) {
//     res.sendFile(path.join(__dirname + '/resources/routes/prebuildmaps.html'));
// });


// Serve your app
console.log('Served: http://localhost:' + port);
app.listen(port);