const { cuentas } = require('../Banco_Social');

class CuentaController {
    AñadirCuentaPrestamo(req, res) {
        const { id, usuarioId, balance, tasaInteres, fechaProximoPago } = req.body;
        const nuevaCuenta = { id: parseInt(id), tipo: 'prestamo', usuarioId: parseInt(usuarioId), balance: parseFloat(balance), tasaInteres: parseFloat(tasaInteres), fechaProximoPago };
        cuentas.push(nuevaCuenta);
        res.status(201).json({ mensaje: 'Cuenta de préstamo añadida', cuenta: nuevaCuenta });
    }

    AñadirCuentaAhorro(req, res) {
        const { id, usuarioId, balance, tasaInteres } = req.body;
        const nuevaCuenta = { id: parseInt(id), tipo: 'ahorro', usuarioId: parseInt(usuarioId), balance: parseFloat(balance), tasaInteres: parseFloat(tasaInteres) };
        cuentas.push(nuevaCuenta);
        res.status(201).json({ mensaje: 'Cuenta de ahorro añadida', cuenta: nuevaCuenta });
    }

    EditarCuentaPrestamo(req, res) {
        const { id } = req.params;
        const { balance, tasaInteres, fechaProximoPago } = req.body;
        const cuenta = cuentas.find(c => c.id === parseInt(id) && c.tipo === 'prestamo');
        if (cuenta) {
            cuenta.balance = balance !== undefined ? parseFloat(balance) : cuenta.balance;
            cuenta.tasaInteres = tasaInteres !== undefined ? parseFloat(tasaInteres) : cuenta.tasaInteres;
            cuenta.fechaProximoPago = fechaProximoPago || cuenta.fechaProximoPago;
            res.json({ mensaje: 'Cuenta de préstamo actualizada', cuenta });
        } else {
            res.status(404).json({ mensaje: 'Cuenta de préstamo no encontrada' });
        }
    }

    EditarCuentaAhorro(req, res) {
        const { id } = req.params;
        const { balance, tasaInteres } = req.body;
        const cuenta = cuentas.find(c => c.id === parseInt(id) && c.tipo === 'ahorro');
        if (cuenta) {
            cuenta.balance = balance !== undefined ? parseFloat(balance) : cuenta.balance;
            cuenta.tasaInteres = tasaInteres !== undefined ? parseFloat(tasaInteres) : cuenta.tasaInteres;
            res.json({ mensaje: 'Cuenta de ahorro actualizada', cuenta });
        } else {
            res.status(404).json({ mensaje: 'Cuenta de ahorro no encontrada' });
        }
    }

    EliminarCuenta(req, res) {
        const { id } = req.params;
        const index = cuentas.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            const eliminada = cuentas.splice(index, 1);
            res.json({ mensaje: 'Cuenta eliminada', cuenta: eliminada });
        } else {
            res.status(404).json({ mensaje: 'Cuenta no encontrada' });
        }
    }

    MostrarProximaFechaPago(req, res) {
        const { id } = req.params;
        const cuenta = cuentas.find(c => c.id === parseInt(id) && c.tipo === 'prestamo');
        if (cuenta) {
            res.json({ fechaProximoPago: cuenta.fechaProximoPago });
        } else {
            res.status(404).json({ mensaje: 'Cuenta de préstamo no encontrada' });
        }
    }

    MostrarResumenCuentas(req, res) {
        const resumen = {
            totalAhorro: cuentas.filter(c => c.tipo === 'ahorro').reduce((sum, c) => sum + c.balance, 0),
            totalPrestamo: cuentas.filter(c => c.tipo === 'prestamo').reduce((sum, c) => sum + c.balance, 0),
            promedioTasaInteresAhorro: cuentas.filter(c => c.tipo === 'ahorro').reduce((sum, c, _, arr) => sum + c.tasaInteres / arr.length, 0),
            promedioTasaInteresPrestamo: cuentas.filter(c => c.tipo === 'prestamo').reduce((sum, c, _, arr) => sum + c.tasaInteres / arr.length, 0)
        };
        res.json(resumen);
    }
}

module.exports = new CuentaController();
