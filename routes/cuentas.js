var express = require('express');
var router = express.Router();
var cuentaController = require('../controllers/cuentas');

// Añadir cuentas
router.post('/prestamos', (req, res) => cuentaController.AñadirCuentaPrestamo(req, res));
router.post('/ahorros', (req, res) => cuentaController.AñadirCuentaAhorro(req, res));

// Editar cuentas
router.put('/prestamos/:id', (req, res) => cuentaController.EditarCuentaPrestamo(req, res));
router.put('/ahorros/:id', (req, res) => cuentaController.EditarCuentaAhorro(req, res));

// Eliminar cuentas
router.delete('/:id', (req, res) => cuentaController.EliminarCuenta(req, res));

// Mostrar próxima fecha de pago
router.get('/:id/proximafecha', (req, res) => cuentaController.MostrarProximaFechaPago(req, res));

// Mostrar resumen por tipos de cuentas
router.get('/resumen/cuentas', (req, res) => cuentaController.MostrarResumenCuentas(req, res));

module.exports = router;
