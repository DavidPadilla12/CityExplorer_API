'use strict';

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var mongoClient = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID; //Todo id que le pone mongo a los datos,asi que se usa eso y "desemascarar" el ID.
var co = require('co');
var Promise = require('bluebird');

var Db = function () {
    function Db(options) {
        _classCallCheck(this, Db);

        this.options = options;
        this.user = options.user;
        this.pwd = options.pwd;
        this.host = options.host;
        this.port = options.port;
        this.db = options.db;
    }

    //van a recibir un callback por si se resuelve como promesas ahi se manda la respuesta.


    _createClass(Db, [{
        key: 'connect',
        value: function connect(callback) {
            var self = this;
            //Empezamos a usar co
            //recibe una funcion generadora
            var task = co.wrap( /*#__PURE__*/regeneratorRuntime.mark(function connect() {
                return regeneratorRuntime.wrap(function connect$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return mongoClient.connect('mongodb://' + self.user + ':' + self.pwd + '@' + self.host + ':' + self.port + '/' + self.db);

                            case 3:
                                self.connection = _context.sent;
                                _context.next = 10;
                                break;

                            case 6:
                                _context.prev = 6;
                                _context.t0 = _context['catch'](0);

                                console.log("Error");
                                //Retorna una promesa que se resuelve con un error y puede devolver un callback si es que no la resuelven como promesa.
                                //Es mas de soporte para ambos casos.
                                return _context.abrupt('return', Promise.reject(new Error(_context.t0)).asCallback(callback));

                            case 10:
                                self.connected = true;
                                return _context.abrupt('return', Promise.resolve(self));

                            case 12:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, connect, this, [[0, 6]]);
            }));
            return Promise.resolve(task()).asCallback(callback);
        }

        //Metodo para desconectar

    }, {
        key: 'disconnect',
        value: function disconnect(callback) {
            var self = this;
            //Si no está conectado pues se manda un error porque no hay que desconectar
            if (!self.connected) {
                return Promise.reject(new Error('not connected')).asCallback(callback);
            }
            self.connection.close();
            self.connected = false;
            return Promise.resolve(self.connected).asCallback(callback);
        }

        //Vamos a hacer un método que nos pidieron para retornar una lista de hoteles

    }, {
        key: 'getCities',
        value: function getCities(callback) {
            //Vamos a hacer el destruring: traer un campo en específico
            var connected = this.connected,
                connection = this.connection;
            //Si no está conectado pues se manda un error porque no hay que desconectar

            if (!connected) {
                return Promise.reject(new Error('not connected')).asCallback(callback);
            }

            var tasks = co.wrap( /*#__PURE__*/regeneratorRuntime.mark(function getCities() {
                var result;
                return regeneratorRuntime.wrap(function getCities$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                result = null;
                                _context2.prev = 1;
                                _context2.next = 4;
                                return connection.collection('Cities').find({}).toArray();

                            case 4:
                                result = _context2.sent;
                                _context2.next = 10;
                                break;

                            case 7:
                                _context2.prev = 7;
                                _context2.t0 = _context2['catch'](1);
                                return _context2.abrupt('return', Promise.reject(new Error(_context2.t0)));

                            case 10:
                                return _context2.abrupt('return', Promise.resolve(result));

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, getCities, this, [[1, 7]]);
            }));
            return Promise.resolve(tasks()).asCallback(callback);
        }

        //Método para traer un hotel en especi¡ífico
        // getHotel(id, callback) {
        //     //Vamos a hacer el destruring: traer un campo en específico
        //     const { connected, connection } = this;
        //     if (!connected) {
        //         return Promise.reject(new Error('not connected')).asCallback(callback);
        //     }
        //     const tasks = co.wrap(function* getHotel() {
        //         let result = null;
        //         try {
        //             result = yield connection.collection('hotels').findOne({ _id: objectID(id)});
        //         } catch (error) {
        //             return Promise.reject(new Error("Hotel not found"));
        //         }
        //         return Promise.resolve(JSON.parse(JSON.stringify(result))).asCallback(callback);
        //     });
        //     return Promise.resolve(tasks()).asCallback(callback);
        // }

    }]);

    return Db;
}();

module.exports = Db;