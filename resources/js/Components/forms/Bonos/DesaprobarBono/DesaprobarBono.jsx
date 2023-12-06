import { useFormik } from "formik";
import { initialValue, validationSchema } from './DesaprobarBono.form';
import { useForm } from '@inertiajs/react';

export default function DesaprobarBono({ BonoData, onClose, Admin }) { 

  const { data , post } = useForm()
  
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.bono_id      = BonoData.bono_id
      data.descripcion  = formValue.detalles
      data.user_id      = Admin.user_id
      post(`/bono/desaprobada`)
      onClose()
    }
  })

  return (  
    <form 
      onSubmit = { formik.handleSubmit }
      className="w-full flex flex-col justify-center items-start bg-gray-800  justify-items-center px-4 py-4 gap-2"
      method="POST"
    >
      <label htmlFor="detalles" className='font-bold text-white'>
        Detalles
      </label>
      <textarea name="detalles" id="detalles" value = { formik.values.detalles } onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.detalles && formik.errors.detalles ? 'border-red-500' : 'border-black' }`} />
      {
        formik.touched.detalles && formik.errors.detalles && (
          <div className="text-red-500 font-bold">{formik.errors.detalles}</div>
        )
      } 
      <input
        type="submit"
        className={`w-full h-auto px-4 py-2 bg-red-500 text-white hover:font-semibold shadow shadow-black cursor-pointer hover:bg-red-800 transition duration-700 ease-in-out rounded-md `}
        value = 'Desaprobar'
      />
    </form>
  )
} 
