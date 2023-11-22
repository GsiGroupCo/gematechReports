import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './RegisterWorker.form';
import { useForm } from '@inertiajs/react';

export default function RegisterWorker({ onClose, status }) {

  useEffect(() => {
    if(status === 'Trabajador Registrado'){
      onClose()
    }
  }, [status])

  const { data , post } = useForm()

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.nombre = formValue.Nombre
      data.cargo  = formValue.cargo
      data.cc     = formValue.cc
      post(`/worker/store`)
    }
  })

  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className="w-full flex flex-col justify-center items-start bg-gray-800  justify-items-center px-4 py-4 gap-2"
        method="POST"
      >
        <label className='font-bold text-white'>
            Registro de Empleado
        </label>
        <label htmlFor="Nombre" className='font-bold text-white'>
            Nombre
        </label>
        <input type="text" name="Nombre" id="Nombre" placeholder='Jhon Doe' value = { formik.values.Nombre } onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Nombre && formik.errors.Nombre ? 'border-red-500' : 'border-black' }`} />
        {
          formik.touched.Nombre && formik.errors.Nombre && (
            <div className="text-red-500 font-bold">{formik.errors.Nombre}</div>
          )
        }
        <label htmlFor="cargo" className='font-bold text-white'>
            Cargo
        </label>
        <input type="text" name="cargo" id="cargo" value = { formik.values.cargo } onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.cargo && formik.errors.cargo ? 'border-red-500' : 'border-black' }`} />
        {
          formik.touched.cargo && formik.errors.cargo && (
            <div className="text-red-500 font-bold">{formik.errors.cargo}</div>
          )
        }
        <label htmlFor="cc" className='font-bold text-white'>
          Cedula de Ciudadania
        </label>
        <input
          type="number"
          name="cc"
          id="cc"
          min = { 0 }
          value={formik.values.cc} 
          onChange={formik.handleChange}
          className="w-full h-[40px] px-4 py-2 rounded-tl-md rounded-bl-md focus:outline-none border-t border-b border-l border-black"
        />
        {
          formik.touched.cc && formik.errors.cc && (
            <div className="text-red-500 font-bold">{formik.errors.cc}</div>
          )
        }
        <input
          type="submit"
          className={`w-full h-auto px-4 py-2 bg-[#323c7c] text-white shadow shadow-black cursor-pointer hover:bg-blue-800 transition duration-300 ease-in-out rounded-md `}
          value={`Registrar!`}
        />
    </form>
  )
}
