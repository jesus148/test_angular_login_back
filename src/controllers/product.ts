


// importar el request y el response solo eso 
import {Request , Response} from  'express';
import { Product } from '../models/product';


// METODO Q ES LLAMDAO DEL LA DIRECCION DEL REST OSEA cuando llames una direccion rest 
// esto se ejecutara

export const getProduct =  async ( req :Request , res : Response) =>{
    
    
    // metodo de la tabla modelo listara todo
    const   listProduct = await Product.findAll();

    // res.json({
    //     msg :"get products"
    // })

    // envio al cliente
    res.json(listProduct)
}   