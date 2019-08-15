import React from 'react';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import firebase from './configuracion_firebase/firebase';

function LaboratorioLista({ laboratorio }) {


    const eliminarLaboratorio = id => {
        console.log('eliminando', id);
        //TODO: Eliminar los registros
        Swal.fire({
            title: 'Estás seguro?',
            text: "Un laboratorio eliminado no se podrá recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.value) {
                try {
                    firebase.firestore().collection('laboratorio').doc(id).delete()
                        .then(
                            Swal.fire(
                                'Eliminado!',
                                'El Laboratorio se ha eliminado',
                                'success'
                            )
                        )
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: 'Hubo un error, vuelve a intentarlo'
                    })
                }
            }
        })
    }



    return (
        <li className="list-group-item d-flex justify-content-between alig-items-center">
            <p>
                {laboratorio.nombreLaboratorio} {' |'}
                <span className="font-weight-blod">{laboratorio.descripcionLaboratorio}</span>
            </p>
            <div>
                <Link to={`/laboratorios/editar/${laboratorio.id}`}
                    className="btn btn-success mr-2"
                >Editar</Link>

                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => eliminarLaboratorio(laboratorio.id)}
                >
                    Eliminar &times;
                </button>
            </div>
        </li>
    )
}

export default LaboratorioLista;