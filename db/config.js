// config.js  -> Configura la conexión a la base de datos (pool) y exporta la conexión.

import pg from 'pg';
import dotenv from 'dotenv';
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

export default pool