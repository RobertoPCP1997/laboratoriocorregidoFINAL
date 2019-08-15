import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from './componentes/configuracion_firebase/firebase';
import Header from './componentes/Header';
import Login from './componentes/autentificacion/Login';
import Horarios from './componentes/Horarios';
import AgregarHorario from './componentes/AgregarHorario';
import EditarHorario from './componentes/EditarHorario';
import Horario from './componentes/Horario';
import Laboratorios from './componentes/Laboratorios';
import AgregarLaboratorio from './componentes/AgregarLaboratorio';
import EditarLaboratorio from './componentes/EditarLaboratorio';
import Laboratorio from './componentes/Laboratorio';



function App() {

  const [laboratorios, guardarLaboratorios] = useState([]);

  const [recargarLaboratorios, guardarRecargarLaboratorios] = useState(true);

  const [horarios, guardarHorarios] = useState([]);
  const [autenticacion, guardarAutenticacion]=useState([]);
//conexion firebase
  useEffect(() => {
    if (recargarLaboratorios) {
      firebase.firestore().collection('laboratorio').onSnapshot((snapshot) => {
        const datos = snapshot.docs.map((dato) => ({
          id: dato.id,
          ...dato.data()
        }))
        guardarLaboratorios(datos);
      });
      firebase.firestore().collection('clases').onSnapshot((snapshot) => {
        const datos = snapshot.docs.map((dato) => ({
          id: dato.id,
          ...dato.data()
        }))
        guardarHorarios(datos);
      });
    }
    //cambiar a false la recarga de los datos para que no se esté consultando a la API a cada rato
    guardarRecargarLaboratorios(false);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //state true cuando se en encuentra logeado
        return guardarAutenticacion(true);
      } else {
        //El state se pone en false si el usuario esta logeado
        return guardarAutenticacion(false);
      }
    })
  }, [recargarLaboratorios])

  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
        <Route exact path="/"
            render={() => (
              <Login
                recargar={guardarRecargarLaboratorios}
              />
            )}
          />
          {/*aqui empieza las rutas de los laboratorisos*/}
          <Route exact path="/laboratorios"
            render={() => (
              <Laboratorios
                laboratorios={laboratorios}
                guardarRecargarLaboratorios={guardarRecargarLaboratorios}
                auth={autenticacion}
              />
            )}
          />
          <Route exact path="/nuevo-laboratorio"
            render={() => (
              <AgregarLaboratorio
                guardarRecargarLaboratorios={guardarRecargarLaboratorios}
                auth={autenticacion}
              />
            )} />
          <Route exact path="/laboratorios/:id" component={Laboratorio} />
          <Route exact path="/laboratorios/editar/:id"
            render={props => {
              // tomar el id del laboratorio
              const idLaboratorio = props.match.params.id;

              //el lab que se pasa al state
              const laboratorio = laboratorios.filter(laboratorio => laboratorio.id ===
                idLaboratorio);
              return (
                <EditarLaboratorio
                  laboratorio={laboratorio[0]}
                //guardarRecargarLaboratorios={guardarRecargarLaboratorios}
                />
              )
            }}
          />



          {/*HORARIOSSSSSSSSSSS*/}
          
          <Route exact path="/horarios"
            render={() => (
              <Horarios
                horarios={horarios}
                auth={autenticacion}
              />
            )}
          />
          <Route exact path="/nuevo-horario"
            render={() => (
              <AgregarHorario
                datos={laboratorios}
                auth={autenticacion}
               
              />
            )} />
          <Route exact path="/horarios/:id" component={Horario} />
          <Route exact path="/horarios/editar/:id"
            render={props => {
              // tomar el id del horario
              const idHorario = props.match.params.id;

              //el lab que se pasa al state
              const horario = horarios.filter(horario => horario.id ===
                idHorario);
              return (
                <EditarHorario
                  horario={horario[0]}
                  datos={laboratorios}
                //guardarRecargarLaboratorios={guardarRecargarLaboratorios}
                />
              )
            }}
          />
      
         
          {/*aqui empieza la ruta del marcador*/}
        
        </Switch>
      </main>
     
    </Router>
  );
}

export default App;
