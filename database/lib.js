const mongoClient = require('mongodb').MongoClient;
const objectID = require('mongodb').ObjectID;
const co = require('co');
const Promise = require('bluebird');

class Db {
    constructor(options) {
        this.options = options;
        this.user = options.user;
        this.pwd = options.pwd;
        this.host = options.host;
        this.port = options.port;
        this.db = options.db;
    }

    // Se permite recibir un callback por si se resuelve como promesas.
    connect(callback) {
        const self = this;
        //recibe una funcion generadora
        const task = co.wrap(function* connect() {
            try {
                //En funcion generadora tenemos yield que es como el await los cuales nos permiten hacer una espera hasta obtener la respuesta.
                //Se usa literalString
                self.connection = yield mongoClient.connect(`mongodb://${self.user}:${self.pwd}@${self.host}:${self.port}/${self.db}`);
            } catch (error) {
                console.log("Error");
                //Retorna una promesa que se resuelve con un error y puede devolver un callback si es que no la resuelven como promesa.
                //Es mas de soporte para ambos casos.
                return Promise.reject(new Error(error)).asCallback(callback);
            }
            self.connected = true;
            return Promise.resolve(self);
        });
        return Promise.resolve(task()).asCallback(callback);
    }
    
    //Metodo para desconectar
    disconnect(callback) {
        const self = this;
        //Si no está conectado pues se manda un error porque no hay que desconectar
        if (!self.connected) {
            return Promise.reject(new Error('not connected')).asCallback(callback);
        }
        self.connection.close();
        self.connected = false;
        return Promise.resolve(self.connected).asCallback(callback);
    }


   //Método para retornar lista de ciudades.
    getCities(callback){
        //Vamos a hacer el destruring: traer un campo en específico
        const { connected, connection} = this;
        //Si no está conectado se manda un error porque no hay que desconectar
        if (!connected) {
            return Promise.reject(new Error('not connected')).asCallback(callback);
        }
        
        const tasks = co.wrap(function* getCities() {
            let result = null;
            try {
                result = yield connection.collection('Cities').find({}).toArray();
            } catch (error) {
                return Promise.reject(new Error(error));
            }
            return Promise.resolve(result);
        });
        return Promise.resolve(tasks()).asCallback(callback);
    }
}

module.exports = Db;