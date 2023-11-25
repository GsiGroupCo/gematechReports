import { router } from '@inertiajs/react'
import React, { useState } from 'react'
import RegisterUser from '../../forms/Auth/RegisterUser/RegisterUser'
import RegisterWorker from '../../forms/Auth/RegisterWorker/RegisterWorker'
import ChangePasswordForm from '../../forms/Auth/ChangePasswordForm/ChangePasswordForm'
import RegisterHoras from '../../forms/Horas/RegisterHoras/RegisterHoras'
import RegisterBonos from '../../forms/Bonos/RegistarBonos/RegisterBonos'
import RegisterPermisos from '../../forms/Permisos/RegisterPermisos/RegisterPermisos'
import ExcelHorasForm from '../../forms/Auth/ExcelHorasForm'
import ExcelBonosForm from '../../forms/Auth/ExcelBonosForm'
import ExcelPermisosForm from '../../forms/Auth/ExcelPermisosForm'

export default function ConfiguracionPanel({ onClose, Auth, cc, status, error, Personal, Admin }) {

    const [defaultPanel, setdefaultPanel] = useState(true)
    const [PanelHoras, setPanelHoras] = useState(false)
    const [PanelBonos, setPanelBonos] = useState(false)
    const [PanelPermisos, setPanelPermisos] = useState(false) 
    const [PanelChangePassword, setPanelChangePassword] = useState(false)
    const [PanelRegisterUser, setPanelRegisterUser] = useState(false)
    const [PanelRegisterWorker, setPanelRegisterWorker] = useState(false)
    const [PanelRegisterPermiso, setPanelRegisterPermiso] = useState(false)
    
    const ShowPanelBonos = () => {
        setdefaultPanel(false)
        setPanelPermisos(false)
        setPanelHoras(false)
        setPanelChangePassword(false)
        setPanelRegisterUser(false)
        setPanelRegisterPermiso(false)
        setPanelRegisterWorker(false)
        setPanelBonos(true)
    }

    const ShowExcelHoras = () => {
        setdefaultPanel(false)
        setPanelPermisos(false)
        setPanelHoras(false)
        setPanelChangePassword(false)
        setPanelRegisterUser(false)
        setPanelRegisterPermiso(false)
        setPanelRegisterWorker(false)
        setPanelBonos(true)
    }

    const ShowPanelHoras = () => {
        setdefaultPanel(false)
        setPanelBonos(false)
        setPanelPermisos(false)
        setPanelChangePassword(false)
        setPanelRegisterUser(false)
        setPanelRegisterWorker(false)
        setPanelRegisterPermiso(false)
        setPanelHoras(true) 
    }

    const ShowPanelPermisos = () => {
        setdefaultPanel(false)
        setPanelBonos(false)
        setPanelHoras(false)
        setPanelChangePassword(false)
        setPanelRegisterUser(false)
        setPanelRegisterWorker(false)
        setPanelRegisterPermiso(false)
        setPanelPermisos(true)
    }

    const ShowPanelChangePassword = () => {
        setdefaultPanel(false)
        setPanelBonos(false)
        setPanelHoras(false)
        setPanelPermisos(false)
        setPanelRegisterUser(false)
        setPanelRegisterWorker(false)
        setPanelRegisterPermiso(false)
        setPanelChangePassword(true)
    }

    const ShowPanelRegisterUser = () => {
        setdefaultPanel(false)
        setPanelBonos(false)
        setPanelHoras(false)
        setPanelPermisos(false)
        setPanelChangePassword(false)
        setPanelRegisterWorker(false)
        setPanelRegisterPermiso(false)
        setPanelRegisterUser(true)
    }

    const ShowPanelRegisterWorker = () => {
        setdefaultPanel(false)
        setPanelBonos(false)
        setPanelHoras(false)
        setPanelPermisos(false)
        setPanelChangePassword(false)
        setPanelRegisterUser(false)
        setPanelRegisterPermiso(false)
        setPanelRegisterWorker(true)
    }

    const ShowPanelRegisterPermiso = () => {
        setdefaultPanel(false)
        setPanelBonos(false)
        setPanelHoras(false)
        setPanelPermisos(false)
        setPanelChangePassword(false)
        setPanelRegisterUser(false)
        setPanelRegisterWorker(false)
        setPanelRegisterPermiso(true)
    }

    const [PanelBonosForm, setPanelBonosForm] = useState(false)
    const [PanelHorasForm, setPanelHorasForm] = useState(false)
    const [PanelPermisoForm, setPanelPermisoForm] = useState(false)

    const ShowPanelFormHoras = () => {
        setdefaultPanel(false)
        setPanelBonosForm(false)
        setPanelPermisoForm(false)
        setPanelHorasForm(true)
    }

    const ShowPanelFormBonos = () => {
        setdefaultPanel(false)
        setPanelPermisoForm(false)
        setPanelHorasForm(false)
        setPanelBonosForm(true)
    }


    return (
        <div className='w-full h-full bg-gray-800 flex  justify-center items-center justify-items-center'>
            {
                Auth ? (
                    <>
                        {
                            defaultPanel ? (
                                <>
                                    <div className='w-full h-auto p-4 gap-2 flex flex-col justify-center items-center justify-items-center'>
                                        {  Admin === 'HSEQ / GESTION DE TALENTO HUMANO' || Admin === 'Coordinador de MTTO' || Admin === 'Gerencia' || Admin === 'Gerente general' ? (
                                            <>
                                                <div onClick={()=>ShowPanelRegisterUser()} className='w-full h-auto px-4 py-2 cursor-pointer bg-white rounded-md border border-white text-[#323c7c] hover:bg-[#323c7c] hover:text-white transition duration-700 ease-in-out font-bold'>
                                                    Registrar Usuario
                                                </div> 
                                                <div onClick={()=>ShowPanelRegisterWorker()} className='w-full h-auto px-4 py-2 cursor-pointer bg-white rounded-md border border-white text-[#323c7c] hover:bg-[#323c7c] hover:text-white transition duration-700 ease-in-out font-bold'>
                                                    Registrar Empleado
                                                </div>
                                                <div onClick={()=>ShowPanelRegisterPermiso()} className='w-full h-auto px-4 py-2 cursor-pointer bg-white rounded-md border border-white text-[#323c7c] hover:bg-[#323c7c] hover:text-white transition duration-700 ease-in-out font-bold'>
                                                    Registrar Permiso
                                                </div>
                                                <div onClick={()=>ShowPanelChangePassword()} className='w-full h-auto px-4 py-2 cursor-pointer bg-white rounded-md border border-white text-[#323c7c] hover:bg-[#323c7c] hover:text-white transition duration-700 ease-in-out font-bold'>
                                                    Cambiar Contraseña
                                                </div>
                                                <div  onClick={ () => ShowPanelBonos() } className='w-full h-auto px-4 py-2 cursor-pointer bg-white rounded-md border border-white text-[#323c7c] hover:bg-[#323c7c] hover:text-white transition duration-700 ease-in-out font-bold'>
                                                    Descargar Listado Bonos
                                                </div>
                                                <div  onClick={ () => ShowPanelHoras() } className='w-full h-auto px-4 py-2 cursor-pointer bg-white rounded-md border border-white text-[#323c7c] hover:bg-[#323c7c] hover:text-white transition duration-700 ease-in-out font-bold'>
                                                    Descargar Listado Horas Extras
                                                </div>
                                                <div onClick={ () => ShowPanelPermisos() } className='w-full h-auto px-4 py-2 cursor-pointer bg-white rounded-md border border-white text-[#323c7c] hover:bg-[#323c7c] hover:text-white transition duration-700 ease-in-out font-bold'>
                                                    Descargar Listado Permisos
                                                </div>
                                            </>
                                        ) : Admin === 'CONTABILIDAD' ? (
                                            <> 
                                                <div  onClick={ () => ShowPanelBonos() } className='w-full h-auto px-4 py-2 cursor-pointer bg-white rounded-md border border-white text-[#323c7c] hover:bg-[#323c7c] hover:text-white transition duration-700 ease-in-out font-bold'>
                                                    Descargar Listado Bonos
                                                </div>
                                                <div  onClick={ () => ShowPanelHoras() } className='w-full h-auto px-4 py-2 cursor-pointer bg-white rounded-md border border-white text-[#323c7c] hover:bg-[#323c7c] hover:text-white transition duration-700 ease-in-out font-bold'>
                                                    Descargar Listado Horas Extras
                                                </div>
                                                <div onClick={ () => ShowPanelPermisos() } className='w-full h-auto px-4 py-2 cursor-pointer bg-white rounded-md border border-white text-[#323c7c] hover:bg-[#323c7c] hover:text-white transition duration-700 ease-in-out font-bold'>
                                                    Descargar Listado Permisos
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div onClick={()=>ShowPanelRegisterPermiso()} className='w-full h-auto px-4 py-2 cursor-pointer bg-white rounded-md border border-white text-[#323c7c] hover:bg-[#323c7c] hover:text-white transition duration-700 ease-in-out font-bold'>
                                                    Registrar Permiso
                                                </div>
                                                <div onClick={()=>ShowPanelChangePassword()} className='w-full h-auto px-4 py-2 cursor-pointer bg-white rounded-md border border-white text-[#323c7c] hover:bg-[#323c7c] hover:text-white transition duration-700 ease-in-out font-bold'>
                                                    Cambiar Contraseña
                                                </div>
                                            </>
                                        ) }
                                    </div>
                                </>
                            ) : null
                        }
                        {
                            PanelRegisterPermiso ? (
                                <>
                                    <RegisterPermisos status = { status } onClose = { onClose } Personal = { Personal } />
                                </>
                            ) : null
                        }
                        {
                            PanelHoras  ? (
                                <ExcelHorasForm onClose = { onClose } /> 
                            ) : null
                        }
                        {
                            PanelBonos  ? ( 
                                <ExcelBonosForm onClose = { onClose } /> 
                            ) : null
                        }
                        {
                            PanelPermisos  ? ( 
                                <ExcelPermisosForm onClose = { onClose } /> 
                            ) : null
                        }
                        {
                            PanelChangePassword ? (
                                <>
                                    <ChangePasswordForm onClose = { onClose } status = { status } />
                                </>
                            ) : null
                        }
                        {
                            PanelRegisterUser ? (
                                <>
                                    <RegisterUser onClose = { onClose } status = { status } />
                                </>
                            ) : null
                        }
                        {
                            PanelRegisterWorker ? (
                                <>
                                    <RegisterWorker onClose = { onClose }  status = { status } />
                                </>
                            ) : null
                        }
                    </>
                ) 
                : 
                <>
                    {
                        defaultPanel ? (
                            <>
                                <div className='w-full h-auto p-4 gap-2 flex flex-col justify-center items-center justify-items-center'>
                                    <div onClick={ () => ShowPanelFormHoras() } className='w-full h-auto px-4 py-2 cursor-pointer bg-white rounded-md border border-white text-[#323c7c] hover:bg-[#323c7c] hover:text-white transition duration-700 ease-in-out font-bold'>
                                        Registrar Horas Extras
                                    </div>
                                    <div onClick={ () => ShowPanelFormBonos() } className='w-full h-auto px-4 py-2 cursor-pointer bg-white rounded-md border border-white text-[#323c7c] hover:bg-[#323c7c] hover:text-white transition duration-700 ease-in-out font-bold'>
                                        Registrar Bono
                                    </div>
                                </div>
                            </>
                        ) : null
                    }
                    {
                        PanelHorasForm ? (
                            <> 
                                <RegisterHoras cc = { cc } status = { status } error = { error }  onClose={ onClose } />
                            </>
                        ) : null
                    }
                    {
                        PanelBonosForm ? (
                            <>
                                <RegisterBonos cc = { cc } status = { status } error = { error }  onClose={ onClose } />
                            </>
                        ) : null
                    }
                </>
            }
        </div>
    )
}
