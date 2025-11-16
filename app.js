// app.js     -> Configura el servidor Express, middlewares, motor de vistas y conecta las rutas.

import express from 'express';
import cors from 'cors';
import morgan from 'morgan'; 
import postRoutes from './routes/postRoutes.js';


const PORT = process.env.PORT || 3000;
const app = express();

// ================== MIDDLEWARE ==================
app.use(cors()); //Permite que el front haga peticiones al backend 
app.use(express.json()); //permite leer JSON del body de las peticiones
app.use(morgan('dev')); //muestra en consola las peticiones que llegan al servidor
app.use('/', postRoutes); // Rutas para manejar posts


// ================== RUTA RAÍZ ==================
app.get("/", (req, res) => {
    res.send('Desafio Express 3');
});

// ================== LEVANTAR SERVIDOR ==================
app.listen(PORT, () => {
    console.log(`Servidor encendido en http://localhost:${PORT}`);
});




