import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    const [ cita, actualizarCita ] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    })
    const [ error, actualizarError ] = useState(false)

    const actualizarState= e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value,
        })  
    }

// d extraer valores
    const { mascota, propietario, fecha, hora, sintomas } = cita

// d enviar cita
    const submitCita = (e) => {
        e.preventDefault();
      // valdiar
      if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
        actualizarError(true);
        return;
      }
    // d asignar ID
    cita.id = uuid();
    
    // d crear cita
    crearCita(cita);
    // d reiniciar el form
    actualizarCita({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    })
    }


    return ( 
        <Fragment>
            <h2>Crear Cita</h2>
            
            { error ? <p className='alerta-error'>Todos los campos son obligarios</p> : null }
            <form
                onSubmit={ submitCita }
            >
                <label>Nombre Mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='nombre mascota'
                    onChange={ actualizarState }
                    value={ mascota }
                />
                <label>Nombre Dueño</label>
                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='nombre dueño de la mascota'
                    onChange={ actualizarState }
                    value={ propietario }
                />
                <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={ actualizarState }
                    value={ fecha }
                />
                <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={ actualizarState }
                    value={ hora }
                />
                <label>Sintomas</label>
                <textarea 
                    className='u-full-width'
                    name='sintomas'   
                    onChange={ actualizarState } 
                    value={ sintomas }
                ></textarea>

                <button 
                    type='submit'
                    className='u-full-width button-primary'
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;