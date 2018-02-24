import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { cities } from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.unsubscribe(cors());

//Hay que decirle que hacer con esa ruta.
app.use('/api/cityexplorer', cities);



export default app;