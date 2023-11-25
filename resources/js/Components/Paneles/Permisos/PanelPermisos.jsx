import React, { useState } from 'react'
import Aprobados from './Aprobados'
import Pendientes from './Pendientes'
import CursorIcon from '../../Icons/Arrow'

export default function PanelPermisos({  Permisos, Auth, Admin }) {

    const [DefaultPanel, setDefaultPanel] = useState(true)
    const [PermisosAutorizados, setPermisosAutorizados] = useState(false)
    const [PermisosPendientes, setPermisosPendientes] = useState(false)

    function ShowDefault() {
        setDefaultPanel(true)
        setPermisosAutorizados(false)
        setPermisosPendientes(false)
    }
    
    function ShowMePermisosAprobados() {
        if(PermisosAutorizados){
            ShowDefault()
        }else{
            setDefaultPanel(false)
            setPermisosPendientes(false)
            setPermisosAutorizados(true)
        }
    }

    function ShowMePermisosPendientes() { 
        if(PermisosPendientes){
            ShowDefault()
        }else{ 
            setDefaultPanel(false)
            setPermisosAutorizados(false)
            setPermisosPendientes(true)
        }
    }

    return (
        <div className='w-full h-full flex flex-col justify-start items-start justify-items-center'>
            {
                Auth ? (
                    <>
                        {
                            Admin === 'Gerente general' ? (
                                <div className='w-full h-auto  bg-gray-200 px-4 py-2 flex justify-center items-center justify-items-center gap-5'> 
                                    <button onClick={ () => ShowMePermisosAprobados() } className={`w-1/2 h-full px-4 py-2 ${PermisosAutorizados ? 'bg-white text-[#323c7c] border-[#323c7c]' : 'bg-[#323c7c] text-white border-white' }  border border-black hover:bg-white hover:text-[#323c7c] transition duration-700 ease-in-out font-bold`}>
                                        Todas los Permisos
                                    </button>
                                    <button onClick={ () => ShowMePermisosPendientes() } className={`w-1/2 h-full px-4 py-2 ${PermisosPendientes ? 'bg-white text-[#323c7c] border-[#323c7c]' : 'bg-[#323c7c] text-white border-white' }  border border-black hover:bg-white hover:text-[#323c7c] transition duration-700 ease-in-out font-bold`}>
                                        Permisos Pendientes
                                    </button> 
                                </div>
                            ) : Admin === 'CONTABILIDAD' || Admin === 'HSEQ / GESTION DE TALENTO HUMANO' || Admin === 'AUX PERMISOS' || Admin === 'Gerencia' || Admin === 'Coordinador de MTTO' ? (
                                <div className='w-full h-auto  bg-gray-200 px-4 py-2 flex justify-center items-center justify-items-center gap-5'> 
                                    <button onClick={ () => ShowMePermisosAprobados() } className={`w-full h-full px-4 py-2 ${PermisosAutorizados ? 'bg-white text-[#323c7c] border-[#323c7c]' : 'bg-[#323c7c] text-white border-white' }  border border-black hover:bg-white hover:text-[#323c7c] transition duration-700 ease-in-out font-bold`}>
                                        Todas los Permisos
                                    </button> 
                                </div>
                            ) : null
                        } 
                        {
                            DefaultPanel
                            ?
                                <div className='w-full h-full bg-gray-800 flex flex-col justify-center items-center'>
                                    <CursorIcon color="#fff" width={`70`} height={`70`} />
                                    <span className='text-white font-semibold'> Por favor selecciona una opcion </span>
                                    <span className='text-white font-semibold'> Todos los Permisos Autorizados o </span>
                                    <span className='text-white font-semibold'> Todos los Permisos Pendientes </span>
                                </div> 
                            :   
                                null
                        }
                        {
                            PermisosAutorizados  ? (
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
