import React, { useEffect, useState } from 'react'
import Modal from '../../UI/Modal';

export default function Aprobados({ Permisos, Auth }) {

    const [datosFiltrados, setDatosFiltrados] = useState(Permisos);

    const [ModalShow, setModalShow] = useState(false);

    const [PermisoSelected, setPermisoSelected] = useState({
      permiso_id        : "",
      empleado_id       : "" ,
      motivo            : "" ,
      fecha_inicio      : "" ,
      fecha_terminacion : "" ,
      jornada           : "" ,
      hora_inicio       : "" ,
      hora_fin          : "" ,
      cant_horas        : "" ,
      observaciones     : "" ,
      estado            : ""         
    }) 
     
    useEffect(() => {
      setDatosFiltrados(Permisos)
    }, [Permisos])
    
    const filterData = ( searchTerm ) => {
      const filtered = Permisos.filter((permisos) => {
          const permiso_id        = permisos.permiso_id.toLowerCase();
          const empleado_id       = permisos.responsable.nombre.toLowerCase();
          const motivo            = permisos.motivo.toLowerCase();
          const fecha_inicio      = permisos.fecha_inicio.toString().toLowerCase();
          const fecha_terminacion = permisos.fecha_terminacion.toLowerCase();
          const jornada           = permisos.jornada.toLowerCase();
          const hora_inicio       = permisos.hora_inicio.toLowerCase();
          const hora_fin          = permisos.hora_fin.toLowerCase();
          const cant_horas        = permisos.cant_horas.toLowerCase();
          const observaciones     = permisos.observaciones.toLowerCase();
          const estado            = permisos.estado.toLowerCase(); 
          return (
                permiso_id.includes(searchTerm)         ||
                empleado_id.includes(searchTerm)        ||
                motivo.includes(searchTerm)             ||
                fecha_inicio.includes(searchTerm)       ||
                fecha_terminacion.includes(searchTerm)  ||
                jornada.includes(searchTerm)            ||
                hora_inicio.includes(searchTerm)        ||
                hora_fin.includes(searchTerm)           ||
                cant_horas.includes(searchTerm)         ||
                observaciones.includes(searchTerm)      ||
                estado.includes(searchTerm)
          );
      });
      setDatosFiltrados(filtered);
    };

  return (
    <div className="w-full h-auto bg-gray-200 flex flex-col justify-start items-start justify-items-center">
      <div className='w-full h-auto bg-gray-200 gap-2 flex justify-evenly items-center justify-items-center p-2 '>
        <input 
          type="text" 
          placeholder='Buscar...' 
          className='w-full h-[45px] text-black px-4 py-2 focus:outline-none bg-white border border-black rounded-md ' 
          onChange={(e) => filterData(e.target.value.toLowerCase())}
        />
      </div>
      <div  className=' hidden w-full h-auto border-b-2 border-[#323c7c] cursor-pointer md:flex flex-col md:flex-row justify-center items-center justify-items-center bg-white'>
          <div className='w-full py-4 md:w-full h-full flex flex-col md:flex-row justify-center items-center justify-items-center bg-[#323c7c] text-white'>
            <div className={`${Auth ? 'w-[12%]' : 'hidden'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> Estado </span>
            </div>
            <div className={`${Auth ? 'w-[12%]' : 'w-[14%]'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> Nombre </span>
            </div>
            <div className={`${Auth ? 'w-[12%]' : 'w-[14%]'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> Motivo </span>
            </div>
            <div className={`${Auth ? 'w-[12%]' : 'w-[14%]'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> Fecha Inicio </span>
            </div>
            <div className={`${Auth ? 'w-[12%]' : 'w-[14%]'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> Fecha Final  </span>
            </div>
            <div className={`${Auth ? 'w-[12%]' : 'w-[14%]'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> Hora Inicio </span>
            </div>
            <div className={`${Auth ? 'w-[12%]' : 'w-[14%]'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> Hora Final </span>
            </div>
            <div className={`${Auth ? 'w-[12%]' : 'w-[14%]'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> Jornada </span>
            </div>
          </div>
      </div>
      {
        datosFiltrados 
        ?  
          datosFiltrados.map((permisos) => (
                <div key = { permisos.permiso_id } onClick = { () => {
                    setPermisoSelected({
                        permiso_id        : permisos.permiso_id,
                        empleado_id       : permisos.empleado_id,
                        motivo            : permisos.motivo ,
                        fecha_inicio      : permisos.fecha_inicio,
                        fecha_terminacion : permisos.fecha_terminacion,
                        jornada           : permisos.jornada,
                        hora_inicio       : permisos.hora_inicio,
                        hora_fin          : permisos.hora_fin,
                        cant_horas        : permisos.cant_horas,
                        observaciones     : permisos.observaciones,
                        estado            : permisos.estado    
                    })
                    setModalShow(true)
                }} className='w-full h-auto border-b-2  cursor-pointer  px-4 py-4 gap-3  flex flex-col justify-center items-center justify-items-center bg-white'>
                    <div className='w-full  h-full flex flex-col md:flex-row text-center justify-evenly items-start justify-items-center'>
                      <div className={`${Auth ? 'w-full lg:w-[12%]' : 'w-full md:w-[14%]'} h-full flex justify-start lg:justify-center items-center`}>
                        <span className='font-semibold'><span className="sm:hidden"> Trabajador: </span> { permisos.estado } </span>
                      </div>
                      <div className={`${Auth ? 'w-full lg:w-[12%]' : 'w-full md:hidden'} h-full flex justify-start lg:justify-center items-center`}>
                        <span className='font-semibold'><span className="sm:hidden"> Trabajador: </span> { permisos.responsable.nombre } </span>
                      </div>
                      <div className={`${Auth ? 'w-full lg:w-[12%]' : 'w-full md:w-[14%]'} h-full flex justify-start lg:justify-center items-center`}>
                        <span className='font-semibold'><span className="sm:hidden"> Motivo: </span> { permisos.motivo }</span>
                      </div>
                      <div className={`${Auth ? 'w-full lg:w-[12%]' : 'w-full md:w-[14%]'} h-full flex justify-start lg:justify-center items-center`}>
                        <span className='font-semibold'><span className="sm:hidden"> Fecha Inicio: </span> { permisos.fecha_inicio }</span>
                      </div>
                      <div className={`${Auth ? 'w-full lg:w-[12%]' : 'w-full md:w-[14%]'} h-full flex justify-start lg:justify-center items-center`}>
                        <span className='font-semibold'><span className="sm:hidden"> Fecha Terminacion: </span> { permisos.fecha_terminacion }</span>
                      </div>
                      <div className={`${Auth ? 'w-full lg:w-[12%]' : 'w-full md:w-[14%]'} h-full flex justify-start lg:justify-center items-center`}>
                        <span className='font-semibold'><span className="sm:hidden"> Hora Inicial: </span> { permisos.hora_inicio }</span>
                      </div>
                      <div className={`${Auth ? 'w-full lg:w-[12%]' : 'w-full md:w-[14%]'} h-full flex justify-start lg:justify-center items-center`}>
                        <span className='font-semibold'><span className="sm:hidden"> Hora Final: </span> { permisos.hora_fin }</span>
                      </div>
                      <div className={`${Auth ? 'w-full lg:w-[12%]' : 'w-full md:w-[14%]'} h-full flex justify-start lg:justify-center items-center`}>
                        <span className='font-semibold'><span className="sm:hidden"> Jornada: </span> { permisos.jornada }</span>
                      </div>
                    </div>
                </div>
            ))
        : null
      }
      <Modal
        isVisible = { ModalShow }
        tittle = {` Detalles de Hora `}
        onClose = { () => setModalShow(false) }
      >
        <div className="w-full h-auto p-4 flex flex-col justify-center items-center gap-3 ">
          <div className="w-full flex justify-start items-center rounded-md border border-black px-4 py-2">
           TRABAJADOR : { PermisoSelected.empleado_id }
          </div>
          <div className="w-full flex flex-row justify-start items-center gap-3">
            <div className="w-1/2 border border-black rounded-md px-4 py-2">
              Hora de inicio: { PermisoSelected.hora_inicial }
            </div>
            <div className="w-1/2 border border-black rounded-md px-4 py-2">
              Hora de finalizacion: { PermisoSelected.hora_final }
            </div>
          </div>
          <div className="w-full flex flex-row justify-start items-center gap-3">
            <div className="w-1/2 border border-black rounded-md px-4 py-2">
              OT: { PermisoSelected.ot }
            </div>
            <div className="w-1/2 border border-black rounded-md px-4 py-2">
              Fecha: { PermisoSelected.fecha }
            </div>
          </div>
          <div className="w-full flex justify-start items-center rounded-md border border-black px-4 py-2">
           OBSERVACIONES : { PermisoSelected.observaciones }
          </div>
        </div>
      </Modal>
    </div>
  )
}
