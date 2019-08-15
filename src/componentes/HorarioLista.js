import React from 'react';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import firebase from './configuracion_firebase/firebase';

function HorarioLista({ horario }) {


    const eliminarHorario = id => {
        console.log('eliminando', id);
        //TODO: Eliminar los registros
        Swal.fire({
            title: 'Estás seguro?',
            text: "Un horario eliminado no se podrá recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.value) {
                try {
                    firebase.firestore().collection('clases').doc(id).delete()
                        .then(
                            Swal.fire(
                                'Eliminado!',
                                'El horario se ha eliminado',
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
                Docente: {horario.nombreDocente}<br></br>
                Materia: {horario.materia}<br></br>
                Dia: {horario.dia}<br></br>
                {horario.horainicio} {'-'} {horario.horafin}

            </p>
            <div>
                <Link to={`/horarios/editar/${horario.id}`} className="btn btn-success mr-2">Editar</Link>

                <button type="button" className="btn btn-danger"
                    onClick={() => eliminarHorario(horario.id)}>Eliminar &times;
                </button>
            </div>
        </li>
    )
}

export default HorarioLista;