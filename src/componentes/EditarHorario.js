import React, { useState, useRef } from 'react';
import OpcionesLab from './OpcionesLab';
import Error from './Error';

import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import firebase from './configuracion_firebase/firebase';

function EditarHorario(props) {

    //destructuring de propos
    const { history, horario, datos } = props;

    //generar los refs
    const nombreDocenteRef = useRef('');
    const materiaRef = useRef('');
    const horainicioRef = useRef('');
    const horafinRef = useRef('');
    const labRef = useRef('');
    const diaRef = useRef('');

    const [error, guardarError] = useState(false);

    const editarHorario = async e => {
        e.preventDefault();

        //validacion de datos
        const nuevoNombreDocente = nombreDocenteRef.current.value,
            nuevaMateria = materiaRef.current.value,
            nuevaHorainicio = horainicioRef.current.value,
            nuevaHorafin = horafinRef.current.value;

        if (nuevoNombreDocente === '' || nuevaMateria === '' || nuevaHorainicio === '' || nuevaHorafin === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        //obtener los valores del formulario
        const editarHorario = {
            nombreDocente: nuevoNombreDocente,
            materia: nuevaMateria,
            horainicio: nuevaHorainicio,
            horafin: nuevaHorafin,
            lab: labRef.current.value,
            dia: diaRef.current.value

        }
        //Actualizando los datos en firebase
        try {
            firebase.firestore().collection('clases').doc(horario.id).update(editarHorario)
                .then(Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Excelente!',
                    text: 'Horario editado con exito!',
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
        history.push('/horarios');
    }

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar</h1>

            {(error) ? <Error mensaje='Todos los campos son obligatorios' /> : null}

            <form
                className="mt-5"
                onSubmit={editarHorario}
            >
                <div className="form-group">
                    <label>Docente</label>
                    <input
                        type="text"
                        className="form-control"
                        name="docente"
                        placeholder="Docente"
                        ref={nombreDocenteRef}
                        defaultValue={horario.nombreDocente}
                    />
                </div>

                <div className="form-group">
                    <label>Materia</label>
                    <input
                        type="text"
                        className="form-control"
                        name="materia"
                        placeholder="Materia"
                        ref={materiaRef}
                        defaultValue={horario.materia}
                    />
                </div>

                <div className="form row">
                    <div className="form-group col-md-6">
                        <label>Hora inicio</label>
                        <input
                            type="time"
                            className="form-control"
                            name="horainicio"
                            placeholder="Materia"
                            ref={horainicioRef}
                            defaultValue={horario.horainicio}
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label>Hora Fin</label>
                        <input
                            type="time"
                            className="form-control"
                            name="horafin"
                            placeholder="Materia"
                            ref={horafinRef}
                            defaultValue={horario.horafin}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Laboratorio</label>
                    <select
                        className="form-control"
                        name="laboratorio"
                        ref={labRef} defaultValue={horario.laboratorio}>
                        <option>Seleccione un laboratorio</option>
                        {datos.map(dato => (
                            <OpcionesLab key={dato.id} dato={dato} />
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Día</label>
                    <select className="form-control" name="dia" ref={diaRef} defaultValue={horario.dia}>
                        <option>Seleccione un día</option>
                        <option value="Lunes">Lunes</option>
                        <option value="Martes" >Martes</option>
                        <option value="Miercoles">Miercoles</option>
                        <option value="Jueves">Jueves</option>
                        <option value="Viernes">Viernes</option>
                    </select>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Clase" />
            </form>
        </div>
    )
}
export default withRouter(EditarHorario);