import pg from 'pg';
import dotenv from 'dotenv';// Cargar variables de entorno desde el archivo .env
dotenv.config();

// ================== CONEXION POSTGRES ==================

console.log('Conectando a la base de datos...');

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    allowExitOnIdle: true
});


 export const agregarPost = async (titulo, img, descripcion, likes ) => {
 try {
  const consulta = 
  'INSERT INTO posts (titulo,img,descripcion,likes) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [titulo,img,descripcion, likes];
    const {rows} = await pool.query(consulta, values);
    return rows[0]; // Devuelve el post agregado
 }
 catch (error) {
     console.error ('Error al agregar post:', error);
 }
 };


// agregarPost('segundo post', 'imagen2.jpg', 'post desde expresss', 5);   


export const getPosts =  async () => {
const {rows} = await pool.query ('SELECT * FROM posts') ; 
     console.log (rows);
    return rows; 

}
 getPosts();

