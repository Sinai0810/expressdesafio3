// models/    -> Contiene funciones que interactúan con la base de datos 
// (consultas, inserciones, actualizaciones, eliminaciones).

import pg from 'pg';
import dotenv from 'dotenv';
import { asyncWrapProviders } from 'async_hooks';
dotenv.config();

const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;
// ================== CONEXION POSTGRES ==================

console.log('Conectando a la base de datos...');

const pool = new pg.Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    allowExitOnIdle: true
});

// Obtener todos los posts ==GET==
export const getPostsModel =  async () => {
const { rows } = await pool.query ('SELECT * FROM posts') ; 
    console.log (rows);
    return rows; 

}


// Agregar un nuevo post ==POST==
 export const agregarPostModel = async (titulo, img, descripcion, likes ) => {
 try {
  const consulta = 
  'INSERT INTO posts (titulo,img,descripcion,likes) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [titulo, img, descripcion, likes];
    const { rows } = await pool.query(consulta, values);
    return rows[0]; // Devuelve el post agregado
 }
 catch (error) {
    console.error ('Error al agregar post:', error);
 }
 };

 // agregarPost('segundo post', 'imagen2.jpg', 'post desde expresss', 5);   



 // Dar like a un post ==PUT==

export const actualizarPostModel =  async (id) => {
    try {
    const consulta = 'UPDATE posts SET likes = likes +1 WHERE id = $1 RETURNING*';
    const values = [id];
    const {rows} = await pool.query (consulta,values);
    console.log (rows);
    return rows[0]; // devuelve el post actualizado
    }
    catch (error) {
        console.log ('Error al dar like:', error);
        res.status (500).send ('Error al dar like'); // Envía un error si falla la actualización    
    }
};


// eliminar ppst ==DELETE==

export const eliminarPostModel = async (id) => {
    try {
        const consulta = ' DELETE FROM posts WHERE id = $1 RETURNING * ' ; 
        const values = [id];
        const {rows} = await pool.query (consulta,  values);
        console.log (rows);
        return rows[0]; // Devuelve el post eliminado
}
catch (error){ 
        console.log ('Error al eliminar el post:', error);
        res.status(500).send('Error al eliminar el post'); // Envía un error si falla la eliminación

    }

};

 export default pool;
