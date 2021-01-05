import { Fragment, useEffect, useState } from "react";
import Cita from "./Cita";
import Formulario from "./Formulario";


function App() {

  // d citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = []
  }

  const [ citas, guardarCitas ] = useState(citasIniciales)

  // d para cuando el state cambie
  useEffect( () => {
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  },[citas])

  // d coger citas actuales
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  // d funcion que elimina cita por su ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id )
    guardarCitas(nuevasCitas)
  }

  // d mensaje condicional 
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <Fragment>
      <h1>ADMINISTRADOR DE PASIENTES</h1>

      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario 
              crearCita = { crearCita }
            />
          </div>
          
          <div className='one-half column'>
            <h2> { titulo } </h2>
            { citas.map(cita => (
              <Cita 
                key={ cita.id }
                cita={ cita }
                eliminarCita = { eliminarCita }
              />
            ))}
          </div>
          
        </div>
      </div>
    </Fragment>


  );
}

export default App;
