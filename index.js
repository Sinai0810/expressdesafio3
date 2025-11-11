import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
import morgan from 'morgan'; 
import { getPosts,agregarPost } from './consultas.js';


const PORT = process.env.PORT || 3000; // Puerto en el que correrá el servidor
const app = express();

// ================== MIDDLEWARE ==================
app.use(cors()); //Permite que el front haga peticiones al backend 
app.use(express.json()); //permite leer JSON del body de las peticiones
app.use(morgan('dev')); //muestra en consola las peticiones que llegan al servidor


// ================== RUTA RAÍZ ==================
app.get("/", (req, res) => {
    res.send('Desafio Express 3');
});

// ================== LEVANTAR SERVIDOR ==================
app.listen(PORT, () => {
    console.log(`Servidor encendido en http://localhost:${PORT}`);
});


app.get('/posts', async (req,res) => {
    const posts = await getPosts(); // Llama a la función para obtener los posts
    res.json(posts); // Envía los posts como respuesta en formato JSON
})

app.post('/posts' , async (req,res) => {
    const {titulo, img, descripcion} = req.body;
    try {
        const nuevoPost = await agregarPost(titulo, img, descripcion, 0);
        res.status(201).json(nuevoPost);

    }
    catch (error) {
        console.log('Error al agregar post:', error);
        res.status(500).send('Error al agregar post');

    }
}); 