import React, { useState } from 'react';
import { AFrameRenderer, Marker } from 'react-web-ar';
import firebase from '../componentes/configuracion_firebase/firebase';

export default function Labpatt(){  

  const [horarios, guardarHorarios] = useState([]);

  const consulta = ()=>{
    firebase.firestore().collection('clases').where("dia","==","Martes")
      .onSnapshot((snapshot) => {
        const datos = snapshot.docs.map((dato) => ({
          id: dato.id,
          ...dato.data()
        }))
        guardarHorarios(datos);
        console.log(horarios)
      });
  }

  return (
    <AFrameRenderer arToolKit={{ sourceType: 'webcam' }}>
      {consulta()}
      <Marker parameters={{
          preset: "pattern",
          type: "pattern",
          url: "https://github.com/RobertoPCP1997/pattLaboratorios/blob/master/pattern-lab1.patt"
        }}>
      </Marker>

      <a-text value={horarios} otation="-90 0 0" color="green" height="2.5" width="2.5" position='0 0.5 0'></a-text>
      <a-plane color="#CCC" height="1" width="2" rotation="-90 0 0"></a-plane>
    </AFrameRenderer>
  )
}