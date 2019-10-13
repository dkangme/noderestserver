//
// Puerto
//
process.env.PORT = process.env.PORT || 3000;

//
// Entorno
//
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//
// Base de datos
//

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb+srv://dbUser:Mies2019!@cluster0-500f0.gcp.mongodb.net/cafe?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
} else {
    urlDB = 'mongodb+srv://dbUser:Mies2019!@cluster0-500f0.gcp.mongodb.net/cafe?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true';
}

process.env.URLDB = urlDB;