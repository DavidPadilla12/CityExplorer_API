import http from 'http';
import app from './app';
import { port } from './config';

//Creamos el servidor
const server = http.createServer(app);

//Lo ponemos a escuchar en el puerto que creamos
server.listen(port, () => {
    console.log(`Server running at port ${port}`);
})