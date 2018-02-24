import express from 'express';
import Db from '../database';
import { db } from '../config';
import { handleError } from '../utils';

//Se definen las rutas
//Poder desenglosar las rutas en muchos archivos
const app = express.Router();
//Hacemos la instancia de la base de datos pasandole los datos de conección del config
const database = new Db(db);

app.get('/cities', async (req, res) => {
    try {
        await database.connect();
        const cities = await database.getCities();
        await database.disconnect();
        res.status(200).json(cities);
    } catch (error) {
        handleError(error, res);
    }
});

export default app;