//
// Verificar Token
//

let jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEMILLA, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = decoded.usuario;

        next();
    })

};

//
// Verifica adminRole

let adminRole = (req, res, next) => {

    if (req.usuario.rol === 'ADMIN_ROLE') {

        next();

    } else {

        return res.status(401).json({
            ok: false,
            mensaje: 'Usuario no es administrador'
        })
    }

}

module.exports = {
    verificaToken,
    adminRole
}