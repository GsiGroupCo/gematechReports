import Search from '@/Components/UI/Search';
import React, { useEffect, useState } from 'react'

export const PermisoRow = ({ Permisos, Auth }) => {

    const [datosFiltrados, setDatosFiltrados] = useState(Permisos);

    useEffect(() => {
        setDatosFiltrados(Permisos)
    }, [Permisos])
    
    const filterData = ( searchTerm ) => {
        if(Auth){
            const filtered = Permisos.filter((permiso) => {
                const nombre_empleado = permiso.responsable.nombre.toLowerCase();
                const cantHoras = permiso.cant_horas.toLowerCase();
                const estado = permiso.estado.toLowerCase();
                const fecha_inicio = permiso.fecha_inicio.toString().toLowerCase();
                const fecha_terminacion = permiso.fecha_terminacion.toString().toLowerCase();
                const hora_fin = permiso.hora_fin.toString().toLowerCase();
                const jornada = permiso.jornada.toLowerCase();
                const motivo = permiso.motivo.toLowerCase();
                return (
                    nombre_empleado.includes(searchTerm) ||
                    cantHoras.includes(searchTerm) || 
                    estado.includes(searchTerm) ||
                    fecha_inicio.includes(searchTerm)|| 
                    fecha_terminacion.includes(searchTerm) ||
                    hora_fin.includes(searchTerm) ||
                    jornada.includes(searchTerm) ||
                    motivo.includes(searchTerm)
                );
            });
            setDatosFiltrados(filtered);
        }else{
            const filtered = Permisos.filter((permiso) => { 
                const cantHoras = permiso.cant_horas.toLowerCase();
                const estado = permiso.estado.toLowerCase();
                const fecha_inicio = permiso.fecha_inicio.toString().toLowerCase();
                const fecha_terminacion = permiso.fecha_terminacion.toString().toLowerCase();
                const hora_fin = permiso.hora_fin.toString().toLowerCase();
                const jornada = permiso.jornada.toLowerCase();
                const motivo = permiso.motivo.toLowerCase();
                return ( 
                    cantHoras.includes(searchTerm) || 
                    estado.includes(searchTerm) ||
                    fecha_inicio.includes(searchTerm)|| 
                    fecha_terminacion.includes(searchTerm) ||
                    hora_fin.includes(searchTerm) ||
                    jornada.includes(searchTerm) ||
                    motivo.includes(searchTerm)
                );
            });
            setDatosFiltrados(filtered);
        }
    };

    return (
        <>
            <div className='w-full h-auto bg-gray-200 gap-2 flex justify-evenly items-center justify-items-center p-2 '> 
                <Search SearchEvent={(e) => { 
                    filterData(e)
                }} />
            </div>
            <div  className=' hidden w-full h-auto border-b-2  cursor-pointer md:flex flex-col md:flex-row justify-center items-center justify-items-center bg-white'>
                <div className='w-full py-4 md:w-full h-full flex flex-col md:flex-row text-center justify-center items-center justify-items-center bg-[#323c7c] text-white'>
                    <div className={`${Auth ? 'w-[14%]' : 'hidden'} h-full flex justify-center items-center`}>
                        <span className='font-bold text-center'> NOMBRE </span>
                    </div>
                    <div className={`${Auth ? 'w-[14%]' : 'w-[16%]'} h-full flex justify-center items-center`}>
                        <span className='font-bold text-center'> MOTIVO </span>
                    </div>
                    <div className={`${Auth ? 'w-[14%]' : 'w-[16%]'} h-full flex justify-center items-center`}>
                        <span className='font-bold text-center'>FECHA DE INICIO </span>
                    </div>
                    <div className={`${Auth ? 'w-[14%]' : 'w-[16%]'} h-full flex justify-center items-center`}>
                        <span className='font-bold text-center'> FECHA TERMINACION  </span>
                    </div>
                    <div className={`${Auth ? 'w-[14%]' : 'w-[16%]'} h-full flex justify-center items-center`}>
                        <span className='font-bold text-center'> HORA INICIO </span>
                    </div>
                    <div className={`${Auth ? 'w-[14%]' : 'w-[16%]'} h-full flex justify-center items-center`}>
                        <span className='font-bold text-center'> HORA FIN </span>
                    </div>
                    <div className={`${Auth ? 'w-[14%]' : 'w-[16%]'} h-full flex justify-center items-center`}>
                        <span className='font-bold text-center'> JORNADA </span>
                    </div>
                </div>
            </div>
            {
                datosFiltrados ? 
                    datosFiltrados.map((permisos) => (
                        <div key = { permisos.id } className='w-full h-auto border-b-2 cursor-pointer  px-4 py-2  flex flex-col md:flex-row justify-start md:justify-center items-center justify-items-center bg-white'>
                            <div className='w-full md:w-full h-full   flex flex-col md:flex-row '>
                                <div className={`${Auth ? 'w-full md:w-[14%]' : 'hidden'} h-full flex justify-start md:justify-center items-center`}>
                                    <span className='font-semibold text-center flex flex-row md:flex-col'> { permisos.responsable.nombre } </span>
                                </div>
                                <div className={`${Auth ? 'w-full md:w-[14%]' : 'w-full md:w-[16%]'} h-full flex  justify-start md:justify-center items-center`}>
                                    <span className='font-semibold text-center flex flex-row md:flex-col'> { permisos.motivo } </span>
                                </div>
                                <div className={`${Auth ? 'w-full md:w-[14%]' : 'w-full md:w-[16%]'} h-full flex  justify-start md:justify-center items-center`}>
                                    <span className='font-semibold text-center flex flex-row md:flex-col'> { permisos.fecha_inicio.toString() } </span>
                                </div>
                                <div className={`${Auth ? 'w-full md:w-[14%]' : 'w-full md:w-[16%]'} h-full flex  justify-start md:justify-center items-center`}>
                                    <span className='font-semibold text-center flex flex-row md:flex-col'> { permisos.fecha_terminacion.toString() }  </span>
                                </div>
                                <div className={`${Auth ? 'w-full md:w-[14%]' : 'w-full md:w-[16%]'} h-full flex  justify-start md:justify-center items-center`}>
                                    <span className='font-semibold text-center flex flex-row md:flex-col'> { permisos.hora_inicio } </span>
                                </div>
                                <div className={`${Auth ? 'w-full md:w-[14%]' : 'w-full md:w-[16%]'} h-full flex  justify-start md:justify-center items-center`}>
                                    <span className='font-semibold text-center flex flex-row md:flex-col'> { permisos.hora_fin } </span>
                                </div>
                                <div className={`${Auth ? 'w-full md:w-[14%]' : 'w-full md:w-[16%]'} h-full flex  justify-start md:justify-center items-center`}>
                                    <span className='font-semibold text-center flex flex-row md:flex-col'> { permisos.jornada }  </span>
                                </div>
                            </div>
                        </div>  
                    ))
                : null
            }
        </>
    )
}
