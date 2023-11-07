import { useEffect } from 'react';
import { useFormik } from "formik";
import { initialValue, validationSchema } from './RegisterPermisos.form';
import { useForm } from '@inertiajs/react';

export default function RegisterPermisos({ Personal, onClose }) {
  
  const { data , post } = useForm()
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.Motivo           = formValue.Motivo
      data.FechaInicio      = formValue.FechaInicio
      data.FechaTerminacion = formValue.FechaTerminacion
      data.Solicitante      = formValue.Solicitante
      data.Jornada          = formValue.Jornada
      data.HoraInicio       = formValue.HoraInicio
      data.HoraTerminacion  = formValue.HoraTerminacion
      data.CantHoras        = formValue.CantHoras
      data.Observaciones    = formValue.Observaciones
      post(`/permisos/store`)
      onClose()
    }
  })

  return (
    <form 
      onSubmit = { formik.handleSubmit }
      className="w-full flex flex-col justify-center items-start bg-gray-800  justify-items-center px-4 py-4 gap-5 "
      method="POST"
    >
      <div className='w-full flex gap-3'>
        <div className='w-1/2 flex flex-col '>
          <label htmlFor="Motivo" className='font-bold text-white'>
            Motivo
          </label>  
          <select
            name="Motivo"  id="Motivo"  value = { formik.values.Motivo } onChange = { formik.handleChange }
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              formik.touched.Motivo && formik.errors.Motivo ? 'border-red-500' : ''
            }`}
          >
            <option value=""> SELECCIONE UNA OPCION </option>
            <option value="CALAMIDAD"> CALAMIDAD </option>
            <option value="LICENCIA"> LICENCIA </option>
            <option value="CITA MEDICA"> CITA MEDICA</option>
            <option value="PERSONAL"> PERSONAL </option>
            <option value="VACACIONAL"> VACACIONAL </option>
            <option value="OTRO"> OTRO </option>
          </select>
          {
            formik.touched.Motivo && formik.errors.Motivo && (
              <div className="text-red-500 font-bold">{formik.errors.Motivo}</div>
            )
          }
        </div>
        <div className='w-1/2 flex flex-col '>
          <label htmlFor="CantHoras" className='font-bold text-white'>
            Cantidad de Horas
          </label>
          <input type="number" min={0} placeholder='0' name="CantHoras"  id="CantHoras"  value = { formik.values.CantHoras }   onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.CantHoras && formik.errors.CantHoras ? 'border-red-500' : 'border-black' }`}/>
          {
            formik.touched.CantHoras && formik.errors.CantHoras && (
              <div className="text-red-500 font-bold">{formik.errors.CantHoras}</div>
            )
          }
        </div>
      </div>
      <div className='w-full flex gap-3'>
        <div className='w-1/2 flex flex-col'>
          <label htmlFor="FechaInicio" className='font-bold text-white'>
            Fecha Inicio
          </label>
          <input type="date"  name="FechaInicio"  id="FechaInicio"  value = { formik.values.FechaInicio } onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.FechaInicio && formik.errors.FechaInicio ? 'border-red-500' : 'border-black' }`} />
          {
            formik.touched.FechaInicio && formik.errors.FechaInicio && (
              <div className="text-red-500 font-bold">{formik.errors.FechaInicio}</div>
            )
          }
        </div>
        <div className='w-1/2 flex flex-col'>
          <label htmlFor="FechaTerminacion" className='font-bold text-white'>
            Fecha Terminacion
          </label>
          <input type="date"  name="FechaTerminacion"  id="FechaTerminacion"  value = { formik.values.FechaTerminacion }   onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.FechaTerminacion && formik.errors.FechaTerminacion ? 'border-red-500' : 'border-black' }`}/>
          {
            formik.touched.FechaTerminacion && formik.errors.FechaTerminacion && (
              <div className="text-red-500 font-bold">{formik.errors.FechaTerminacion}</div>
            )
          }
        </div>
      </div>
      <div className='w-full flex gap-3'>
        <div className='w-1/2 flex flex-col '>
          <label htmlFor="Solicitante" className='font-bold text-white'>
            Solicitante
          </label>
          <select
            name="Solicitante"  id="Solicitante"  value = { formik.values.Solicitante } onChange = { formik.handleChange }
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              formik.touched.Solicitante && formik.errors.Solicitante ? 'border-red-500' : ''
            }`}
          >
            <option value=""> SELECCIONE UNA OPCION </option>
            {
                Personal ? 
                    Personal.map((personal) => (
                        <option value={personal.empleado_id}>{personal.nombre}</option>
                    ))
                : null
            }
          </select>
          {
            formik.touched.Solicitante && formik.errors.Solicitante && (
              <div className="text-red-500 font-bold">{formik.errors.Solicitante}</div>
            )
          }
        </div>
        <div className='w-1/2 flex flex-col'>
          <label htmlFor="Jornada" className='font-bold text-white'>
            Jornada
          </label>
          <select
            name="Jornada"  id="Jornada"  value = { formik.values.Jornada } onChange = { formik.handleChange }
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              formik.touched.Jornada && formik.errors.Jornada ? 'border-red-500' : ''
            }`}
          >
            <option value=""> SELECCIONE UNA OPCION </option>
            <option value="MAÑANA">MAÑANA</option>
            <option value="TARDE">TARDE</option>
            <option value="COMPLETA">COMPLETA</option>
          </select>
          {
            formik.touched.Jornada && formik.errors.Jornada && (
              <div className="text-red-500 font-bold">{formik.errors.Jornada}</div>
            )
          }
        </div>
      </div>
      <div className='w-full flex gap-3'>
        <div className='w-1/2 flex flex-col '>
          <label htmlFor="HoraInicio" className='font-bold text-white'>
            Hora Inicio
          </label>
          <input type="time"  name="HoraInicio"  id="HoraInicio"  value = { formik.values.HoraInicio }   onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.HoraInicio && formik.errors.HoraInicio ? 'border-red-500' : 'border-black' }`}/>
          {
            formik.touched.HoraInicio && formik.errors.HoraInicio && (
              <div className="text-red-500 font-bold">{formik.errors.HoraInicio}</div>
            )
          }
        </div>
        <div className='w-1/2 flex flex-col'>
          <label htmlFor="HoraTerminacion" className='font-bold text-white'>
            Hora Final
          </label>
          <input type="time"  name="HoraTerminacion"  id="HoraTerminacion"  value = { formik.values.HoraTerminacion }   onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.HoraTerminacion && formik.errors.HoraTerminacion ? 'border-red-500' : 'border-black' }`}/>
          {
            formik.touched.HoraTerminacion && formik.errors.HoraTerminacion && (
              <div className="text-red-500 font-bold">{formik.errors.HoraTerminacion}</div>
            )
          }
        </div>
      </div> 
      <div className='w-full flex flex-col'>
          <label htmlFor="Observaciones" className='font-bold text-white'>
            Observaciones
          </label>
          <textarea 
            cols="30" 
            name="Observaciones" 
            id="Observaciones" 
            value = { formik.values.Observaciones } 
            onChange = { formik.handleChange } 
            className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Observaciones && formik.errors.Observaciones ? 'border-red-500' : 'border-black' }`}
          ></textarea>
          {
            formik.touched.Observaciones && formik.errors.Observaciones && (
              <div className="text-red-500 font-bold">{formik.errors.Observaciones}</div>
            )
          }
        </div>
      <input
        type="submit"
        className={`w-full h-auto px-4 py-2 bg-[#323c7c] text-white shadow shadow-black cursor-pointer hover:bg-blue-800 transition duration-300 ease-in-out rounded-md `}
        value = 'Registrar!'
      />
    </form>
  )
} 
