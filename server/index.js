'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Creamos el servidor
var server = _http2.default.createServer(_app2.default);

//Lo ponemos a escuchar en el puerto que creamos
server.listen(_config.port, function () {
    console.log('Server running at port ' + _config.port);
});