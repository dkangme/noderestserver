const express = require('express')
const app = express()
const Usuario = require('../models/usuario');
const { verificaToken, adminRole } = require('../middlewares/autenticacion')
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.get('/usuario', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;

    desde = Number(desde);
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email rol estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuarios
                });
            })


        })


})

app.post('/usuario', [verificaToken, adminRole], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol
    });


    usuario.save((error, usuarioDB) => {

        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

})

app.put('/usuario/:id', [verificaToken, adminRole], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'rol', 'estado']);


    Usuario.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })

        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });


    })
})

app.delete('/usuario/:id', [verificaToken, adminRole], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    body.estado = false;

    Usuario.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario no encontrado'
            });

        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    })

})

// app.delete('/usuario/:id', function(req, res) {

//     let id = req.params.id;
//     Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }

//         if (usuarioBorrado === null) {
//             return res.status(400).json({
//                 ok: false,
//                 message: 'Usuario no encontrado'
//             });

//         }
//         res.json({
//             ok: true,
//             usuario: usuarioBorrado
//         });

//     })

// })

module.exports = app;