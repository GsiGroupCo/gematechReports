import React, { useEffect, useState } from 'react'

import Aprobadas from './Aprobadas';
import Pendientes from './Pendientes'; 

const PanelHoras = ({ HorasExtras, Auth, Admin }) => {
       
    const [HorasAprobadas, setHorasAprobadas] = useState(false)
    const [HorasPendientes, setHorasPendientes] = useState(false)
 
    function ShowAll() {
        if(HorasAprobadas){
            setHorasAprobadas(false)
        }else{
            setHorasPendientes(false)
            setHorasAprobadas(true)
        }
    }

    function ShowPendientes() {
        if(HorasPendientes){
            setHorasPendientes(false)
        }else{
            setHorasAprobadas(false)
            setHorasPendientes(true)
        }
    }
 
    return (
        <div className='w-full h-auto flex flex-col justify-start items-start justify-items-center'>
            {
                Auth ?  (
                    <>
                        {
                            Admin.cargo === 'Coordinador de MTTO' || Admin.cargo === 'Gerente general' || Admin.cargo === 'Logistica' ? (
                                <div className='w-full bg-gray-800 pt-4 h-auto flex justify-center items-center gap-3 px-4 sm:px-64'>
                                    <button onClick={ () => ShowAll() } className={`w-auto h-auto px-4 py-1 rounded-sm cursor-pointer transition duration-700 ease-in-out border border-white font-bold   hover:text-gray-800 hover:bg-white ${ HorasAprobadas ? 'bg-white text-gray-800 font-bold' : 'bg-gray-800 text-white font-bold'}`}>
                                        Todos
                                    </button>
                                    <button onClick={ () => ShowPendientes() } className={`w-auto h-auto px-4 py-1 rounded-sm cursor-pointer transition duration-700 ease-in-out border border-white font-bold   hover:text-gray-800 hover:bg-white ${ HorasPendientes ? 'bg-white text-gray-800 font-bold' : 'bg-gray-800 text-white font-bold'}`}>
                                        Pendientes
                                    </button>
                                </div>
                            ) : Admin.cargo === 'Gerencia' ? (
                                <div className='w-full bg-gray-800 py-2 h-auto flex justify-center items-center gap-3 px-4 sm:px-64'>
                                    <button onClick={ () => ShowAll() } className='w-auto h-auto px-4 py-1 rounded-sm cursor-pointer transition duration-700 ease-in-out border border-white font-bold text-white hover:text-gray-800 hover:bg-white'>
                                        Todas
                                    </button> 
                                </div>
                            ) : null
                        }  
                        {
                            HorasAprobadas  ?  <Aprobadas HorasExtras = { HorasExtras } Auth = { Auth } /> :  null
                        }
                        {
                            HorasPendientes ? <Pendientes HorasExtras = { HorasExtras } Auth = { Auth } Admin = { Admin } /> :  null
                        }
                    </>
                ) : <Aprobadas HorasExtras = { HorasExtras } Auth = { Auth } />
            }
        </div>
    )
}

export default PanelHoras;