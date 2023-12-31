
import { useFormik } from "formik";
import { initialValue, validationSchema } from './RegisterBonosForm.form';
import { useEffect, useState } from 'react';
import { useForm } from "@inertiajs/react";

export default function RegisterBonos({ cc, onClose }) {

  const { data , post } = useForm()
  
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.cc            = cc
      data.observaciones = formValue.observaciones.toUpperCase()
      data.FechaInicial  = formValue.FechaInicial
      data.FechaFinal    = formValue.FechaFinal
      data.Cliente       = formValue.Cliente.toUpperCase()
      data.Lugar         = formValue.Lugar.toUpperCase()
      data.Ot            = formValue.Ot
      data.tipe          = formValue.tipe
      post(`/bonos/store`)
      onClose()
    }
  })

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');  
  const day = today.getDate();
  
  const currentDate = `${year}-${month}-${String(day).padStart(2, '0')}`;
  const PreviuslyMonth = `${year}-${month-1}-01`;
  const firstDayOfMonth = `${year}-${month}-01`;
  const thirteenthDayOfMonth = `${year}-${month}-30`;
  
  let minDate, maxDate;
  
  if (day >= 1 && day <= 3 ) {
    minDate = PreviuslyMonth;
    maxDate = currentDate;
  } else if ( day >= 4 && day <= 30 ) {
    minDate = firstDayOfMonth;
    maxDate = thirteenthDayOfMonth;
  }
  

  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className="w-full flex flex-col justify-center items-start justify-items-center px-4 py-4 gap-2 bg-gray-800"
        method="POST"
      >
        <label htmlFor="FechaInicial" className='font-bold text-white'>
          Fecha de Inicio de Bono
        </label>
        <input
          type="date" 
          name="FechaInicial" 
          id="FechaInicial" 
          min={minDate}
          max={currentDate}
          value = { formik.values.FechaInicial } 
          onChange = { formik.handleChange } 
          className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.FechaInicial && formik.errors.FechaInicial ? 'border-red-500' : 'border-black' }`} />
        {
          formik.touched.FechaInicial && formik.errors.FechaInicial && (
            <div className="text-red-500 font-bold">{formik.errors.FechaInicial}</div>
          )
        }
        <label htmlFor="FechaFinal" className='font-bold text-white'>
          Fecha de terminacion de Bonos
        </label>
        <input
          type="date" 
          name="FechaFinal" 
          id="FechaFinal" 
          min={minDate}
          max={currentDate}
          value = { formik.values.FechaFinal } 
          onChange = { formik.handleChange } 
          className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.FechaFinal && formik.errors.FechaFinal ? 'border-red-500' : 'border-black' }`} />
        {
          formik.touched.FechaFinal && formik.errors.FechaFinal && (
            <div className="text-red-500 font-bold">{formik.errors.FechaFinal}</div>
          )
        }
        <label htmlFor="Lugar" className='font-bold text-white'>
          Lugar 
        </label>
        <input type="text"  name="Lugar" placeholder='GSI BASE' id="Lugar"  value = { formik.values.Lugar } onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Lugar && formik.errors.Lugar ? 'border-red-500' : 'border-black' }`} />
        {
          formik.touched.Lugar && formik.errors.Lugar && (
            <div className="text-red-500 font-bold">{formik.errors.Lugar}</div>
          )
        }
        <label htmlFor="Cliente" className='font-bold text-white'>
          Cliente
        </label>
        <input type="text" placeholder='GSI SERVICES' name="Cliente"  id="Cliente"  value = { formik.values.Cliente }   onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Cliente && formik.errors.Cliente ? 'border-red-500' : 'border-black' }`}/>
        {
          formik.touched.Cliente && formik.errors.Cliente && (
            <div className="text-red-500 font-bold">{formik.errors.Cliente}</div>
          )
        }
        <div className='w-full flex gap-3'>
          <div className='w-1/2 flex flex-col '>
            <label htmlFor="tipe" className='font-bold text-white'>
              Tipo de OT ( OT u OIT )
            </label>
            <select
              name="tipe"  id="tipe"  value = { formik.values.tipe } onChange = { formik.handleChange }
              className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                formik.touched.tipe && formik.errors.tipe ? 'border-red-500' : ''
              }`}
            >
              <option value=""> SELECCIONE UNA OPCION </option>
              <option value="OT"> OT </option>
              <option value="OIT"> OIT </option>
            </select>
            {
              formik.touched.Ot && formik.errors.Ot && (
                <div className="text-red-500 font-bold">{formik.errors.Ot}</div>
              )
            }
          </div>
          <div className='w-1/2 flex flex-col'>
            <label htmlFor="Ot" className='font-bold text-white'>
              Numero de OT
            </label>
            <input
              type="number" placeholder='Ejemplo: 23051' name="Ot"  id="Ot"  value = { formik.values.Ot } onChange = { formik.handleChange }
              className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                formik.touched.Ot && formik.errors.Ot ? 'border-red-500' : ''
              }`}
            />
            {
              formik.touched.Ot && formik.errors.Ot && (
                <div className="text-red-500 font-bold">{formik.errors.Ot}</div>
              )
            }
          </div>
        </div>
        <label htmlFor="observaciones" className='font-bold text-white'>
          Observaciones
        </label>
        <textarea name="observaciones"  value = { formik.values.observaciones } onChange = { formik.handleChange } id="observaciones" cols="30" rows="2" className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                formik.touched.observaciones && formik.errors.observaciones ? 'border-red-500' : ''
              }`}></textarea>
        {
          formik.touched.observaciones && formik.errors.observaciones && (
            <div className="text-red-500 font-bold">{formik.errors.observaciones}</div>
          )
        }
        <input type="submit" value = "Registrar" className="w-full h-auto px-4 py-2 bg-[#323c7c] hover:bg-blue-800 text-white hover:text-white font-bold rounded-md border border-black hover:border-white cursor-pointer transition duration-300 ease-in-out" />
      </form>
  )
}
