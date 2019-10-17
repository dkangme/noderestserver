//
// Puerto
//
process.env.PORT = process.env.PORT || 3000;

//
// Entorno
//
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//
// Vencimiento del Token
//

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//
// Seed
//

process.env.SEMILLA = process.env.SEMILLA || 'este-es-el-seed-desarrollo';

//
// Base de datos
//

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://dbUser:7a7rK2W9tiKej98F@cluster0-500f0.gcp.mongodb.net/cafe?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;