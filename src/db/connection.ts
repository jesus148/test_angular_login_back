import { Sequelize } from "sequelize";



// la conexion
// 'rrhh' : la bd
// 'root', 'admin123' : usuario y contraseña
const sequelize = new Sequelize('rrhh', 'root', '1977', {
    host: 'localhost',  //host local
    dialect: 'mysql',     //la bd
});


// export
export default sequelize;