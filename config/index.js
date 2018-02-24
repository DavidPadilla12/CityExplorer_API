//Consulta en el ambiente del servidor si hay un puesto sino, pone el 3000
export const port = process.env.PORT || 3000;
export const db = {
    user: 'jpadilla',
    pwd: '123456',
    host: 'ds241668.mlab.com',
    port: '41668',
    db: 'cityexplore'
}