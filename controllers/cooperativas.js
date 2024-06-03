const { cooperativas, usuarios, prestamos, ahorros } = require('../Banco_Social');

class CooperativaController {
    AñadirCooperativa(req, res) {
        const { id, nombre, usuariosDeCooperativa } = req.body;
        const nuevaCooperativa = { id: parseInt(id), nombre, usuariosDeCooperativa: usuariosDeCooperativa.map(u => parseInt(u)) };
        cooperativas.push(nuevaCooperativa);
        res.status(201).json({ mensaje: 'Se ha añadido la cooperativa', cooperativa: nuevaCooperativa });
    }

    EliminarUsuarioDeCooperativa(req, res) {
        const { cooperativaId, usuarioId } = req.params;
        const cooperativa = cooperativas.find(c => c.id === parseInt(cooperativaId));
        if (cooperativa) {
            cooperativa.usuariosDeCooperativa = cooperativa.usuariosDeCooperativa.filter(u => u !== parseInt(usuarioId));
            res.json({ mensaje: 'Usuario eliminado de la cooperativa', cooperativa });
        } else {
            res.status(404).json({ mensaje: 'Cooperativa no encontrada' });
        }
    }

    RelacionarUsuarioConCooperativa(req, res) {
        const { cooperativaId, usuarioId } = req.params;
        const cooperativa = cooperativas.find(c => c.id === parseInt(cooperativaId));
        const usuario = usuarios.find(u => u.id === parseInt(usuarioId));
        if (cooperativa && usuario) {
            if (!cooperativa.usuariosDeCooperativa.includes(usuario.id)) {
                cooperativa.usuariosDeCooperativa.push(usuario.id);
                usuario.cooperativasDeUsuario.push(cooperativa.id);
                res.json({ mensaje: 'Usuario relacionado con la cooperativa', cooperativa });
            } else {
                res.status(400).json({ mensaje: 'Usuario ya está relacionado con esta cooperativa' });
            }
        } else {
            res.status(404).json({ mensaje: 'Cooperativa o usuario no encontrado' });
        }
    }

    ObtenerTodasCooperativas(req, res) {
        return cooperativas;
    }

    ObtenerDetallesCooperativa(req, res) {
        const { id } = req.params;
        const cooperativa = cooperativas.find(c => c.id === parseInt(id));
        if (cooperativa) {
            return cooperativa;
        } else {
            res.status(404).json({ mensaje: 'Cooperativa no encontrada' });
        }
    }

    ObtenerResumen(req, res) {
        let totalAhorros = 0;
        let totalPrestamos = 0;
        let totalCooperativas = 0;
        let sumTasaInteresAhorros = 0;
        let sumTasaInteresPrestamos = 0;

        ahorros.forEach(ahorro => {
            totalAhorros += ahorro.monto;
            sumTasaInteresAhorros += ahorro.tasaInteres;
        });

        prestamos.forEach(prestamo => {
            totalPrestamos += prestamo.monto;
            sumTasaInteresPrestamos += prestamo.tasaInteres;
        });

        cooperativas.forEach(cooperativa => {
            totalCooperativas += cooperativa.usuariosDeCooperativa.length;
        });

        const promedioTasaInteresAhorros = ahorros.length ? sumTasaInteresAhorros / ahorros.length : 0;
        const promedioTasaInteresPrestamos = prestamos.length ? sumTasaInteresPrestamos / prestamos.length : 0;

        res.json({
            totalAhorros,
            totalPrestamos,
            totalCooperativas,
            promedioTasaInteresAhorros,
            promedioTasaInteresPrestamos
        });
    }
}

module.exports = new CooperativaController();
