
import React, { FC, useState } from 'react'
import Aprobadas from './Aprobados';
import Pendientes from './Pendientes';
import CursorIcon from '../../Icons/Arrow';


const PanelBonos = ({ Bonos, Auth, Admin }) => {
    
    const [BonosAprobados, setBonosAprobados] = useState(false)
    const [BonosPendientes, setBonosPendientes] = useState(false)

    function ShowMeBonosAprobadas() {
        if(BonosAprobados){
            setBonosAprobados(false)
        }else{
            setBonosPendientes(false)
            setBonosAprobados(true)
        }
    }

    function ShowMeBonosPendientes() {
        if(BonosPendientes){
            setBonosPendientes(false)
        }else{
            setBonosAprobados(false)
            setBonosPendientes(true)
        }
    }

    return (
        <div className='w-full h-auto bg-gray-200 flex flex-col justify-start items-start justify-items-center'>
            {
                Auth ? (
                    <>
                        {
                            Admin.cargo === 'Gerencia' || Admin.cargo === 'Coordinador de MTTO' || Admin.cargo === 'Gerente general' ?  (
                                <div className='w-full bg-gray-800 pt-4 h-auto flex justify-center items-center gap-3 px-4 sm:px-64'>
                                    <button onClick={ () => ShowMeBonosAprobadas() } className={`w-auto h-auto px-4 py-1 rounded-sm cursor-pointer transition duration-700 ease-in-out border border-white font-bold hover:text-gray-800 hover:bg-white ${ BonosAprobados ? 'bg-white text-gray-800 font-bold' : 'bg-gray-800 text-white font-bold'}`}>
                                        Todos
                                    </button>
                                    <button onClick={ () => ShowMeBonosPendientes() } className={`w-auto h-auto px-4 py-1 rounded-sm cursor-pointer transition duration-700 ease-in-out border border-white font-bold hover:text-gray-800 hover:bg-white ${ BonosPendientes ? 'bg-white text-gray-800 font-bold' : 'bg-gray-800 text-white font-bold'}`}>
                                        Pendientes
                                    </button>
                                </div>
                            ) : null
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
                                    <Pendientes  Bonos = { Bonos } Auth = { Auth } Admin = { Admin }/>
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