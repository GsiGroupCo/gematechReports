
import React from 'react'

import { Toaster } from 'sonner'
import { useFormik } from "formik";

import { initialValue, validationSchema } from './ExcelBonosForm.form'; 
import { useForm } from '@inertiajs/react';


export default function ExcelBonosForm({ onClose }) {

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => { 
      const enlace = document.getElementById('DownloadFile');
      if (enlace) {
        enlace.href = `/getReporteBonos/${formValue.date_initial}/${formValue.date_finish}`;
        enlace.click();
      }
      onClose();
    }
  })
  
  return (
    <form 
      onSubmit = { formik.handleSubmit }
      className = " w-full flex flex-col justify-center items-start  justify-items-center px-4 py-4 gap-4"
    >
      <label htmlFor="date_initial" className='font-bold text-white'>
        Reporte de Bonos
      </label> 
      <div className=' w-full flex justify-center items-start justify-items-center px-4 py-4 gap-4'>
        <label htmlFor="date_initial" className='font-bold text-white'>
          Fecha inicial
        </label> 
        <input type="date" name="date_initial" value={formik.values.date_initial} onChange={formik.handleChange} className="w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black"/>
      </div>
      {
        formik.touched.date_initial && formik.errors.date_initial && (
          <div className="text-red-500">{formik.errors.date_initial}</div>
        )
      }
      <div className=' w-full flex justify-center items-start justify-items-center px-4 py-4 gap-4'>
        <label htmlFor="date_finish" className='font-bold text-white'>
          Fecha Final
        </label>
        <input type="date" name="date_finish" value={formik.values.date_finish} onChange={formik.handleChange} className="w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black"/>
      </div>
      {
        formik.touched.date_finish && formik.errors.date_finish && (
          <div className="text-red-500">{formik.errors.date_finish}</div>
        )
      }
      <input type="submit" className="w-full h-auto px-4 py-2 bg-[#323c7c] text-white shadow shadow-black cursor-pointer hover:bg-blue-800 transition duration-300 ease-in-out rounded-md" value="Descargar Listado de Bonos"/>
      <a id='DownloadFile'></a>
    </form>
  )
}
