
import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

// definiendo la tabla modelo user 
//  lo pondra en plural en users
export const User = sequelize.define('user', {
    // tipos de datos en los atributos
    id: {
        type: DataTypes.INTEGER,
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
}, )