
//Componentes de React
import React, { useState } from 'react'

//Componentes de Next

//Componentes Externos
import { toast } from 'sonner';

//Componentes del Proyecto
import Aprobadas from './Aprobadas';
import Pendientes from './Pendientes';
import CursorIcon from '../../Icons/Arrow';


const PanelHoras = ({ HorasExtras, Auth, Admin }) => {

    const [DefaultPanel, setDefaultPanel] = useState(true)
    const [HorasAprobadas, setHorasAprobadas] = useState(false)
    const [HorasPendientes, setHorasPendientes] = useState(false)

    function ShowDefault() {
        setDefaultPanel(true)
        setHorasAprobadas(false)
        setHorasPendientes(false)
    }
    
    function ShowMeHorasAprobadas() {
        if(HorasAprobadas){
            ShowDefault()
        }else{
            setDefaultPanel(false)
            setHorasPendientes(false)
            setHorasAprobadas(true)
        }
    }

    function ShowMeHorasPendientes() {
        if(HorasPendientes){
            ShowDefault()
        }else{
            setHorasAprobadas(false)
            setDefaultPanel(false)
            setHorasPendientes(true)
        }
    }

    return (
        <div className='w-full h-full flex flex-col justify-start items-start justify-items-center'>
            {
                Auth ? (
                    <>
                        {
                            Admin === 'Gerencia' || Admin === 'Coordinador de MTTO' || Admin === 'Gerente general' || Admin === 'Logistica' ? (
                                <div className='w-full h-auto  bg-gray-200 px-4 py-2 flex justify-center items-center justify-items-center gap-5'> 
                                    <button onClick={ () => ShowMeHorasAprobadas() } className={`w-1/2 h-full px-4 py-2 ${HorasAprobadas ? 'bg-white text-[#323c7c] border-[#323c7c]' : 'bg-[#323c7c] text-white border-white' }  border border-black hover:bg-white hover:text-[#323c7c] transition duration-700 ease-in-out font-bold`}>
                                        Todas las Horas
                                    </button>
                                    <button onClick={ () => ShowMeHorasPendientes() } className={`w-1/2 h-full px-4 py-2 ${HorasPendientes ? 'bg-white text-[#323c7c] border-[#323c7c]' : 'bg-[#323c7c] text-white border-white' }  border border-black hover:bg-white hover:text-[#323c7c] transition duration-700 ease-in-out font-bold`}>
                                        Horas Pendientes
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
                                    <span className='text-white font-semibold'> Todos las Horas o </span>
                                    <span className='text-white font-semibold'> Horas Pendientes </span>
                                </div> 
                            :
                                null
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