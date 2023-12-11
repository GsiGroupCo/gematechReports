import React, { useState } from 'react'
import Aprobados from './Aprobados'
import Pendientes from './Pendientes' 

export default function PanelPermisos({  Permisos, Auth, Admin }) {
     
    const [PermisosTotales, setPermisosTotales] = useState(false)
    const [PermisosPendientes, setPermisosPendientes] = useState(false)
 
    function ShowAll() { 
        if(PermisosTotales){
            setPermisosTotales(false)
        }else{
            setPermisosPendientes(false)
            setPermisosTotales(true)
        }
    }

    function ShowPendientes() {  
        if(PermisosPendientes){ 
            setPermisosPendientes(false)
        }else{ 
            setPermisosTotales(false)
            setPermisosPendientes(true)
        }
    }

    return (
        <div className='w-full h-full flex flex-col justify-start items-start justify-items-center'>
            {
                Auth ? (
                    <>
                        {
                            Admin.cargo === 'Gerente general' ? ( 
                                <div className='w-full bg-gray-800 pt-4 h-auto flex justify-center items-center gap-3 px-4 sm:px-64'>
                                    <button onClick={ () => ShowAll() } className={`w-auto h-auto px-4 py-1 rounded-sm cursor-pointer transition duration-700 ease-in-out border border-white font-bold  hover:text-gray-800 hover:bg-white ${ PermisosTotales ? 'bg-white text-gray-800 font-bold' : 'bg-gray-800 text-white font-bold'}`}>
                                        Todos
                                    </button>
                                    <button onClick={ () => ShowPendientes() } className={`w-auto h-auto px-4 py-1 rounded-sm cursor-pointer transition duration-700 ease-in-out border border-white font-bold  hover:text-gray-800 hover:bg-white ${ PermisosPendientes ? 'bg-white text-gray-800 font-bold' : 'bg-gray-800 text-white font-bold'}`}>
                                        Pendientes
                                    </button>
                                </div> 
                            ) : Admin.cargo === 'CONTABILIDAD' || Admin.cargo === 'HSEQ / GESTION DE TALENTO HUMANO' || Admin.cargo === 'AUX PERMISOS' || Admin.cargo === 'Gerencia' || Admin.cargo === 'Coordinador de MTTO' ? (
                                <div className='w-full bg-gray-800 pt-4 h-auto flex justify-center items-center gap-3 px-4 sm:px-64'>
                                    <button onClick={ () => ShowAll() } className={`w-auto h-auto px-4 py-1 rounded-sm cursor-pointer transition duration-700 ease-in-out border border-white font-bold   hover:text-gray-800 hover:bg-white ${ PermisosTotales ? 'bg-white text-gray-800 font-bold' : 'bg-gray-800 text-white font-bold'}`}>
                                        Todos Los Permisos
                                    </button>
                                </div> 
                            ) : null
                        }  
                        {
                            PermisosTotales  ? (
                                <Aprobados Permisos = { Permisos } Auth = { Auth } />
                            ) :  null
                        }
                        {
                            PermisosPendientes ? (
                                <Pendientes Permisos = { Permisos } Auth = { Auth } Admin = { Admin } />
                            ) :  null
                        }
                    </>
                ) : <Aprobados Permisos = { Permisos } Auth = { Auth } /> 
            }
        </div>
    )
}
