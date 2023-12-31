
import { useFormik } from "formik";
import { initialValue, validationSchema } from './EditBonosForm.form'; 
import { useForm } from "@inertiajs/react";

export default function EditBonos({ BonoData , onClose }) {

  const { data , post } = useForm()
  
  const formik = useFormik({
    initialValues:initialValue(BonoData),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.bono_id     = BonoData.bono_id
      data.Fecha       = formValue.Fecha
      data.Cliente     = formValue.Cliente.toUpperCase()
      data.Lugar       = formValue.Lugar.toUpperCase()
      data.Ot          = formValue.Ot
      data.tipe        = formValue.tipe
      post(`/bonos/update`)
      onClose()
    }
  })

  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className="w-full flex flex-col justify-center items-start justify-items-center px-4 py-4 gap-2 bg-gray-800"
        method="POST"
      >
        <label htmlFor="Fecha" className='font-bold text-white'>
          Fecha de Bono
        </label>
        <input type="date" name="Fecha" id="Fecha" value = { formik.values.Fecha } onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Fecha && formik.errors.Fecha ? 'border-red-500' : 'border-black' }`} />
        {
          formik.touched.Fecha && formik.errors.Fecha && (
            <div className="text-red-500 font-bold">{formik.errors.Fecha}</div>
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
        <input type="submit" value = "Registrar" className="w-full h-auto px-4 py-2 bg-green-500 hover:bg-green-800 text-black hover:text-white font-bold rounded-md border border-black hover:border-white cursor-pointer transition duration-300 ease-in-out" />
      </form>
  )
}
