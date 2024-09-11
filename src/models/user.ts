
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

// definiendo la tabla modelo user 
//  lo pondra en plural en users
export const User = sequelize.define('user', {
    // tipos de datos en los atributos
    //el id es autogenerado es automatico no ingresar
    id: {
        type: DataTypes.INTEGER, //tipos de datos 
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,  //unico no debe repetirse
        allowNull: false //no permite valores null  
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
} )

// se crean 2 campos extras createAt , updateAt para mapear los registros y actualizaciones 