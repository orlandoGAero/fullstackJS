const Paciente = require('../models/Paciente');

// Crear nuevo paciente
exports.nuevoPaciente = async (req, res, next) => {
    
    // crear objeto de paciente con datos de req.body
    const paciente = new Paciente(req.body);

    try {
        // TODO: Inserta en la base de datos
        await paciente.save();

        res.json({mensaje: 'El paciente se agregó correctamente'})    
    } catch (error) {
        console.log(error);
        next();
    }

}

// Obtener pacientes de la BD
exports.obtenerPacientes = async (req, res, next) => {

    try {
        const pacientes = await Paciente.find({});
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        next();
    }

}

// Obtener paciente por su id
exports.obtenerPaciente = async (req, res, next) => {

    try {
        const paciente = await Paciente.findById(req.params.id);
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }

}

// Actualizar datos del paciente
exports.actualizarPaciente = async (req, res, next) => {
    try {
        const paciente = await Paciente.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true
        });
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Elimina un paciente por su id
exports.eliminarPaciente = async (req, res, next) => {
    try {
        await Paciente.findOneAndDelete({ _id: req.params.id });
        res.json({mensaje: 'El paciente se eliminó correctamente'})
    } catch (error) {
        console.log(error);
        next();
    }
}