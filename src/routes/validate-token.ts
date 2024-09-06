
// esto protegera una ruta al componente products

import {Request ,  Response , NextFunction} from 'express';
import jwt from 'jsonwebtoken';





// next :NextFunction : si todo esta ok ejecutara el endpoint getProduct en el routes product
const validateToken =(req : Request , res : Response , next :NextFunction) =>{

    // obteniendo el token del cliente , del header . extra del rest
    const headerToken = req.headers['authorization']
    // console.log(`${headerToken}`);

    // verificando q exista el token y que q sea un Bearer
    if(headerToken != undefined && headerToken.startsWith('Bearer')){
        // controlando errores
        try{
            //separando el Bearer del token , quiero solo el token , > pos(7) 
            const bearerToken = headerToken.slice(7);
        
            // verificando el token del cliente , atraves de la firma 
            // verifica q el token no haya expirado y no este corrupto
            jwt.verify(bearerToken , process.env.SECRET_KEY ||  'realmadrid123')
            next();            
        }catch(error){
            res.status(401).json({
                msg:'token no valido'
            })
        }
        // si esta vacio y no hay token 
    }else{
        res.status(401).json({
            msg:'acceso denegado'
        })
    }


}


export default validateToken;




// probando en el postman
// > http://localhost:3001/api/products --- post
// > authorization
// > auth type > bearer token  
//    > token > pega el token q te da al logearte

// bearer >
// Bearer Token: Es un token que se usa para autenticar y autorizar solicitudes. El portador del token tiene acceso a los recursos protegidos.