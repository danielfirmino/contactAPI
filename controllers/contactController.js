var dbContactClass = require("../models/dbContact");
var db = new dbContactClass();

function contactController() {
    this.data = null;
    this.emailTo = "";


    this.getContact = function (idContact, callback) {
        console.log("contact module, getContact method. idContact = " + idContact);

        if (idContact) {
            validateContactID(idContact, function (err) {
                if (err) {
                    callback(err);
                    return;
                }
                else {                    
                    db.contact.get(idContact, callback);
                }
            });                
        }
        else {
            db.contact.getAll(callback);
        }
    };

    this.updateContact = function (idContact, contact, callback) {
        validateContactID(idContact, function (err) {
            if (err) {
                callback(err);
                return;
            }
            else {
                console.log("contact module, updateContact method. id = " + idContact);
                db.contact.update(idContact, contact, callback);
            }
        });        
    };

    this.insertContact = function (contact, callback) {
        console.log("contact module, insert");
        db.contact.insert(contact, callback);        
    };      

    this.deleteContact = function (idContact, callback) {
        validateContactID(idContact, function (err) {
            if (err) {
                callback(err);
                return;
            }
            else {
                console.log("contact module, deleteContact method. id = " + idContact);
                db.contact.delete(idContact, callback);
            }
        });       

    };

    function validateContactID(idContact, callback) {
        if (isNaN(idContact)) {
            var err = { name: "invalid_param", message: "IdContact: It was not provided a valid Id Contact.  Please inform a number." };
            callback(err);
            return;
        }
        callback(null);

    }
}

module.exports = contactController;
