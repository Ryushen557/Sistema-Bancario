var express = require('express');
var router = express.Router();
var cooperativaController = require('../controllers/cooperativas');

// Mostrar todas las cooperativas y el formulario para agregar una nueva
router.get('/', (req, res) => {
    res.render('cooperativas', { cooperativas: cooperativaController.ObtenerTodasCooperativas() });
});

// Mostrar detalles de una cooperativa específica
router.get('/:id', (req, res) => {
    const cooperativa = cooperativaController.ObtenerDetallesCooperativa(req, res);
    res.render('cooperativa', { cooperativa });
});

// Agregar una nueva cooperativa
router.post('/', (req, res) => cooperativaController.AñadirCooperativa(req, res));

// Agregar un usuario a una cooperativa
router.post('/:cooperativaId/usuarios/:usuarioId', (req, res) => cooperativaController.RelacionarUsuarioConCooperativa(req, res));

// Eliminar un usuario de una cooperativa
router.delete('/:cooperativaId/usuarios/:usuarioId', (req, res) => cooperativaController.EliminarUsuarioDeCooperativa(req, res));

// Mostrar resumen por tipos de cuentas
router.get('/resumen', (req, res) => cooperativaController.ObtenerResumen(req, res));

module.exports = router;
