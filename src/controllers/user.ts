

// importar el request y el response solo eso 
import { Request , Response} from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';


// recordar q de aca se usara en el routest







// // CREACION USUARIO
// http://localhost:3001/api/users --- POST 
//  body > raw > json 
// {
//     "nombre":"jesus",
//     "password":"12234"
// }
export const  newUser = async ( req : Request , res: Response ) =>{


    // obtiene la data del usuario 
    const { username , password } = req.body;


    // verificar si existe el usuario 
    // esto es como un select * from where
    const user = await User.findOne({where : { username : username}})
    if(user){
        // si existe rompe el ciclo y se queda aca 
      return  res.status(400).json({
            msg : `ya existe un usuario con el nombre ${username} `
        })

    }



    // hashear el password para almacenar en la bd
    // (password , 10) : el 10 es un valor , + alto sera mas seguro pero mas lento 
    // cada contraseña hasheada sera unica
    const hashedPassword = await bcrypt.hash(password , 10);
    console.log(hashedPassword);



    // verificando errores 
    try {
        // Guardarmos usuario en la base de datos
        await User.create({
            username: username,
            password: hashedPassword
        })
    
        // repondiendo al usuario 
        res.json({
            msg: `Usuario ${username} creado exitosamente!`
        })
        // si hay error 
    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }

}













// entrar o el login
// http://localhost:3001/api/users/login
// {
//     "nombre":"jesus",
//     "password":"admin1234"
// }
export const  loginUser = async ( req : Request , res: Response ) =>{

    // obtenemos data del cliente
    const {username , password} = req.body;


    // verificamos si existe en la bd
    // ponemos any pq cualqier tipo de dato o si no usar un clase modelo
    const user: any = await User.findOne({where : { username : username}})
    if(!user){
        return res.status(400).json({
            msg:`no existe un usuario en la bd con el nombre ${username}`
        })
    }

    // validamos el password
    const passwordValid = await bcrypt.compare( password, user.password);
    if(!passwordValid){
        return res.status(400).json({
            msg:`password incorrecta`
        })
    }


    // generamos el token para lo use en futuras solicitudes.
    // pa enviar al cliente 
    const token = jwt.sign({
        username : username, //info del usuario o payload ,no poner datos confidenciales

        // clave secreta > or > .env(si no lo encuentra el otro el 2)
        // clave secreta para asegurar que no pueda ser modificado por nadie más y desde q fue creado
        // esta firma garantiza el token 
    } , process.env.SECRET_KEY ||  'realmadrid123',{
               expiresIn:  '10000'  //token enviado durara solo 10 seg(jugar con eso)
    });



        // datos de regreso al cliente 
    res.json({
        // > https://jwt.io/ 
        //  copia el token del response > y pegalo en el encode
        token
    })

}







// EXTRAS
// token : Una vez generado el token, este se envía al cliente (por ejemplo, el navegador web del usuario) después de un inicio de sesión exitoso. El cliente guardará este token y lo enviará al servidor en futuras solicitudes, generalmente en un encabezado Authorization, para que el servidor sepa que el usuario está autenticado.
// Cómo Usa el Cliente el Token?
// Cada vez que el cliente hace una solicitud a una parte protegida de la aplicación (como ver información de su cuenta), incluye el token en la solicitud.
// El servidor recibe el token, lo verifica usando la misma clave secreta, y si el token es válido (no ha sido alterado y no ha expirado), permite al usuario acceder a los recursos protegidos.