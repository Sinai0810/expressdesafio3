// controllers/ -> Contiene funciones que reciben las peticiones de rutas, 
// llaman a los modelos y deciden qué enviar a la vista o respuesta.

import { getPostsModel, agregarPostModel , actualizarPostModel , eliminarPostModel } from "../models/postModel.js"
 
 //obtener todos los posts ==GET==
 export const getAllPostControler =  async (req,res) => {
    try  {
       const posts = await getPostsModel(); // Llama a la función para obtener los posts
       res.json(posts); // Envía los posts como respuesta en formato JSON
     }
     catch (error) {
        console.log('Error al obtener posts:', error); 
        res.status(500).send('Error al obtener posts');// Envía un error si falla la consulta
     }
   
};

// agregar un nuevo post ==POST==
export const agregarPostControler = async (req,res) => {
    try {
        const {titulo, img, descripcion} = req.body; // Extrae los datos del cuerpo de la petición
        const nuevoPost = await agregarPostModel(titulo, img, descripcion, 0); // Llama a la función para agregar un nuevo post
        res.status(201).json(nuevoPost); // Envía el post agregado como respuesta en formato JSON

    }
    catch (error) {
        console.log('Error al agregar post:', error); 
        res.status(500).send('Error al agregar post');// Envía un error si falla la inserción

    }
}; 

// dar like a un post ==PUT==

export const actualizarPostControler = async ( req,res ) => {
    try {
        const {id} = req.params; // Extrae el id del post de los parámetros de la ruta
        const postActualizado = await actualizarPostModel(id); // Llama a la función para actualizar el post
        res.status(200).json(postActualizado); // Envía el post actualizado como respuesta en formato JSON
    }
    catch (error){
        console.log("Error al dar likes :" , error);
        res.status(500).json("Error al dar like" , error); // Envía un error si falla la actualización
    }
};

// eliminar post ==DELETE==

export const eliminarPostControler = async (req,res) => {
    try {
        const {id} = req.params; // Extrae el id del post de los parámetros de la ruta
        const postEliminado = await eliminarPostModel(id); // Llama a la función para eliminar el post
        res.status(200).json(postEliminado); // Envía el post eliminado como respuesta en formato JSON
    }

    catch (error) {
        console.log("Error al eliminar le post:", error);
        res.status(500).json("Error al eliminar el post:", error); // Envía un error si falla la eliminación
    }
}