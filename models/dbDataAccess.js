var mysql = require("mysql");
// config for your database
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '*****',
    database: 'dbcontact'
});

function dataAccess() {


    this.execSelect = function(table,params,callback) {

        console.log("exec sql execQuery from dataAccess");       
       
        var strQuery = "SELECT * FROM " + table;
        var strWhere = "", strOper = "";
        if (params != null) {
            for (var itemParam in params) {
                strWhere += strOper + itemParam + "='" + params[itemParam] + "'";
                strOper = " AND ";
            }

            strQuery = strQuery  + " WHERE " +  strWhere;
        }
        console.log("query: " + strQuery);
        executeQuery(strQuery, callback);       
          
    }

    this.execUpdate = function (table, data, params, callback) {

        console.log("exec sql execQuery from dataAccess");

           var strCommand = "UPDATE " + table;
            var strWhere = "", strOper = "", strSET = "", strComma= "";
            if (data != null) {
                for (var itemData in data) {
                    if (data[itemData] != null) {
                        strSET += strComma + itemData + "='" + data[itemData] + "'";
                        strComma = ", ";
                    }
                }               
            }
            if (data == null || strSET.length ==0) {
                var err = { name: "update_set_missing", message: "The data for update was not provided." };
                callback(err);
                return;
            }
            
            if (params != null) {
                for (var itemParam in params) {
                    strWhere += strOper + itemParam + "='" + params[itemParam] + "'";
                    strOper = " AND ";
                }

                strCommand = strCommand + " SET " + strSET + " WHERE " + strWhere;
            }
            else {
                var err = { name: "update_where_missing", message: "The param for where update was not provided." };
                callback(err);
                return;
            }
            console.log("Command: " + strCommand);
            executeNonQuery(strCommand, callback);
           
    }

    this.execDelete = function (table, params, callback) {

        console.log("exec sql execDelete from dataAccess");        
        
        var strCommand = "DELETE FROM " + table;
        var strWhere = "", strOper = "";
        if (params != null) {
            for (var itemParam in params) {
                strWhere += strOper + itemParam + "='" + params[itemParam] + "'";
                strOper = " AND ";
            }

            strCommand = strCommand + " WHERE " + strWhere;
        }
        else {
            var err = { name: "delete_where_missing", message: "The param for where delete was not provided." };
            callback(err);
            return;
        }
        console.log("Command: " + strCommand);
        executeNonQuery(strCommand, callback);

            
    }
    
    this.execInsert = function (table, data, callback) {

                console.log("exec sql execDelete from dataAccess");

                var strInsert = "INSERT INTO " + table;
                var strCommand = "", strColumns = " (",  strValues = " VALUES (", strComma = "";
                 if (data != null) {
                    for (var itemData in data) {
                        if (data[itemData] != null) {
                            strColumns += strComma + itemData;

                            strValues += strComma + "'" + data[itemData] + "'";
                            strComma = ", ";
                        }
                    }
                    strColumns += ") ";
                    strValues += ") ";
                }
                else{
                    var err = { name: "data_insert_missing", message: "The data was not provided." };
                    callback(err);
                    return;
                }
               strCommand = strInsert + strColumns + strValues;
                console.log("Command: " + strCommand);
                executeNonQuery(strCommand, callback);


    }

    function executeNonQuery(strCommand, callback){
        connection.query(strCommand, function (err, result) {

            if (err) {
                callback(err);
                return;
            }

            callback(null, { rowsAffected:result.affectedRows });
        });
    }

    function executeQuery(strQuery, callback) {

        connection.query(strQuery, function (err, recordset) {

            if (err) {
                callback(err);
                return;
            }

            callback(null, recordset);
        });
    }
      
}
module.exports = dataAccess;