

LIBRERÍAS A UTILIZAR
--Sirve para copiar textos estaticos en la APP
  -- npm i @capacitor/clipboard

--Sirve para almacenar las imagenes dentro del dispositivo
  --npm i @capacitor/filesystem

-- Nos permite compartir las imagenes a traves de nuestra redes sociales
  -- npm i @capacitor/share

-- Para que no de error de tipado y la otra permite guardar archivos solamente desde la web
  -- npm i file-saver @types/file-saver

Para crear paginas
  ionic g page pages/home
  ionic g page pages/create-images
  ng g m pages/home --routing
  ng g m pages/create-images --routing

Para crear modulos (Nos permitira importar elementos que pueden ser componenetes)
  ionic g module shared 

Para crear componetes
ionic g c shared/header
ionic g c shared/post-detail

Arreglamos el archivo principal 
app.routes.ts  ->loadChildren

Arreglamos el archivo create-images-routing.module.ts
home-routing.module.ts

Instalar la dependencia de capacitor androidy ios
npm i @capacitor/android
npm i @capacitor/ios

Para compilar la app
ionic build

Para android
npx cap add android

Para abrir la app en android studio
npx cap open android








-------------------BACKED----------------
Instalar el package.json
 npm init -y

Descargar las librerias necesarias para hacer el servidor
  npm i express cors dotenv mongoose nodemon openai cloudinary

En el package.json agregamos la linea de codigo:
      "type": "module",
  "scripts": {
    "start": "nodemon index"
  },

Creamos una carpeta routes y dentro de ella creamos un archivo imageAI.js que relaciona las iamgenes con tiempo real


eB2ejA7ZzZts7ooJ

---------------NOTAS------------------
CAMBIAR LOS MENSAJES EN EL ARCHIVO CREATE-IMAGES.PAGES.TS Y TAMBIEN EN EL ARCHIVO POST-DETAIL.COMPONENT.TS (PUBLICANDO-GENERANDO)