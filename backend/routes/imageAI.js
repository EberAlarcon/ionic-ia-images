import  express  from "express";
import * as dotenv from "dotenv";

//Importamos la libreria de openai
import { Configuration, OpenAIApi } from "openai";


//Que nos va permitir traer las variables de entorno
dotenv.config()

const router = express.Router();

//Configuracion de OPENAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

//Para crear imagen desde openai
router.route('/').post(async(req, res)=>{
    try {
        const {prompt} = req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n: 4,
            size:'1024x1024',
            response_format: 'b64_json'
        })

        //Para el prefijo de base64
        // 'data:image/jpeg;base64'

        let images = aiResponse.data.data.map(e =>{
        
            return ('data:image/jpeg;base64,' + e.b64_json)
        })

        res.status(200).json({ images })

    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message || 'Algo a salido mal')
        
    }
})

export default router;