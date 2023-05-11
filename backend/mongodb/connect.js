import mongoose from "mongoose";

const connectDb = (url) =>{
    mongoose.set('strictQuery', true);
    mongoose.connect(url)
    .then(()=>console.log('Conexion Existosa'))
    .catch(() => console.log('Fallo en la conexion'))
}

export default connectDb