import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './ChangePasswordForm.form';
import EyeIcon from '@/Components/Icons/Eye';
import CloseEyeIcon from '@/Components/Icons/CloseEye';
import { useForm } from '@inertiajs/react';

export default function ChangePasswordForm({ status, onClose }) {

  
  useEffect(() => {
    if(status === 'Contraseña Cambiada'){
      onClose()
    }
  }, [status])
  
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordConfirm, setshowPasswordConfirm] = useState(false);

  const { data , post } = useForm()

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.email                = formValue.email
      data.confirm_new_password = formValue.confirm_new_password
      data.new_password         = formValue.new_password
      data.old_password         = formValue.old_password
      console.log(data)
      post(`/change`)
    }
  })
  
  return (
    <form 
      onSubmit = { formik.handleSubmit }
      className = " w-full flex flex-col justify-center items-start  justify-items-center px-4 py-4 gap-1"
    >
      <div className=' w-full flex flex-col md:flex-row justify-center items-start md:items-center justify-items-center px-4 py-4 gap-2'>
        <label htmlFor="old_password" className='font-bold text-white'>
          Email
        </label> 
        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} className="w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black"/>
      </div>
      {
        formik.touched.email && formik.errors.email && (
          <div className="text-red-500">{formik.errors.email}</div>
        )
      }
      <div className=' w-full flex flex-col md:flex-row justify-center items-start md:items-center justify-items-center px-4 py-4 gap-2'>
        <label htmlFor="old_password" className='font-bold text-white'>
          Contraseña Vieja
        </label> 
        <div className="w-full flex justify-center items-center justify-items-center">
          <input
            type={showOldPassword ? "text" : "password"} 
            name="old_password" value={formik.values.old_password} 
            onChange={formik.handleChange}
            className="w-full h-[40px] px-4 py-2 rounded-tl-md rounded-bl-md focus:outline-none border-t border-b border-l border-black"
          />
          <div
            onClick={() => setShowOldPassword(!showOldPassword)} 
            className='w-[40px] h-[40px] bg-white rounded-tr-md rounded-br-md py-2 border-t border-b border-r border-black cursor-pointer flex justify-center'>
            {
              showOldPassword ? (
                <CloseEyeIcon color={`#000`} height={`20px`} width={`20px`}/>
              ) : (
                <EyeIcon color={`#000`} height={20} width={20} />
              )
            }
          </div>
        </div>
      </div>
      {
        formik.touched.old_password && formik.errors.old_password && (
          <div className="text-red-500">{formik.errors.old_password}</div>
        )
      }
      <div className=' w-full flex flex-col md:flex-row justify-center items-start md:items-center justify-items-center px-4 py-4 gap-2'>
        <label htmlFor="new_password" className='font-bold text-white'>
          Contraseña Nueva
        </label>
        <div className="w-full flex justify-center items-center justify-items-center">
          <input
            type={showNewPassword ? "text" : "password"} 
            name="new_password" value={formik.values.new_password} 
            onChange={formik.handleChange}
            className="w-full h-[40px] px-4 py-2 rounded-tl-md rounded-bl-md focus:outline-none border-t border-b border-l border-black"
          />
          <div
            onClick={() => setShowNewPassword(!showNewPassword)} 
            className='w-[40px] h-[40px] bg-white rounded-tr-md rounded-br-md py-2 border-t border-b border-r border-black cursor-pointer flex justify-center'>
            {
              showNewPassword ? (
                <CloseEyeIcon color={`#000`} height={`20px`} width={`20px`}/>
              ) : (
                <EyeIcon color={`#000`} height={`20px`} width={`20px`} />
              )
            }
          </div>
        </div>
      </div>
      {
        formik.touched.new_password && formik.errors.new_password && (
          <div className="text-red-500">{formik.errors.new_password}</div>
        )
      }
      <div className=' w-full flex flex-col md:flex-row justify-center items-start md:items-center justify-items-center px-4 py-4 gap-2'>
        <label htmlFor="confirm_new_password" className='font-bold text-white'>
          Confirmacion de Contraseña Nueva
        </label>
        <div className="w-full flex justify-center items-center justify-items-center">
          <input
            type={showPasswordConfirm ? "text" : "password"} 
            name="confirm_new_password" value={formik.values.confirm_new_password} 
            onChange={formik.handleChange}
            className="w-full h-[40px] px-4 py-2 rounded-tl-md rounded-bl-md focus:outline-none border-t border-b border-l border-black"
          />
          <div
            onClick={() => setshowPasswordConfirm(!showPasswordConfirm)} 
            className='w-[40px] h-[40px] bg-white rounded-tr-md rounded-br-md py-2 border-t border-b border-r border-black cursor-pointer flex justify-center'>
            {
              showPasswordConfirm ? (
                <CloseEyeIcon color={`#000`} height={`20px`} width={`20px`}/>
              ) : (
                <EyeIcon color={`#000`} height={20} width={20} />
              )
            }
          </div>
        </div>
      </div>
      {
        formik.touched.confirm_new_password && formik.errors.confirm_new_password && (
          <div className="text-red-500">{formik.errors.confirm_new_password}</div>
        )
      }
      <input
        type="submit"
        className={`w-full h-auto px-4 py-2 bg-[#323c7c] text-white shadow shadow-black cursor-pointer hover:bg-blue-800 transition duration-300 ease-in-out rounded-md`}
        value = 'Cambiar!'
      />
    </form>
  )
}
