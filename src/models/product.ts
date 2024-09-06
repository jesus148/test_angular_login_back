

// importando la conexion
import sequelize from '../db/connection';

// para definir los tipos de datos
import {DataType, DataTypes} from 'sequelize';

// sequelize :
// Sequelize es una biblioteca que le permite interactuar con varias bases de datos SQL utilizando JavaScript. Simplifica el proceso de creación, consulta, actualización y eliminación de datos de las tablas. En este artículo, aprenderá cómo usar Sequelize ORM en Node. hay 2 formas de definir un modelo en este usaremos el Calling sequelize.define(modelName, attributes, options)


// INICIANDO LA CLASE MODELO con sequelize 
// (https://sequelize.org/docs/v6/core-concepts/model-basics/) documentacion 
// Data Types > buscar en la documentacion 


                //    definiendo la tabla 
                // en la bd lo pondra en plural
export const Product = sequelize.define('product',{
//   definiendo los campos  o lo atributos
    id:{
        type: DataTypes.INTEGER,  //int
        primaryKey : true, //llave primaria
        autoIncrement : true //autoincrementad
    },
    name :{
        type:DataTypes.STRING //string
    },
    description:{
        type:DataTypes.STRING//string
    }

    // recordar q cuando se ejecuta se agregarn 2 campos auto 
    // > createdAt 
    // > updatedAt 
    //  para mapear lo hace el sequilize



} 
// con esto al usar sequilize el nombre se mantiene
// documentacion(https://sequelize.org/docs/v6/core-concepts/model-basics/)
// ,  {
//     freezeTableName: true,
//   }
);