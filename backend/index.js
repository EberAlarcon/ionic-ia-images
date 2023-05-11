import  express  from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import imageAI from "./routes/imageAI.js";
import postRoutes from "./routes/postRoutes.js";


// import mongoose from "mongoose";
import connectDb from "./mongodb/connect.js";

//Que nos va permitir traer las variables de entorno
dotenv.config()

//Crear servidor de express
const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}));

//Para que funcione
app.get('/', async (req, res)=>{
    res.status(200).json({
        message: 'API OPEN_AI'
    })
})


app.use('/api/v1/imageai', imageAI);
app.use('/api/v1/posts',postRoutes);

//Funcion para iniciar el servidor
const startServer = ()=>{
    try {
        connectDb(process.env.MONGODB_URL)
        app.listen(8080, () => console.log('El servidor esta corriendo por el puerto http://localhost:8080'))
    } catch (error) {
        
    }
}

startServer();