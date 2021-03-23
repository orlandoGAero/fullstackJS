import React, {Fragment,useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import clientesAxios from "../config/axios";

const EditarCita = (props) => {

    const { cita: {_id, nombre, propietario, telefono, fecha, hora, sintomas} } = props;

    const [citaBd,guardarCita] = useState({
        nombre,
        propietario,
        telefono,
        fecha,
        hora,
        sintomas,
    });


    const actualizarCita = e => {
        guardarCita({
            ...citaBd,
            [e.target.name]: e.target.value
        })
    }

    const editarCita = e =>  {
        e.preventDefault();

        clientesAxios.put(`/pacientes/${_id}`, citaBd)
            .then(respuesta => {
                props.guardarConsultar(true);
                props.history.push("/");
            })
            .catch(error => console.log(error))

    }
    
    return ( 
        <Fragment>
            <h1 className="pt-5">Editar Cita</h1>
            <div className="container mt-5 py-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-3">
                        <Link to={'/'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Volver</Link>
                    </div>
                    <div className="col-md-3">
                        <Link to={`/cita/${_id}`} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Cancelar</Link>
                    </div>

                    <div className="col-md-8 mx-auto mt-5">
                        <form 
                            onSubmit={editarCita}
                            className="bg-white p-5 bordered">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre Mascota</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    id="nombre" 
                                    name="nombre" 
                                    placeholder="Nombre Mascota"
                                    value={citaBd.nombre}
                                    onChange={actualizarCita}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="propietario">Nombre Propietario</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    id="propietario" 
                                    name="propietario" 
                                    placeholder="Nombre Propietario"
                                    value={citaBd.propietario}
                                    onChange={actualizarCita}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="telefono">Teléfono</label>
                                <input 
                                    type="tel" 
                                    className="form-control form-control-lg" 
                                    id="telefono" 
                                    name="telefono" 
                                    placeholder="Teléfono"
                                    value={citaBd.telefono}
                                    onChange={actualizarCita}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="fecha">Fecha Alta</label>
                                <input 
                                    type="date" 
                                    className="form-control form-control-lg" 
                                    id="fecha" 
                                    name="fecha"
                                    value={citaBd.fecha}
                                    onChange={actualizarCita}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="hora">Hora Alta</label>
                                <input 
                                    type="time" 
                                    className="form-control form-control-lg" 
                                    id="hora" 
                                    name="hora"
                                    value={citaBd.hora}
                                    onChange={actualizarCita}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="sintomas">Síntomas</label>
                                <textarea 
                                    className="form-control" 
                                    name="sintomas" 
                                    rows="6"
                                    onChange={actualizarCita}
                                    value={citaBd.sintomas}
                                ></textarea>
                            </div>


                            <input type="submit" className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold" value="Editar Cita"  />
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default withRouter(EditarCita);