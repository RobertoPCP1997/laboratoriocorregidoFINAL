import React ,{useState}from 'react';
import Swal from 'sweetalert2';
import firebase from '../configuracion_firebase/firebase';
import {withRouter} from 'react-router-dom';

 function Login({history,recargar}) {
     const [ correo, guardarCorreo ] = useState('');
     const [ contrasena , guardarContrasena ] = useState('');

     const  logeo  = async e =>{
        e.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(correo, contrasena);
            Swal.fire({
                type: 'success',
                title: 'Iniciando',
                showConfirmButton: false,
                timer: 1500
            })
            recargar(true);
            history.replace('/laboratorios');
        } catch (error) {
            console.log(error.message);
            if(error.message==='The password is invalid or the user does not have a password.'){
                Swal.fire({
                    type: 'error',
                    title: 'Contraseña incorrecta',
                    text: 'La contraseña ingresaste es incorrecta!',
                })
            }else if(error.message==='There is no user record corresponding to this identifier. The user may have been deleted.'){
                Swal.fire({
                    type: 'error',
                    title: 'Contraseña incorrecta',
                    text: 'El correo que ingresaste es incorrecto!',
                })
            }
            
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-md-4 col-md-offset-4">
                    <form onSubmit={logeo}>
                        <div className="account-wall">
                            <center>
                            <img className="profile-img" src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Icono_Usuario.png"
                                alt="" />
                            </center>
                            <form className="form-signin">
                                <input type="text" class="form-control" placeholder="Email" required autofocus 
                                    value={correo}
                                    onChange={e=>guardarCorreo(e.target.value)}
                                />
                                <input type="password" class="form-control" placeholder="Password" required 
                                    value={contrasena}
                                    onChange={e=>guardarContrasena(e.target.value)}
                                />
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Iniciar Sesión</button>
                            </form>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Login);
