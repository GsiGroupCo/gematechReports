
import { useFormik } from "formik";

import { initialValue, validationSchema } from './LoginForm.form';

import logo from '../../../../../../public/img/logo_gsi.png';
import { useForm } from "@inertiajs/react";

export default function LoginForm() {

  const { data , post } = useForm()

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        data.email = formValue.email
        data.password = formValue.password
        post('/token')
      } catch (error) {
      }
    }
  })
  
  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className="flex  flex-col justify-center items-center justify-items-center px-4 py-4 gap-4"
        method="POST"
      >
      <img src={logo} alt="logo GSI" className="w-auto h-[125px]"/> 
      <span className="text-center font-bold"> BIENVENIDO  <br />PLANILLA DE REMUNERACIONES GENERAL SERVICES INTERNATIONAL GSI GROUP S.A.S </span>
      <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
        <label htmlFor="email" className='font-bold text-black'>
          Email
        </label> 
        <input 
          type="email"
          name="email"
          id="email"
          value = { formik.values.email } 
          onChange = { formik.handleChange } 
          placeholder="gsi@gsigroup.com" 
          className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-black' }`} 
        />
        {
          formik.touched.email && formik.errors.email && (
            <div className="text-red-500 font-bold">{formik.errors.email}</div>
          )
        }
      </div>
      <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
        <label htmlFor="password" className='font-bold text-black'>
          Contraseña
        </label> 
        <input 
          type="password"
          name="password"
          id="password"
          value = { formik.values.password }
          onChange = { formik.handleChange }
          placeholder="gsi@gsigroup.com"
          className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-black' }`}
        />
        {
          formik.touched.password && formik.errors.password && (
            <div className="text-red-500 font-bold">{formik.errors.password}</div>
          )
        }
      </div>
      <input type="submit" value = "Inicia sesión" className="w-full h-auto px-4 py-2 bg-[#323c7c] text-white shadow shadow-black cursor-pointer hover:bg-blue-800 transition duration-300 ease-in-out" />
    </form>
  )
}
