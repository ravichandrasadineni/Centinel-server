var config = require("../config.json");
module.exports = {
    "url" : config.dbconfig.url +":" + config.dbconfig.port +"/" +config.dbconfig.collection
}