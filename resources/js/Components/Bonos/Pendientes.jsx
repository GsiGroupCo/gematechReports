import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import EditBonos from "../forms/EditBonos";
import DesaprobarBono from "../forms/DesaprobarBono";
import DesautorizarBono from "../forms/DesautorizarBono";

const Pendientes = ({Bonos, Auth, Admin}) => {

    const { data, post } = useForm();

    const [ModalShow, setModalShow] = useState(false)
    const [ModalInfoShow, setModalInfoShow] = useState(false)
    
    const [Editar, setEditar] = useState(false)
    const [Desaprobar, setDesaprobar] = useState(false)
    const [Desautorizar, setDesautorizar] = useState(false)

    const [BonoSelected, setBonoSelected] = useState({
        bono_id      : "",
        ot_id        : "",
        empleado_id  : "",
        lugar_bono   : "",
        fecha_bono   : "",
        cliente      : "",
        observaciones: ""
    }) 

    function AutorizarBono(bono_id){
        data.bono_id = bono_id
        post(`/bono/autorizacion`)
    }

    function AprobarBono(bono_id){
        data.bono_id = bono_id
        post(`/bono/aprobada`)
    }

    const BonosPendiente = Bonos.filter(
        (bonos) => bonos.estado === "Pendiente"
    );
    
    const BonosxAutorizar = Bonos.filter(
        (bonos) => bonos.estado === "Aprobado"
    );
    
    const [datosFiltrados, setDatosFiltrados] = useState();
    const [BonosAutorizar, setBonosAutorizar] = useState();
    
    useEffect(() => {
        setDatosFiltrados(BonosPendiente)
    }, [Bonos]);

    useEffect(() => {
        setBonosAutorizar(BonosxAutorizar)
    }, [Bonos]);

    const FiltrarBonosPendientes = ( searchTerm ) => {
        const filteredPendientes  = BonosPendiente.filter((bonosPendientes) => { 
            const nombre_empleado = bonosPendientes.responsable.nombre.toLowerCase();
            const ot_id           = bonosPendientes.ot_id.toLowerCase();
            const fecha_bono      = bonosPendientes.fecha_bono.toString().toLowerCase();
            const cliente         = bonosPendientes.cliente.toLowerCase();
            const lugar           = bonosPendientes.lugar_bono.toLowerCase();
            return ( 
                nombre_empleado.includes(searchTerm) ||
                ot_id.includes(searchTerm)           ||
                fecha_bono.includes(searchTerm)      ||
                cliente.includes(searchTerm)         ||
                lugar.includes(searchTerm)
            );
        });
        setDatosFiltrados(filteredPendientes); 
    }; 

    const FiltrarBonosAutorizar = ( searchTerm ) => {
        const filteredAutorizados = BonosxAutorizar.filter((bonosAutorizar) => { 
            const nombre_empleado = bonosAutorizar.responsable.nombre.toLowerCase();
            const ot_id           = bonosAutorizar.ot_id.toLowerCase();
            const fecha_bono      = bonosAutorizar.fecha_bono.toString().toLowerCase();
            const cliente         = bonosAutorizar.cliente.toLowerCase();
            const lugar           = bonosAutorizar.lugar_bono.toLowerCase();
            return ( 
                nombre_empleado.includes(searchTerm) ||
                ot_id.includes(searchTerm)           ||
                fecha_bono.includes(searchTerm)      ||
                cliente.includes(searchTerm)         ||
                lugar.includes(searchTerm)
            );
        }); 
        setBonosAutorizar(filteredAutorizados); 
    };
    

  return (
    <>
        {
            Admin === 'Coordinador de MTTO' ? (
                <div className="w-full h-full bg-white flex flex-col justify-start items-start justify-items-center  ">
                    <div className='w-full h-auto bg-white gap-2 flex justify-evenly items-center justify-items-center p-2 '>
                        <input 
                            type="text" 
                            placeholder='Buscar...' 
                            className='w-full h-[45px] text-black px-4 py-2 focus:outline-none bg-white border border-black rounded-md ' 
                            onChange={(e) => FiltrarBonosPendientes(e.target.value.toLowerCase())}
                        />
                    </div>
                    <div  className=' hidden w-full h-auto border-b-2  cursor-pointer md:flex flex-col md:flex-row justify-center items-center justify-items-center bg-white'>
                        <div className='w-full h-auto flex bg-[#323c7c] text-white'>
                            <div className='w-full py-4 md:w-full h-full flex flex-col md:flex-row '>
                                <div className={`${Auth ? 'w-full md:w-[19%]' : 'hidden'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-bold'> Nombre </span>
                                </div>
                                <div className={`${Auth ? 'w-full md:w-[19%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-bold'> OT </span>
                                </div>
                                <div className={`${Auth ? 'w-full md:w-[19%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-bold'> FECHA  </span>
                                </div>
                                <div className={`${Auth ? 'w-full md:w-[19%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-bold'> CLIENTE </span>
                                </div>
                                <div className={`${Auth ? 'w-full md:w-[19%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-bold'> LUGAR </span>
                                </div>
                            </div>
                            <div className="w-[500px] h-auto flex justify-center items-center ">
                                <span className='font-bold'> ACCIONES </span>
                            </div>
                        </div>
                    </div>
                    {
                        datosFiltrados 
                        ?  
                            datosFiltrados.map((Bonos) => (
                            <div key={Bonos.bono_id} className='w-full  h-auto border-b-2  cursor-pointer gap-3  px-4 py-2  flex flex-col md:flex-row justify-center items-center justify-items-center bg-white'>
                                <div className='w-full md:w-full h-full flex flex-col text-center  md:flex-row justify-start items-center justify-items-center'>
                                    <div className={`${Auth ? 'w-full md:w-[20%]' : 'hidden'} h-auto flex  justify-start md:justify-center items-center`}>
                                        <span className='font-bold'>{Bonos.responsable.nombre}</span>
                                    </div>
                                    <div className={`${Auth ? 'w-full md:w-[20%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-semibold'>{Bonos.ot_id}</span>
                                    </div>
                                    <div className={`${Auth ? 'w-full md:w-[20%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-semibold'>{Bonos.fecha_bono.toString()}</span>
                                    </div>
                                    <div className={`${Auth ? 'w-full md:w-[20%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-semibold'> {Bonos.cliente}</span>
                                    </div>
                                    <div className={`${Auth ? 'w-full md:w-[20%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-semibold'> {Bonos.lugar_bono}</span>
                                    </div>
                                </div>
                                <div className={` ${Auth ? 'w-full md:w-[500px] h-full flex justify-center items-end justify-items-center gap-3' : 'hidden' } `}>
                                    <div onClick = { () => AprobarBono( Bonos.bono_id )} className='w-full md:w-1/2 h-auto px-4 py-2 flex justify-center items-center text-white bg-green-500 hover:bg-green-800 hover:border-green-500 border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold '>
                                        Aprobar
                                    </div>
                                    <div onClick = { () => {
                                        setDesaprobar(false)
                                        setDesautorizar(false)
                                        setEditar(true)
                                        setBonoSelected({
                                            bono_id    : Bonos.bono_id,
                                            ot_id      : Bonos.ot_id,
                                            lugar_bono : Bonos.lugar_bono,
                                            fecha_bono : Bonos.fecha_bono,
                                            cliente    : Bonos.cliente, 
                                        })  
                                        setModalShow(true)
                                    }}   className='w-full md:w-1/2 h-auto px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-800 hover:border-yellow-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center'>
                                        Editar
                                    </div>   
                                    <div className='w-full md:w-1/4 h-auto px-4 py-2 text-white bg-blue-500 hover:bg-blue-800 hover:border-blue-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center' onClick={ () => {
                                        setEditar(false)
                                        setDesaprobar(false)
                                        setDesautorizar(false)
                                        setBonoSelected({
                                            bono_id      : Bonos.bono_id,
                                            empleado_id  : Bonos.responsable.nombre,
                                            ot_id        : Bonos.ot_id,
                                            lugar_bono   : Bonos.lugar_bono,
                                            fecha_bono   : Bonos.fecha_bono,
                                            cliente      : Bonos.cliente, 
                                            observaciones: Bonos.observaciones
                                        })  
                                        setModalInfoShow(true)
                                    }}
                                    >
                                        Informacion
                                    </div>                                 
                                    <div onClick = { () => {
                                        setEditar(false)
                                        setDesautorizar(false)
                                        setDesaprobar(true)
                                        setBonoSelected({
                                            bono_id     : Bonos.bono_id,
                                            ot_id       : Bonos.ot_id,
                                            lugar_bono  : Bonos.lugar_bono,
                                            fecha_bono  : Bonos.fecha_bono,
                                            cliente     : Bonos.cliente, 
                                        })  
                                        setModalShow(true)
                                    }}   className='w-full md:w-1/2 h-auto px-4 py-2 text-white bg-red-500 hover:bg-red-800 hover:border-red-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center'>
                                        Desaprobar
                                    </div>
                                </div>
                            </div>
                            ))
                        : null
                    } 
                    <Modal
                        isVisible = { ModalInfoShow }
                        tittle = {` Detalles de Bono `}
                        onClose = { () => setModalInfoShow(false) }
                    >
                        <div className="w-full h-auto p-4 flex flex-col justify-center items-center gap-3 ">
                        <div className="w-full flex justify-start items-center rounded-md border border-black px-4 py-2">
                        TRABAJADOR : { BonoSelected.empleado_id }
                        </div>
                        <div className="w-full flex flex-row justify-start items-center gap-3">
                            <div className="w-1/2 border border-black rounded-md px-4 py-2">
                            Lugar : { BonoSelected.lugar_bono }
                            </div>
                            <div className="w-1/2 border border-black rounded-md px-4 py-2">
                            Fecha: { BonoSelected.fecha_bono }
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-start items-center gap-3">
                            <div className="w-1/2 border border-black rounded-md px-4 py-2">
                            OT: { BonoSelected.ot_id }
                            </div>
                            <div className="w-1/2 border border-black rounded-md px-4 py-2">
                            Cliente: { BonoSelected.cliente }
                            </div>
                        </div>
                        <div className="w-full flex justify-start items-center rounded-md border border-black px-4 py-2">
                        OBSERVACIONES : { BonoSelected.observaciones }
                        </div>
                        </div>
                    </Modal>
                    {
                        Editar ? (
                            <Modal
                                isVisible = { ModalShow }
                                onClose   = { () => setModalShow(false) }
                                tittle    = {` Editando Bono `}
                            >
                                <EditBonos BonoData = { BonoSelected } onClose = { () => ModalShow(false) } />
                            </Modal>
                        ) : null
                    }
                    {
                        Desaprobar ? (
                            <Modal
                                isVisible = { ModalShow }
                                onClose   = { () => setModalShow(false) }
                                tittle    = {` Desaprobando Bono `}
                            >
                                <DesaprobarBono BonoData = { BonoSelected } onClose = { () => ModalShow(false) } />
                            </Modal>
                        ) : null
                    }
                </div>
            ) : (
                <div className="w-full h-full bg-white flex flex-col justify-start items-start justify-items-center  ">
                    {
                        Desautorizar ? (
                            <Modal
                                isVisible = { ModalShow }
                                onClose   = { () => setModalShow(false) }
                                tittle    = {` Des-autorizando Bono `}
                            >
                                <DesautorizarBono BonoData = { BonoSelected } onClose = { () => ModalShow(false) } />
                            </Modal>
                        ) : null
                    }
                    <Modal
                        isVisible = { ModalInfoShow }
                        tittle = {` Detalles de Bono `}
                        onClose = { () => setModalInfoShow(false) }
                    >
                        <div className="w-full h-auto p-4 flex flex-col justify-center items-center gap-3 ">
                        <div className="w-full flex justify-start items-center rounded-md border border-black px-4 py-2">
                        TRABAJADOR : { BonoSelected.empleado_id }
                        </div>
                        <div className="w-full flex flex-row justify-start items-center gap-3">
                            <div className="w-1/2 border border-black rounded-md px-4 py-2">
                            Lugar : { BonoSelected.lugar_bono }
                            </div>
                            <div className="w-1/2 border border-black rounded-md px-4 py-2">
                            Fecha: { BonoSelected.fecha_bono }
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-start items-center gap-3">
                            <div className="w-1/2 border border-black rounded-md px-4 py-2">
                            OT: { BonoSelected.ot_id }
                            </div>
                            <div className="w-1/2 border border-black rounded-md px-4 py-2">
                            Cliente: { BonoSelected.cliente }
                            </div>
                        </div>
                        <div className="w-full flex justify-start items-center rounded-md border border-black px-4 py-2">
                        OBSERVACIONES : { BonoSelected.observaciones }
                        </div>
                        </div>
                    </Modal>
                    <div className='w-full h-auto bg-white gap-2 flex justify-evenly items-center justify-items-center p-2 '>
                        <input 
                            type="text" 
                            placeholder='Buscar...' 
                            className='w-full h-[45px] text-black px-4 py-2 focus:outline-none bg-white border border-black rounded-md ' 
                            onChange={(e) => FiltrarBonosAutorizar(e.target.value.toLowerCase())}
                        />
                    </div>
                    <div  className=' hidden w-full h-auto border-b-2  cursor-pointer md:flex flex-col md:flex-row justify-center items-center justify-items-center bg-white'>
                        <div className='w-full h-auto flex bg-[#323c7c] text-white'>
                            <div className='w-full py-4 md:w-full h-full flex flex-col md:flex-row  '>
                                <div className={`${Auth ? 'w-full md:w-[20%]' : 'hidden'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-bold'> Nombre </span>
                                </div>
                                <div className={`${Auth ? 'w-full md:w-[20%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-bold'> OT </span>
                                </div>
                                <div className={`${Auth ? 'w-full md:w-[20%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-bold'> FECHA  </span>
                                </div>
                                <div className={`${Auth ? 'w-full md:w-[20%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-bold'> CLIENTE </span>
                                </div>
                                <div className={`${Auth ? 'w-full md:w-[20%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-bold'> LUGAR </span>
                                </div>
                            </div>
                            <div className="w-[500px] h-auto flex justify-center items-center ">
                                <span className='font-bold'> ACCIONES </span>
                            </div>
                        </div>
                    </div>
                    {
                        BonosAutorizar 
                        ?  
                            BonosAutorizar.map((Bonos) => (
                            <div key={Bonos.bono_id} className='w-full  h-auto border-b-2  cursor-pointer gap-3  px-4 py-2  flex flex-col md:flex-row justify-center items-center justify-items-center bg-white'>
                                <div className='w-full md:w-full h-full flex flex-col text-center  md:flex-row justify-start items-center justify-items-center'>
                                    <div className={`${Auth ? 'w-full md:w-[20%]' : 'hidden'} h-auto flex justify-start md:justify-center items-center`}>
                                        <span className='font-bold'>{Bonos.responsable.nombre}</span>
                                    </div>
                                    <div className={`${Auth ? 'w-full md:w-[20%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-semibold'>{Bonos.ot_id}</span>
                                    </div>
                                    <div className={`${Auth ? 'w-full md:w-[20%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-semibold'>{Bonos.fecha_bono.toString()}</span>
                                    </div>
                                    <div className={`${Auth ? 'w-full md:w-[20%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-semibold'> {Bonos.cliente}</span>
                                    </div>
                                    <div className={`${Auth ? 'w-full md:w-[20%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                    <span className='font-semibold'> {Bonos.lugar_bono}</span>
                                    </div>
                                </div>
                                <div className={` ${Auth ? 'w-full md:w-[500px] h-full flex justify-center items-center justify-items-center gap-3' : 'hidden' } `}>
                                    <div onClick = { () => AutorizarBono( Bonos.bono_id )}   className='w-full md:w-1/2 h-auto px-4 py-2 text-white bg-green-500 hover:bg-green-800 hover:border-green-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center'>
                                        Autorizar
                                    </div>
                                    <div className='w-full md:w-1/4 h-auto px-4 py-2 text-white bg-blue-500 hover:bg-blue-800 hover:border-blue-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center' onClick={ () => {
                                        setEditar(false)
                                        setDesaprobar(false)
                                        setDesautorizar(false)
                                        setBonoSelected({
                                            empleado_id: Bonos.responsable.nombre,
                                            bono_id    : Bonos.bono_id,
                                            ot_id      : Bonos.ot_id,
                                            lugar_bono : Bonos.lugar_bono,
                                            fecha_bono : Bonos.fecha_bono,
                                            cliente    : Bonos.cliente, 
                                            observaciones: Bonos.observaciones
                                        })  
                                        setModalInfoShow(true)
                                    }}
                                    >
                                        Informacion
                                    </div>
                                    <div onClick = { () => {
                                        setEditar(false)
                                        setDesaprobar(false)
                                        setDesautorizar(true)
                                        setBonoSelected({
                                            bono_id    : Bonos.bono_id,
                                            ot_id      : Bonos.ot_id,
                                            lugar_bono : Bonos.lugar_bono,
                                            fecha_bono : Bonos.fecha_bono,
                                            cliente    : Bonos.cliente, 
                                        })  
                                        setModalShow(true)
                                    } }   className='w-full md:w-1/2 h-auto px-4 py-2 text-white bg-red-500 hover:bg-red-800 hover:border-red-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center'>
                                        Des-autorizar
                                    </div>
                                </div>
                            </div>                            
                            ))
                        : null
                    }
                </div>
            )
        }
    </>
  )
}

export default Pendientes;