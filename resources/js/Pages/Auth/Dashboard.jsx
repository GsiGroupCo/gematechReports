import Appbar from '@/Components/UI/Appbar'
import PanelBonos from '@/Components/Paneles/Bonos/PanelBonos'
import ConfiguracionPanel from '@/Components/Paneles/Config/ConfigPanel'
import PanelHoras from '@/Components/Paneles/Horas/PanelHoras'
import CursorIcon from '@/Components/Icons/Arrow'
import Modal from '@/Components/UI/Modal'
import PanelPermisos from '@/Components/Paneles/Permisos/PanelPermisos'
import { PermisoRow } from '@/Components/Paneles/Permisos/Row'
import { Link } from '@inertiajs/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Toaster, toast } from 'sonner'


export default function Dashboard({ PermisosData, HorasData, BonosData, status, error, Personal, Admin }) {

    console.log(PermisosData)

    const [Permisos, setPermisos] = useState()
    const [Horas, setHoras] = useState()
    const [Bonos, setBonos] = useState()

    useEffect(() => {
        setPermisos(PermisosData) 
    }, [ PermisosData ])
    
    useEffect(() => { 
        setHoras(HorasData) 
    }, [ HorasData ])
    
    useEffect(() => {
        setBonos(BonosData)
    }, [ BonosData ])

    useEffect(() => {
        if(status){ 
            toast.success(status)
        }
        if(error){ 
            toast.error(error)
        }
    }, [ status, error ])
    
    const [DefaultPanel, setDefaultPanel]   = useState(true)
    const [HorasPanel, setHorasPanel]       = useState(false)
    const [BonosPanel, setBonosPanel]       = useState(false)
    const [PermisosPanel, setPermisosPanel] = useState(false)
    const [ModalShow, setModalShow]         = useState(false)


    function ChangeToHoras(){
        if(HorasPanel){
            setHorasPanel(false)
            setBonosPanel(false)
            setPermisosPanel(false)
            setDefaultPanel(true)
        }else{
            setBonosPanel(false)
            setPermisosPanel(false)
            setDefaultPanel(false)
            setHorasPanel(true)
        }
    }

    function ChangeToBonos(){
        if(BonosPanel){
            setHorasPanel(false)
            setBonosPanel(false)
            setPermisosPanel(false)
            setDefaultPanel(true)
        }else{
            setPermisosPanel(false)
            setDefaultPanel(false)
            setHorasPanel(false)
            setBonosPanel(true)
        }
    }

    function ChangeToPermisos(){
        if(PermisosPanel){
            setHorasPanel(false)
            setBonosPanel(false)
            setPermisosPanel(false)
            setDefaultPanel(true)
        }else{
            setBonosPanel(false)
            setDefaultPanel(false)
            setHorasPanel(false)
            setPermisosPanel(true)
        }
    }

    return (
        <main className='w-full h-screen'> 
            <Toaster richColors position="top-center"/>
            <Appbar>
                <div className='w-full h-full flex justify-evenly items-center gap-3'>
                    <div className='w-[150px] md:w-auto px-2 py-1 h-auto flex flex-col md:flex-row justify-center items-center justify-items-center gap-3'> 
                        <button onClick={ () => ChangeToHoras() } className={ ` w-full md:w-auto ${ HorasPanel ? 'bg-white text-black' : 'bg-gray-800 text-white' } px-4 py-2 rounded-md  font-bold shadow-sm shadow-black cursor-pointer hover:bg-white hover:text-black transition duration-700 ease-out`}>
                        Horas Extras
                        </button>
                        <button onClick={ () => ChangeToBonos() } className={`w-full md:w-auto  ${ BonosPanel ? 'bg-white text-black' : 'bg-gray-800 text-white' } px-4 py-2 rounded-md  font-bold shadow-sm shadow-black cursor-pointer hover:bg-white hover:text-black transition duration-700 ease-out`}>
                        Bonos
                        </button>
                        <button onClick={ () => ChangeToPermisos() } className={`w-full md:w-auto  ${ PermisosPanel ? 'bg-white text-black' : 'bg-gray-800 text-white' } px-4 py-2 rounded-md  font-bold shadow-sm shadow-black cursor-pointer hover:bg-white hover:text-black transition duration-700 ease-out`}>
                        Permisos
                        </button>
                    </div>
                    <div className='w-[150px] md:w-auto h-full flex  flex-col md:flex-row justify-center items-center justify-items-center gap-3'> 
                        <Link href="/logout" method="get" as="button" type="button" className={`w-full md:w-auto bg-gray-800 text-white px-4 py-2 rounded-md  font-bold shadow-sm shadow-black cursor-pointer hover:bg-white hover:text-black transition duration-700 ease-out`}>
                            Cerrar Sesion
                        </Link>
                        <div onClick = { () => setModalShow(true) } className={`w-full md:w-auto bg-gray-800 text-white px-4 py-2 rounded-md  font-bold shadow-sm shadow-black cursor-pointer hover:bg-white hover:text-black transition duration-700 ease-out`}>
                            Configuracion
                        </div>
                    </div>
                </div>
            </Appbar>
            <div className={`w-full h-full flex flex-col justify-center items-center justify-items-center  `} >
                {
                    DefaultPanel ? <div className='w-full h-full bg-gray-800 flex flex-col justify-center items-center'>
                        <CursorIcon color="#fff" width={`70`} height={`70`} />
                        <span className='text-white font-semibold'> Por favor selecciona una opcion </span>
                        <span className='text-white font-semibold'> Horas Extras </span>
                        <span className='text-white font-semibold'> Bonos </span>
                        <span className='text-white font-semibold'> Permisos </span>
                    </div> : null
                }
                {
                    HorasPanel ? <PanelHoras HorasExtras = { Horas } Auth = { true } Admin = { Admin }  /> : null
                }
                {
                    BonosPanel ? <PanelBonos  Bonos = { Bonos } Auth = { true } Admin = { Admin } /> : null
                }
                {
                    PermisosPanel ? 
                        <div className='w-full h-full bg-white flex flex-col justify-start items-start justify-items-center'>
                            <div className="w-full h-full bg-white flex flex-col justify-start items-start justify-items-center">
                                {
                                    Permisos ? <PanelPermisos Admin = { Admin } Auth = { true } Permisos = { Permisos } /> : null
                                }
                            </div>
                        </div>
                    : null
                }
            </div>
            <Modal 
                tittle='Configuracion'
                isVisible = { ModalShow }
                onClose = { () => setModalShow(false) }
            >
                <ConfiguracionPanel onClose = { () => setModalShow(false) } Auth = { true } Personal = { Personal } status={ status } error={ error}  Admin = { Admin }/>
            </Modal>
        </main>
    )
}
