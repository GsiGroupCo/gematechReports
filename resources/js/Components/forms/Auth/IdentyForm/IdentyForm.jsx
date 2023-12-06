
//Componentes de React
import React, { useContext } from 'react'

//Componentes externos
import { Toaster, toast } from 'sonner'
import { useFormik } from "formik";

//Componentes Internos
import { initialValue, validationSchema } from './IdentyForm.form';

//Imagenes
import logo from '../../../../../../public/img/logo_gsi.png';
import { router, useForm } from '@inertiajs/react';


export default function IdentyForm() {

  const { data , get } = useForm()

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        data.cc = formValue.cc
        get(`/dashboard/${data.cc}`)
        onClose()
      } catch (error) {
      }
    }
  })
  
  return (
    <form 
      onSubmit = { formik.handleSubmit }
      className = "flex flex-col justify-center items-center justify-items-center px-4 py-4 gap-4"
    >
        <img src={ logo } alt="logo" className='w-auto h-[125px]' />
        <span className="text-center font-bold">BIENVENIDO <br /> PLANILLA DE REMUNERACIONES GENERAL SERVICES INTERNATIONAL GSI GROUP S.A.S</span>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <label htmlFor="cc" className='font-bold text-black'>
            Contraseña
          </label> 
          <input 
            type="number"
            name="cc"
            id="cc"
            value={formik.values.cc}
            onChange={formik.handleChange}
            placeholder="Ingrese su cedula por favor"
            className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.cc && formik.errors.cc ? 'border-red-500' : 'border-black' }`}
          />
          {
            formik.touched.cc && formik.errors.cc && (
              <div className="text-red-500 font-bold">{formik.errors.cc}</div>
            )
          }
        </div>
        <input type="submit" value={`Entrar`} className="w-full h-auto px-4 py-2 bg-[#323c7c] text-white shadow shadow-black cursor-pointer hover:bg-blue-800 transition duration-300 ease-in-out" />
        <div onClick = { () => router.get('/login') } className="w-full h-auto px-4 py-2 bg-[#323c7c] text-white shadow shadow-black cursor-pointer hover:bg-blue-800 transition duration-300 ease-in-out text-center" >
          Inicia sesión
        </div> 
    </form>
  )
}
