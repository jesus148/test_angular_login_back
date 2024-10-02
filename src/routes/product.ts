

import { Router } from "express";
//llama al controlador
import {getProduct} from '../controllers/product';
import validateToken from "./validate-token";


// recordar q este routes se usara en el server 


// para routear
const router= Router(); 

// http://localhost:3001/api/products  --post
//  > authorization > 
//   auth type > bearer token > token > pon el token
// validateToken : protegera esta endpoint cadavez q se solicite esto
// > primero se ejecuta el validatetoken luego el getproduct
router.get('/' , validateToken, getProduct);

export default router;