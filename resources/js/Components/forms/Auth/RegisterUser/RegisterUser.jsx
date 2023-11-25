
import { useFormik } from "formik";
import { initialValue, validationSchema } from './RegisterUser.form';
import { useEffect, useState } from "react";
import EyeIcon from "@/Components/Icons/Eye";
import CloseEyeIcon from "@/Components/Icons/CloseEye";
import { useForm } from "@inertiajs/react";

export default function RegisterUser({ onClose }) {

  const [showPassword, setShowPassword] = useState(false);

  const { data , post } = useForm()

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.nombre   = formValue.Nombre
      data.email    = formValue.email
      data.cargo    = formValue.cargo
      data.password = formValue.password
      post(`/register`)
      onClose()
    }
  })

  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className="w-full flex flex-col justify-center items-start bg-gray-800  justify-items-center px-4 py-4 gap-2"
        method="POST"
      >
        <label  className='font-bold text-white'>
            Registro de Usuario
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
        <label htmlFor="email" className='font-bold text-white'>
          Correo Electronico
        </label>
        <input type="email"  name="email"  id="email" placeholder='JhonDoe@groupgsi.com'  value = { formik.values.email } onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-black' }`} />
        {
          formik.touched.email && formik.errors.email && (
            <div className="text-red-500 font-bold">{formik.errors.email}</div>
          )
        }
        <label htmlFor="password" className='font-bold text-white'>
          Password
        </label>
        <div className="w-full flex justify-center items-center justify-items-center">
          <input
            type={showPassword ? "text" : "password"} 
            name="password" value={formik.values.password} 
            onChange={formik.handleChange}
            className="w-full h-[40px] px-4 py-2 rounded-tl-md rounded-bl-md focus:outline-none border-t border-b border-l border-black"
          />
          <div
            onClick={() => setShowPassword(!showPassword)} 
            className='w-[40px] h-[40px] bg-white flex justify-center rounded-tr-md rounded-br-md py-2 border-t border-b border-r border-black cursor-pointer'>
            {
              showPassword ? (
                <CloseEyeIcon height={20} width={20} color={`#000`} />
              ) : (
                <EyeIcon height={20} width={20} color={`#000`}/>
              )
            }
          </div>
        </div>
        {
          formik.touched.password && formik.errors.password && (
            <div className="text-red-500 font-bold">{formik.errors.password}</div>
          )
        }
        <label htmlFor="cargo" className='font-bold text-white'>
          Cargo
        </label>
        <select id="cargo" name="cargo"  value = { formik.values.cargo } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="" disabled> POR FAVOR SELECCIONE UNA OPCION </option>
          <option value="Gerencia">
            Gerencia
          </option>
          <option value="Gerente general">
            Gerente General
          </option>
          <option value="Coordinador de MTTO">
            Director de Mantenimiento
          </option>  
          <option value="HSEQ / GESTION DE TALENTO HUMANO">
            Ingeniero HSQE
          </option>
          <option value="LOGISTICA">
            Logistica
          </option>
          <option value="AUX PERMISOS">
            Auxiliar HSQE
          </option>
          <option value="CONTABILIDAD">
            Contabilidad
          </option>
        </select>
        {
          formik.touched.cargo && formik.errors.cargo && (
            <div className="text-red-500 font-bold">{formik.errors.cargo}</div>
          )
        }
        <input
          type="submit"
          className={`w-full h-auto px-4 py-2 bg-[#323c7c] text-white shadow shadow-black cursor-pointer hover:bg-blue-800 transition duration-300 ease-in-out rounded-md`}
          value='Registrar!'
        />
    </form>
  )
}
