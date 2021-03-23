import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import clientesAxios from '../config/axios';
import Swal from 'sweetalert2';

const Cita = (props) => {

    if(!props.cita) {
        props.history.push("/");
        return null;
    }

    const { cita: {_id, nombre, propietario, fecha, hora, telefono, sintomas} } = props;

    const eliminarCita = id => {
        
        Swal.fire({
            title: '¿Estas seguro?',
            text: "!Una cita no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '!Si, Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminada!',
                    'Tu cita ha sido eliminada.',
                    'success'
                )

                clientesAxios.delete(`/pacientes/${id}`)
                .then( resultado => {
                    props.guardarConsultar(true);
                    console.log(resultado);
                    props.history.push("/");
                })
                .catch( error => { 
                    console.log(error);
                })

            }
        })

    }

    return ( 
        <Fragment>
            <h1 className="py-5">Nombre Cita: {nombre}</h1>

            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Volver</Link>
                    </div>

                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                            <div className="p-5 list-group-item list-group-item-action flex-column align-items-center">
                                <div className="d-flex w-100  justify-content-between mb-4">
                                    <h3 className="mb-3">{nombre}</h3>
                                    <small className="fecha-alta">
                                        {fecha} - {hora}
                                    </small>
                                </div>

                                <p className="mb-0">
                                    {sintomas}
                                </p>
                                
                                <div className="contacto py-3">
                                    <p>Dueño: {propietario}</p>
                                    <p>Teléfono: {telefono}</p>
                                </div>

                                <div className="d-flex flex-column">
                                    <Link
                                        to={`/editar/${_id}`}
                                        className="text-uppercase py-2 px-5 mb-md-3 btn font-weight-bold btn-info col"
                                    >
                                        Editar
                                    </Link>
                                    <button 
                                        type="button"
                                        className="text-uppercase py-2 px-5 font-weight-bold btn btn-danger col"
                                        onClick={() => eliminarCita(_id)}
                                    >
                                        Eliminar &times;
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default withRouter(Cita);