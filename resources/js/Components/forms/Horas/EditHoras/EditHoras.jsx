import { useFormik } from "formik";
import { initialValue, validationSchema } from './EditHorasForm.form';
import { useForm } from '@inertiajs/react';

export default function EditHoras({ HoraData, onClose }) { 

  const { data , post } = useForm()
  
  const formik = useFormik({
    initialValues:initialValue(HoraData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.horasextras_id  = HoraData.horasextras_id
      data.Fecha           = formValue.Fecha
      data.HoraFinal       = formValue.HoraFinal
      data.HoraInicial     = formValue.HoraInicial
      data.Ot              = formValue.Ot
      data.tipe            = formValue.tipe
      post(`/horas/update`)
      onClose()
    }
  })

  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className="w-full flex flex-col justify-center items-start bg-gray-800  justify-items-center px-4 py-4 gap-2"
        method="POST"
      >
        <label htmlFor="Fecha" className='font-bold text-white'>
          Fecha de Hora Extra
        </label>
        <input type="date" name="Fecha" id="Fecha" value = { formik.values.Fecha } onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Fecha && formik.errors.Fecha ? 'border-red-500' : 'border-black' }`} />
        {
          formik.touched.Fecha && formik.errors.Fecha && (
            <div className="text-red-500 font-bold">{formik.errors.Fecha}</div>
          )
        }
        <label htmlFor="HoraInicial" className='font-bold text-white'>
          Hora de Inicio
        </label>
        <input type="time"  name="HoraInicial"  id="HoraInicial"  value = { formik.values.HoraInicial } onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.HoraInicial && formik.errors.HoraInicial ? 'border-red-500' : 'border-black' }`} />
        {
          formik.touched.HoraInicial && formik.errors.HoraInicial && (
            <div className="text-red-500 font-bold">{formik.errors.HoraInicial}</div>
          )
        }
        <label htmlFor="HoraFinal" className='font-bold text-white'>
          Hora Final
        </label>
        <input type="time"  name="HoraFinal"  id="HoraFinal"  value = { formik.values.HoraFinal }   onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.HoraFinal && formik.errors.HoraFinal ? 'border-red-500' : 'border-black' }`}/>
        {
          formik.touched.HoraFinal && formik.errors.HoraFinal && (
            <div className="text-red-500 font-bold">{formik.errors.HoraFinal}</div>
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
              formik.touched.tipe && formik.errors.tipe && (
                <div className="text-red-500 font-bold">{formik.errors.tipe}</div>
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
        <input
          type="submit"
          className={`w-full h-auto px-4 py-2 bg-[#323c7c] text-white shadow shadow-black cursor-pointer hover:bg-blue-800 transition duration-300 ease-in-out rounded-md `}
          value = 'Editar!'
        />
      </form>
  )
} 
