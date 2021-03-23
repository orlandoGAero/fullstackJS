const url = 'http://localhost:4000/pacientes';

fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => mostrarCitas(datos))
    .catch(error => console.log(error))

function mostrarCitas(citas) {

    const contenedorCitas = document.querySelector('#citas');

    let htmlCitas = '';

    citas.forEach( cita => {
        htmlCitas += `
            <div class="p-5 list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100  justify-content-between mb-4">
                    <h3 class="mb-3">${cita.nombre}</h3>
                    <small class="fecha-alta">
                        ${cita.fecha} - ${cita.hora}
                    </small>
                </div>

                <p class="mb-0">
                    ${cita.sintomas}
                </p>
                
                <div class="contacto py-3">
                    <p>Dueño: ${cita.propietario}</p>
                    <p>Teléfono: ${cita.telefono}</p>
                </div>
            </div>           
        `;
    });

    contenedorCitas.innerHTML = htmlCitas;
}