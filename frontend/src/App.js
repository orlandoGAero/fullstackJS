import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// componentes
import Pacientes from './components/Pacientes';
import NuevaCita from './components/NuevaCita';
import EditarCita from './components/EditarCita';
import Cita from './components/Cita';
import clientesAxios from './config/axios';

function App() {

  const [citas, guardarCitas] = useState([]);
  const [consultar, guardarConsultar] = useState(true) ;

  useEffect( () => {
    if(consultar) {
      const consultarApi = () => {
        clientesAxios.get('/pacientes')
          .then( res => {
            guardarCitas(res.data);

            guardarConsultar(false);
          })
          .catch( error => console.log(error))
      }
      consultarApi();
    }
  },[consultar]);

  return (
    <Router>
      <Switch>
        <Route 
          exact
          path="/"
          component={() => <Pacientes citas={citas} />}
        />
        <Route 
          exact
          path="/nueva"
          component={() => <NuevaCita guardarConsultar={guardarConsultar}/>}
        />
        <Route 
          exact
          path="/cita/:id"
          render={ props => {
            const cita = citas.filter( cita => cita._id === props.match.params.id);

            return( 
              <Cita 
                cita={cita[0]}
                guardarConsultar={guardarConsultar}
              />
            )
          }}
        />
        <Route
          exact
          path="/editar/:id"
          render={ props => {
            const cita = citas.filter( cita => cita._id === props.match.params.id);

            return(
              <EditarCita
                cita={cita[0]}
                guardarConsultar={guardarConsultar}
              />
            );
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
