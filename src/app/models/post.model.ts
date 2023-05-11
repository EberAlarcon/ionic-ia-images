
//Creamos la interfaz que al inicio de la ID no la va a tener pero cuando se crea si 
// --------------MODELO DEL USUARIO-----------
export interface Post{
    _id?: string,
    name: string,
    prompt: string,
    images: string[]

}