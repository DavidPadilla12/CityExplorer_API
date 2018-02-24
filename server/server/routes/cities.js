'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _config = require('../config');

var _utils = require('../utils');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
    return function () {
        var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);var value = info.value;
                } catch (error) {
                    reject(error);return;
                }if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function (value) {
                        step("next", value);
                    }, function (err) {
                        step("throw", err);
                    });
                }
            }return step("next");
        });
    };
}

//Se definen las rutas
//Poder desenglosar las rutas en muchos archivos
var app = _express2.default.Router();
//Hacemos la instancia de la base de datos pasandole los datos de conección del config
var database = new _database2.default(_config.db);

app.get('/cities', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var cities;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return database.connect();

                    case 3:
                        _context.next = 5;
                        return database.getCities();

                    case 5:
                        cities = _context.sent;
                        _context.next = 8;
                        return database.disconnect();

                    case 8:
                        res.status(200).json(cities);
                        _context.next = 14;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](0);

                        (0, _utils.handleError)(_context.t0, res);

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 11]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

// app.get('/one/:id', async(req, res) => {
//     const { id } = req.params;
//     try {
//         await database.connect();
//         const hotel = await database.getHotel(id);
//         await database.disconnect();
//         res.status(200).json(hotel);
//     } catch (error) {
//         handleError(error, res)        
//     }
// });

exports.default = app;