const { usuarios, prestamos, ahorros, cooperativas } = require("../Banco_Social");

class UsuarioController {
    ObtenerTodosLosUsuarios(req, res) {
        res.json(usuarios);
    }
    
    AñadirUsuario(req, res) {
        const { id, nombre, email } = req.body;
        const nuevoUsuario = { id: parseInt(id), nombre, email, prestamosDeUsuario: [], ahorrosDeUsuario: [], cooperativasDeUsuario: [] };
        usuarios.push(nuevoUsuario);
        res.status(201).json({ mensaje: 'Se ha añadido el usuario', usuario: nuevoUsuario });
    }

    EditarUsuario(req, res) {
        const { id } = req.params;
        const { nombre, email } = req.body;
        const usuarioId = parseInt(id);
        const usuario = usuarios.find(usuario => usuario.id === usuarioId);
        if (usuario) {
            usuario.nombre = nombre;
            usuario.email = email;
            res.json({ mensaje: 'Usuario actualizado', usuario });
        } else {
            res.status(404).json({ mensaje: 'No se encontró el usuario en la base de datos' });
        }
    }

    BorrarUsuario(req, res) {
        const { id } = req.params;
        const usuarioId = parseInt(id);
        const index = usuarios.findIndex(usuario => usuario.id === usuarioId);
        if (index !== -1) {
            usuarios.splice(index, 1);
            res.json({ mensaje: 'Usuario eliminado' });
        } else {
            res.status(404).json({ mensaje: 'No se encontró el usuario en la base de datos' });
        }
    }

    ObtenerDetallesUsuario(req, res) {
        const { id } = req.params;
        const usuarioId = parseInt(id);
        const usuario = usuarios.find(usuario => usuario.id === usuarioId);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ mensaje: 'No se encontró el usuario en la base de datos' });
        }
    }

    ObtenerCuentasUsuario(req, res) {
        const { id } = req.params;
        const usuario = usuarios.find(usuario => usuario.id === parseInt(id));
        if (usuario) {
            const cuentasPrestamos = prestamos.filter(prestamo => prestamo.usuarioId === usuario.id);
            const cuentasAhorros = ahorros.filter(ahorro => ahorro.usuarioId === usuario.id);
            res.json({
                usuario,
                cuentasPrestamos,
                cuentasAhorros
            });
        } else {
            res.status(404).json({ mensaje: 'No se encontró el usuario en la base de datos' });
        }
    }
}

module.exports = new UsuarioController();
