
// clase Server que encapsula la lógica para crear y lanzar un servidor Express en el puerto 3000. Al instanciar esta clase y llamar al método listen(), el servidor comenzará a escuchar conexiones entrantes y mostrará un mensaje en la consola.



// instalar dependencia para usar el .ts con el express
// express: Es el paquete principal que estás utilizando para crear y gestionar un servidor web en Node.js.
// Application: Es un tipo proporcionado por @types/express que representa una instancia de una aplicación Express.
import express , {Application} from 'express';


// routes pa mapear los rest
import routesProduct from '../routes/product';
import user from '../routes/user';
import { Product } from './product';
import sequelize from '../db/connection';
import { User } from './user';
import cors from 'cors';


// clase 
 class Server{


    // pa reasignar     
    private app : Application; // instancia de la aplicación Express.
    private port : string;


    // constructor inicia 
    // ejecuta en orden cronologico
    constructor(){
        // el app sera un proyecto de express
       this.app = express();

       //le dara el puerto ya sea el string de arriba osea el personalizado  o el .env para produccion
       this.port =  process.env.PORT ||'3000';                                                                                     
       this.listen(); //llama escuchar el puerto solo usar 1 vez este metodo
       console.log(process.env.PORT);



    //    para convertir la data del request o clientes
    // debe estar antes 
       this.midlewares();

    //    ejecuta el router
       this.routes();

    //    llama a la conexion
    // al final pq todo lo arriba debe estar listo antes
       this.dbConnect();
    }


    // ejecuantando el puerto 
    listen(){                          // 2 funcion se ejecuta cuando inicia el servidor 
        this.app.listen(this.port , () => {
            console.log('aplicacion en el puerto ' + this.port);
        })
    }




    // ejecuta los rest  , esto llama a los routes
    routes(){
            // http://localhost:3001/api/products (ruta del rest )
        this.app.use('/api/products' , routesProduct)


        this.app.use('/api/users' , user)

        
    }



    //parsear la data q viene del cliente osea a formato json
    midlewares(){
        //parse al body 
        this.app.use(express.json());
          // Cors
          this.app.use(cors());

    }



    // conexion a bd
    async dbConnect(){
        try{
        //   await sequelize.authenticate(); -- esto es para autenticar


        // EJECUTANDO LAS TABLAS 
        // con este codigo cuanbo se ejecuta la conexion en bd , se crea un tabla Products(product) en plural 
        // con esto crea la tabla dentro de la bd , si ya existe no hace nada
        await Product.sync();
        await User.sync();

          console.log(  'connection de la base de datos');
        //   si hay 1 error
        }catch( error){
            console.error('unable to connect' , error);
        }
    }








}


// exportacion por default
// permitiendo que otros archivos la importen y utilicen.
export default Server;