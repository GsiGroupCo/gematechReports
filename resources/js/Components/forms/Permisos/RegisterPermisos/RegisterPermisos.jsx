import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import { initialValue, validationSchema } from './RegisterPermisos.form';
import { useForm } from '@inertiajs/react';

export default function RegisterPermisos({ Personal, onClose }) {
  
  const [files, setFiles] = useState([]);
  const [filtro, setFiltro] = useState("");
  const { data , post } = useForm()
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => { 
      data.Motivo           = formValue.Motivo;
      data.FechaInicio      = formValue.FechaInicio;
      data.FechaTerminacion = formValue.FechaTerminacion;
      data.Solicitante      = formValue.Solicitante;
      data.Jornada          = formValue.Jornada;
      data.HoraInicio       = formValue.HoraInicio;
      data.HoraTerminacion  = formValue.HoraTerminacion; 
      data.Observaciones    = formValue.Observaciones;
      for (const key in checkboxValues) {
        data[key] = checkboxValues[key];
      }
      files.forEach((file, index) => {
        const propertyName  = `Docs_${index + 1}`;
        data[propertyName]  = file;
      });
      data.CantDocs = files.length;
      post('/permisos/store')
      onClose();
    }
  })

  
  const [checkboxValues, setCheckboxValues] = useState({
    Rec: false,
    NotRec: false,
  });
  
  const Areas = [{
    "id"     : "101168387",
    "value"  : "Rec",
    "name"   : "Remunerado"
  },{
    "id"     : "63153517",
    "value"  : "NotRec",
    "name"   : "No Remunerado"
  }]

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file));
    };
  }, [files]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files; 
    setFiles([...files, ...Array.from(selectedFiles)]);
  };
  
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target; 
    const newCheckboxValues = { ...checkboxValues, [name]: checked }; 
    if (checked) {
      const otherCheckbox = name === 'Rec' ? 'NotRec' : 'Rec';
      newCheckboxValues[otherCheckbox] = false;
    }
    setCheckboxValues(newCheckboxValues);
  };

  return (
    <form 
      onSubmit = { formik.handleSubmit }
      className="min-w-[540px] w-full  sm:h-[500px] overflow-y-auto flex flex-col justify-start items-start bg-gray-800  justify-items-center px-4 py-4 gap-5 "
      method="POST"
    >
      <div className='w-full flex flex-col '>
        <label htmlFor="Motivo" className='font-bold text-white'>
          Motivo
        </label>  
        <select
          name="Motivo"  id="Motivo"  value = { formik.values.Motivo } onChange = { formik.handleChange }
          className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            formik.touched.Motivo && formik.errors.Motivo ? 'border-red-500' : ''
          }`}
        >
          <option value="" disabled> SELECCIONE UNA OPCION </option>
          <option value="CALAMIDAD"> CALAMIDAD </option>
          <option value="LICENCIA"> LICENCIA </option>
          <option value="CITA MEDICA"> CITA MEDICA</option>
          <option value="PERSONAL"> PERSONAL </option>
          <option value="LOGISTICA"> LOGISTICA </option>
          <option value="VACACIONAL"> VACACIONAL </option>
          <option value="OTRO"> OTRO </option>
        </select>
        {
          formik.touched.Motivo && formik.errors.Motivo && (
            <div className="text-red-500 font-bold">{formik.errors.Motivo}</div>
          )
        }
      </div>
      <div className='w-full flex gap-3'>
        <div className='w-1/2 flex flex-col'>
          <label htmlFor="FechaInicio" className='font-bold text-white'>
            Fecha Inicio
          </label>
          <input type="date"  name="FechaInicio"  id="FechaInicio"  value = { formik.values.FechaInicio } onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.FechaInicio && formik.errors.FechaInicio ? 'border-red-500' : 'border-black' }`} />
          {
            formik.touched.FechaInicio && formik.errors.FechaInicio && (
              <div className="text-red-500 font-bold">{formik.errors.FechaInicio}</div>
            )
          }
        </div>
        <div className='w-1/2 flex flex-col'>
          <label htmlFor="FechaTerminacion" className='font-bold text-white'>
            Fecha Terminacion
          </label>
          <input type="date"  name="FechaTerminacion"  id="FechaTerminacion"  value = { formik.values.FechaTerminacion }   onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.FechaTerminacion && formik.errors.FechaTerminacion ? 'border-red-500' : 'border-black' }`}/>
          {
            formik.touched.FechaTerminacion && formik.errors.FechaTerminacion && (
              <div className="text-red-500 font-bold">{formik.errors.FechaTerminacion}</div>
            )
          }
        </div>
      </div>
      <div className='w-full flex flex-col '>
        <label htmlFor="Solicitante" className='font-bold text-white'>
          Solicitante
        </label>
        <input 
            type="text" 
            value={filtro} 
            onChange={(e) => setFiltro(e.target.value)} 
            placeholder="Filtrar por nombre..."
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <select
          name="Solicitante"  id="Solicitante"  value = { formik.values.Solicitante } onChange = { formik.handleChange }
          className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            formik.touched.Solicitante && formik.errors.Solicitante ? 'border-red-500' : ''
          }`}
        >
          <option value="" disabled> SELECCIONE UNA OPCION </option>
          {
              Personal ? 
                Personal.filter(data => data.nombre.toLowerCase().includes(filtro)).map((personal) => (
                  <option key={personal.empleado_id} value={personal.empleado_id}>{personal.nombre}</option>
                ))
              : null
          }
        </select>
        {
          formik.touched.Solicitante && formik.errors.Solicitante && (
            <div className="text-red-500 font-bold">{formik.errors.Solicitante}</div>
          )
        }
      </div> 
      <div className='w-full flex flex-col'>
        <label htmlFor="Jornada" className='font-bold text-white'>
          Jornada
        </label>
        <select
          name="Jornada"  id="Jornada"  value = { formik.values.Jornada } onChange = { formik.handleChange }
          className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            formik.touched.Jornada && formik.errors.Jornada ? 'border-red-500' : ''
          }`}
        >
          <option value="" disabled> SELECCIONE UNA OPCION </option>
          <option value="MAÑANA">MAÑANA</option>
          <option value="TARDE">TARDE</option>
          <option value="COMPLETA">COMPLETA</option>
        </select>
        {
          formik.touched.Jornada && formik.errors.Jornada && (
            <div className="text-red-500 font-bold">{formik.errors.Jornada}</div>
          )
        }
      </div>
      <div className='w-full flex gap-3'>
        <div className='w-1/2 flex flex-col '>
          <label htmlFor="HoraInicio" className='font-bold text-white'>
            Hora Inicio
          </label>
          <input type="time"  name="HoraInicio"  id="HoraInicio"  value = { formik.values.HoraInicio }   onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.HoraInicio && formik.errors.HoraInicio ? 'border-red-500' : 'border-black' }`}/>
          {
            formik.touched.HoraInicio && formik.errors.HoraInicio && (
              <div className="text-red-500 font-bold">{formik.errors.HoraInicio}</div>
            )
          }
        </div>
        <div className='w-1/2 flex flex-col'>
          <label htmlFor="HoraTerminacion" className='font-bold text-white'>
            Hora Final
          </label>
          <input type="time"  name="HoraTerminacion"  id="HoraTerminacion"  value = { formik.values.HoraTerminacion }   onChange = { formik.handleChange } className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.HoraTerminacion && formik.errors.HoraTerminacion ? 'border-red-500' : 'border-black' }`}/>
          {
            formik.touched.HoraTerminacion && formik.errors.HoraTerminacion && (
              <div className="text-red-500 font-bold">{formik.errors.HoraTerminacion}</div>
            )
          }
        </div>
      </div> 
      <div className='w-full flex flex-col'>
          <label htmlFor="Observaciones" className='font-bold text-white'>
            Observaciones
          </label>
          <textarea 
            cols="30" 
            name="Observaciones" 
            id="Observaciones" 
            value = { formik.values.Observaciones } 
            onChange = { formik.handleChange } 
            className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Observaciones && formik.errors.Observaciones ? 'border-red-500' : 'border-black' }`}
          ></textarea>
          {
            formik.touched.Observaciones && formik.errors.Observaciones && (
              <div className="text-red-500 font-bold">{formik.errors.Observaciones}</div>
            )
          }
        </div>
        <div className='w-full h-auto flex justify-center items-center gap-3'>
          {
            Areas.map((area) => (
              <label
                key={area.id}
                className="w-full cursor-pointer flex justify-start items-center gap-2  hover:border-white  rounded-md px-4 py-2 hover:bg-[#323c7c] border border-gray-300 text-white text-sm font-bold transition duration-700 ease-in-out"
              >
                <input
                  type="checkbox"
                  name={area.value}
                  checked={checkboxValues[area.value]}
                  onChange={handleCheckboxChange}
                  className="rounded-full"
                />
                {area.name}
              </label>
            ))
          }
        </div>
        <div className='w-full h-auto'>
          {
            files.length > 0 ?  (
              <div className='w-full h-full grid grid-cols-3 gap-4  px-4 py-2'>
                {
                  files.map((file, index) => (
                  <div key={index} className='w-auto max-w-[200px] max-h-[150px] h-auto rounded-md'>
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`File ${index}`}
                        className="w-full h-full object-cover "
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-auto h-auto border-2 px-4 py-2 border-gray-300 border-dashed rounded-lg">
                        <p>{file.name}</p>
                      </div>
                    )}
                  </div>
                ))}
                <label htmlFor="Image" className=" flex flex-col items-center justify-center w-full h-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center p-4 ">
                      <p className="text-xs text-gray-500 dark:text-gray-400"> Agregar  mas Documentos </p>
                  </div>
                  <input
                    id="Image"
                    name="Image"
                    type="file"
                    accept="image/*,.pdf,.doc,.docx" 
                    multiple  
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <label htmlFor="Image" className=" flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click para subir</span> o selecciona y desliza aqui </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input
                  id="Image"
                  name="Image"
                  type="file"
                  accept="image/*,.pdf,.doc,.docx" 
                  multiple  
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )
          }
          {
            formik.touched.taq && formik.errors.taq && (
              <div className="text-red-500 font-bold">{formik.errors.taq}</div>
            )
          }
        </div>
      <input
        type="submit"
        className={`w-full h-auto px-4 py-2 bg-[#323c7c] text-white shadow shadow-black cursor-pointer hover:bg-blue-800 transition duration-300 ease-in-out rounded-md `}
        value = 'Registrar!'
      />
    </form>
  )
} 
