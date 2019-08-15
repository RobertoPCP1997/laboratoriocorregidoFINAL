import React, { useState, useRef } from 'react';
import Error from './Error';

import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import firebase from './configuracion_firebase/firebase';

function EditarLaboratorio(props) {

    //destructuring de propos
    const { history, laboratorio } = props;

    //generar los refs
    const descripcionLaboratorioRef = useRef('');
    const nombreLaboratorioRef = useRef('');
    const pattLaboratorioRef = useRef('');

    const [error, guardarError] = useState(false);

    const editarLaboratorio = async e => {
        e.preventDefault();

        //validacion de datos
        const nuevoNombreLaboratorio = nombreLaboratorioRef.current.value,
            nuevoDescripcionLaboratorio = descripcionLaboratorioRef.current.value,
            nuevoPattLaboratorio = pattLaboratorioRef.current.value;

        if (nuevoNombreLaboratorio === '' || nuevoDescripcionLaboratorio === '' || nuevoPattLaboratorio === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        //obtener los valores del formulario
        const editarLaboratorio = {
            nombreLaboratorio: nuevoNombreLaboratorio,
            descripcionLaboratorio: nuevoDescripcionLaboratorio,
            patt: nuevoPattLaboratorio

        }

        try {
            firebase.firestore().collection('laboratorio').doc(laboratorio.id).update(editarLaboratorio)
                .then(Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Excelente!',
                    text: 'Laboratorio editado con exito!',
                    showConfirmButton: false,
                    timer: 1500
                }))
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, vuelve a intentarlo'
            })
        }
        //redirigir al usuario, consultar a la API
        //guardarRecargarLaboratorios(true);
        history.push('/laboratorios');
    }
  
    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Laboratorio</h1>

            {(error) ? <Error mensaje='Todos los campos son obligatorios' /> : null}

            <form
                className="mt-5"
                onSubmit={editarLaboratorio}
            >
                <div className="form-group">
                    <label>Nombre Laboratorio</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre Laboratorio"
                        ref={nombreLaboratorioRef}
                        defaultValue={laboratorio.nombreLaboratorio}
                    />
                </div>

                <div className="form-group">
                    <label>Descripcion Laboratorio</label>
                    <input
                        type="text"
                        className="form-control"
                        name="descripcion"
                        placeholder="Descripcion Laboratorio"
                        ref={descripcionLaboratorioRef}
                        defaultValue={laboratorio.descripcionLaboratorio}
                    />
                </div>
                <div className="form-group">
                    <label>Patt Laboratorio</label>
                    <textarea
                        type="text"
                        className="form-control"
                        name="patt"
                        placeholder="Patt Laboratorio"
                        ref={pattLaboratorioRef}
                        defaultValue={laboratorio.patt}
                    ></textarea>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Laboratorio" />
            </form>
        </div>
    )
}
export default withRouter(EditarLaboratorio);