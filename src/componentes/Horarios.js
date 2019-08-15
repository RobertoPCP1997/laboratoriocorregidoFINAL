import React,{ Fragment} from 'react';
import HorarioLista from './HorarioLista';

function Horarios({horarios, guardarRecargarLaboratorios, auth}){
    return (
        <Fragment>
                <div>
                    <h1 className="text-center">Horarios</h1>
                    <ul className="list-group mt-5">
                        {horarios.map(horario => (
                            <HorarioLista
                                key={horario.id}
                                horario={horario}
                                guardarRecargarLaboratorios={guardarRecargarLaboratorios}
                            />
                        ))}
                    </ul>
                </div>
        
        </Fragment>
    )
}
export default Horarios;