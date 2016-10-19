var http = require('http');
var port = process.env.port || 1337;
var express = require('express');
var app = express();
var contactClass = require("./controllers/contactController");
var contactCrtl = new contactClass();
var bodyParser = require('body-parser');
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));   

//app.use('/api/contact', function (req, res) {
app.use('/api/contact/:id?', function (req, res) {
    console.log("/api/contact:" + req.path.substring(1));
    console.log("id:" + req.params.id);
    console.log(req.body);
    switch (req.method) {
        case "GET":
            contactCrtl.getContact(req.params.id, function (err, dataRec) {
                handleDataReturn(res, req, err, dataRec);
                return;
            });
            break;
        case "PUT":
            contactCrtl.updateContact(req.params.id, req.body, function (err, dataRec) {
                handleDataReturn(res, req, err, dataRec);
                return;
            });
            break;
        case "POST":
            contactCrtl.insertContact(req.body, function (err, dataRec) {
                handleDataReturn(res, req, err, dataRec);
                return;
            });
            break;
        case "DELETE":
            contactCrtl.deleteContact(req.params.id, function (err, dataRec) {
                handleDataReturn(res, req, err, dataRec);
                return;
            });
            break;
        default:
            res.writeHead(500, { "Content-Type": "application/json" });
            var err = { name: "verb_not_implemented", message: "The verb "  + req.method + " was not implemented." };
            res.end(JSON.stringify(err) + "\n");
            break;       


    }  
    
});

app.listen(port, function () {
    console.log('Example app listening on port:' + port);
});

function handleDataReturn(res, req, err, dataRec) {
    console.log('handleDataReturn!');
    if (err) {
        console.log("erro get contact all");
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(err) + "\n");
        return;
    }

    var out = {
        error: null,
        data: { dataRec }
    };
    console.log("sucesso getAll");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(out) + "\n");
}
/*
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);*/
//# sourceMappingURL=server.js.map