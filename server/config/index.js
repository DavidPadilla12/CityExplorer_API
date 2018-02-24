'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//Consulta en el ambiente del servidor si hay un puesto sino, pone el 3000
var port = exports.port = process.env.PORT || 3000;
var db = exports.db = {
    user: 'jpadilla',
    pwd: '123456',
    host: 'ds241668.mlab.com',
    port: '41668',
    db: 'cityexplore'
};