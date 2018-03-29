var sql = require("mssql");

// Setup for Azure SQL Server
var config = {
    user: "AndroPi",
    password: "Flyingfish@002",
    server: "robertbosch-andropi-iot.database.windows.net",
    database: "AndroPiSQL",

    // As per the npm docs, encrypt=true for Azure connections
    options: {
        encrypt: true
    }
};

module.exports.query=function(query, res, callback){
   sql.connect(config, function(err) {
      if(err) throw err;
      console.log(query);
      new sql.Request().query(query, function (err, result){
         if(err) throw err;
         console.log(result.recordset);
         res.json(result.recordset);
      });

   });
}