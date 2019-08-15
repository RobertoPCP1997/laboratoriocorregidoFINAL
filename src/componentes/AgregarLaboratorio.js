import React, { useState } from 'react';
import Error from './Error';

import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import firebase from './configuracion_firebase/firebase';

function AgregarLaboratorio({history, guardarRecargarLaboratorios}){
    
    //state
    const [nombreLaboratorio, guardarNombre ] = useState('');
    const [descripcionLaboratorio, guardarDescripcion ] = useState('');
    const [patt, guardarPatt ] = useState('');
    const [error, guardarError ] = useState(false);
   
    const AgregarLaboratorio = async e => {
        e.preventDefault();

        if(nombreLaboratorio === '' || descripcionLaboratorio === '' || patt === ''){
            guardarError(true);
            return;
        }

        guardarError(false);

        //se crea el nuevo producto
        try {
            firebase.firestore().collection('laboratorio').add({
                nombreLaboratorio,
                descripcionLaboratorio,
                patt
            })      
            .then(
                Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Excelente!',
                text: 'Laboratorio creado con exito',
                showConfirmButton: false,
                timer: 1500
              }));
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, vuele a intentarlo'
              })
        } 
        //redirigir al usuario a productos
        guardarRecargarLaboratorios(true);
        history.push('/laboratorios');
    }
    return (
        <div className="col-md-8 mx-auto ">
        <h1 className="text-center">Agregar Nuevo Laboratorio</h1>

        {(error)? <Error mensaje='Todos los campos son obligatorios'/>: null}
        
        <form
            className="mt-5"
            onSubmit={AgregarLaboratorio}
        >
            <div className="form-group">
                <label>Nombre Laboratorio</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="nombre" 
                    placeholder="Nombre Laboratorio"
                    onChange={e=> guardarNombre(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Descripcion Laboratorio</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="descripcion"
                    placeholder="Descripcion Laboratorio"
                    onChange={e=> guardarDescripcion(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Patt Laboratorio</label>
                <textarea 
                    type="text" 
                    className="form-control" 
                    name="patt"
                    placeholder="Patt Laboratorio"
                    onChange={e=> guardarPatt(e.target.value)}
                ></textarea>
            </div>
        
            <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Laboratorio" />
        </form>
    </div>
        
    )
}
export default withRouter(AgregarLaboratorio);