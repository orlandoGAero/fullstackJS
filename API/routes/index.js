const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

module.exports = function() {
    router.post('/pacientes',
        pacienteController.nuevoPaciente
    );

    router.get('/pacientes',
        pacienteController.obtenerPacientes
    );

    router.get('/pacientes/:id',
        pacienteController.obtenerPaciente
    );

    router.put('/pacientes/:id',
        pacienteController.actualizarPaciente
    );

    router.delete('/pacientes/:id', 
        pacienteController.eliminarPaciente
    );

    return router;
}