// routes/    -> Define las rutas del proyecto y conecta cada ruta con el controlador
// correspondiente.


import { Router } from "express"
import { getAllPostControler , agregarPostControler , actualizarPostControler , eliminarPostControler } from "../src/controllers/postControlers.js";
const router = Router();

router.get('/posts', getAllPostControler);

router.post('/posts', agregarPostControler );

router.put('/posts/like/:id', actualizarPostControler);

router.delete('/posts/:id' , eliminarPostControler)


export default router; 