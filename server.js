/*
* @Author: steve
* @Date:   2016-05-12 06:34:30
* @Last Modified by:   steve
* @Last Modified time: 2016-05-12 06:35:02
*/

var connect = require('connect');
var serveStatic = require('serve-static');
var port = (process.env.VCAP_APP_PORT || 8000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
connect().use(serveStatic(__dirname)).listen(port,host);
