let express = require('express');
let bodyParser = require('body-parser');
let sql = require('mssql');
let app = express();
let db=require('./db');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

 var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

app.get('/sensorData', function (req, res, next) {
    let query = "select * from sensorData where doe=(select max(doe) from sensorData where devId='"+req.query.devId+"')";
    db.query(query,res, function (err, result) {
        if (err) 
            return next(err);
        res.json(result);      
    }); 
});

app.post('/insertData',function (req,res){
    let request= new sql.Request();
    let devId = req.body.devId;
    let temp = req.body.temp;
    let co2 = req.body.co2;
    let co = req.body.co;
    let humidity = req.body.humidity;
    let lpg = req.body.lpg;
    let smoke = req.body.smoke;
    let query = "INSERT INTO sensorData (devId,temp,co2,co,humidity,lpg,smoke,doe) VALUES ('Dev001',"+temp+","+co2+","+co+","+humidity+","+lpg+","+smoke+",convert(datetime,getdate(),5));"
    request.query(query,function(err,result){
        if(err) throw err;
        console.log("inserted");
        res.json({"status":"success"});
    });
});