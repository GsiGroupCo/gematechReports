
import React, { FC, useState } from 'react'
import Aprobadas from './Aprobados';
import Pendientes from './Pendientes';
import CursorIcon from '../../Icons/Arrow';


const PanelBonos = ({ Bonos, Auth, Admin }) => {
    
    const [DefaultPanel, setDefaultPanel] = useState(true)
    const [BonosAprobados, setBonosAprobados] = useState(false)
    const [BonosPendientes, setBonosPendientes] = useState(false)
    
    function ShowDefault() {
        setDefaultPanel(true)
        setBonosAprobados(false)
        setBonosPendientes(false)
    }

    function ShowMeBonosAprobadas() {
        if(BonosAprobados){
            ShowDefault()
        }else{
            setDefaultPanel(false)
            setBonosPendientes(false)
            setBonosAprobados(true)
        }
    }

    function ShowMeBonosPendientes() {
        if(BonosPendientes){
            ShowDefault()
        }else{
            setDefaultPanel(false)
            setBonosAprobados(false)
            setBonosPendientes(true)
        }
    }

    return (
        <div className='w-full h-full bg-gray-200 flex flex-col justify-start items-start justify-items-center'>
            {
                Auth ? (
                    <>
                        {
                            Admin === 'Gerencia' || Admin === 'Coordinador de MTTO' || Admin === 'Gerente general' ?  (
                                <div className='w-full h-auto  bg-gray-200 px-4 py-2 flex justify-center items-center justify-items-center gap-5'> 
                                    <button onClick={ () => ShowMeBonosAprobadas() } className={`w-1/2 h-full px-4 py-2 ${BonosAprobados ? 'bg-white text-[#323c7c] border-[#323c7c]' : 'bg-[#323c7c] text-white border-white' }  border border-black hover:bg-white hover:text-[#323c7c] transition duration-700 ease-in-out font-bold`}>
                                        Todos los Bonos
                                    </button>
                                    <button onClick={ () => ShowMeBonosPendientes() } className={`w-1/2 h-full px-4 py-2 ${BonosPendientes ? 'bg-white text-[#323c7c] border-[#323c7c]' : 'bg-[#323c7c] text-white border-white' }  border border-black hover:bg-white hover:text-[#323c7c] transition duration-700 ease-in-out font-bold`}>
                                        Bonos Pendientes
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
                                    <span className='text-white font-semibold'> Todos los Bonos o </span>
                                    <span className='text-white font-semibold'> Bonos Pendientes </span>
                                </div> 
                            :
                                null
                        }
                        {
                            BonosAprobados 
                            ? 
                                <>
                                    <Aprobadas Bonos = { Bonos } Auth = { Auth }  />
                                </>
                            : 
                                null
                        }
                        {
                            BonosPendientes 
                            ? 
                                <>
                                    <Pendientes Bonos = { Bonos } Auth = { Auth } Admin = { Admin }/>
                                </>
                            : 
                                null
                        }
                    </>
                ) : <Aprobadas Bonos = { Bonos } Auth = { Auth }  />
            }
        </div>
    )
}

export default PanelBonos;