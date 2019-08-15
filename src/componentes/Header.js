import React, { useState } from 'react';
import firebase from '../componentes/configuracion_firebase/firebase';
import Swal from 'sweetalert2';
import { withRouter, NavLink, Link } from 'react-router-dom';

function Header({ history }) {

    const [autenticacion, guardarAutenticacion] = useState(false);

    const logOut = () => {
        firebase.auth().signOut();
        Swal.fire({
        
            type: 'success',
            title: 'Sesión cerrada',
           
            showConfirmButton: false,
            timer: 1500
        })
        history.replace('/');
    }
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            //El state se pone en true si el usuario esta logeado
            return guardarAutenticacion(true);
        } else {
            //El state se pone en false si el usuario esta logeado
            return guardarAutenticacion(false);
        }
    })
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2 mb-5">
            {autenticacion ? (
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                    <li className="nav-item dropdown">

                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/laboratorios">Listado laboratorios</a>
                        <a className="dropdown-item" href="/nuevo-laboratorio">Nuevo laboratorio</a>
                        <div className="dropdown-divider"></div>

                       <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="/horarios">Listado Cursos</a>
                        <a class="dropdown-item" href="/nuevo-horario">Curso nuevo</a>

                        <div class="dropdown-divider"></div>
                        <li className="nav-item">
                                <NavLink
                                    to="/arpatt"
                                    className="nav-link"
                                    activeClassName="active"
                                >Cam AR.js</NavLink>
                            </li>
                            <div class="dropdown-divider"></div>
                        <button className="btn btn-outline-success btn-sm" onClick={logOut}> SALIR</button>
                        

                    </li>
                </ul>
            </div>
           ) :<Link to="/" className="navbar-brand" >SISTEMA PARA LA ASIGNASION DE LABORATORIOS</Link>}
        </nav>
    )
}
export default withRouter(Header);