

// esto es para el puerto extra .env
import dotenv from 'dotenv';

import Server from "./models/server";


// Este file se ejecuta osea ejecuta todo EL PORYECTO 
// importa el server
//    > npm run dev  (comando para ejecutar )



// configiguramos dotenv > esto usara el puerto .env
dotenv.config();


// llamas a clase q inicia la conexion
const server = new Server();


// server.listen();