    /**
    * Created by ravichandrasadineni on 1/9/15.
    */


    var http = require('http');
    var fs = require('fs');
    var express = require('express');
    var iniparser = require('iniparser');
    var moment = require('moment');
    var app = express();

    app.use(express.logger({
        format: ':date :remote-addr :url :method :status :response-time',
        stream : fs.createWriteStream('./Logs/' + moment(Date.now()).format("YYYY-MM-DD HH:mm").toString() + '.log', {'flags': 'w'})
    }));
    app.set("view engine", 'jade');
    app.set('views', './views');
    app.use(express.static('./public'));
    app.use(express.static('./files'));
    app.use(express.static('./downloads'));
    app.use(app.router);


    app.use(express.errorHandler());
    var config = iniparser.parseSync('./config.ini');
    var routes = require('./routes')(app);
    http.createServer(app).listen(config.port, function() {
        console.log('Express app started');
    });



