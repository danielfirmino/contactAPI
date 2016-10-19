var dbDataAccessClass = require("./dbDataAccess");
var sqlDataAccess = new dbDataAccessClass();
var tableName = "tbContact";
function contactEntity() {
    this.idContact = 0;
    this.contacName = "";
    this.phone = "";
    this.email = "";   

    this.getAll = function (callback) {
        console.log("getAll model contact");
        sqlDataAccess.execSelect(tableName, null, callback);
    };

    this.get = function (idContact, callback) {
        console.log("get model contact");
        sqlDataAccess.execSelect(tableName, { idContact: idContact }, callback);
    };

    this.update = function (idContact, contact, callback) {
        console.log("update model contact");
        sqlDataAccess.execUpdate(tableName, contact, { idContact: idContact }, callback);
    };

    this.delete = function (idContact, callback) {
        console.log("delete model contact");
        sqlDataAccess.execDelete(tableName, { idContact: idContact }, callback);
    };

    this.insert = function (contact, callback) {
        console.log("insert model contact");
        sqlDataAccess.execInsert(tableName, contact, callback);
    };
}

module.exports = contactEntity;

