import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Modal from "../../UI/Modal";
import EditHoras from "../../forms/Horas/EditHoras";
import DesaprobarHora from "../../forms/Horas/DesaprobarHora";
import DesautorizarHora from "../../forms/Horas/DesautorizarHora";

    const Pendientes = ({ HorasExtras, Auth, Admin }) => { 
       
    const { data, post } = useForm();

    const [Editar, setEditar]             = useState(false)
    const [Desaprobar, setDesaprobar]     = useState(false)
    const [Desautorizar, setDesautorizar] = useState(false)

    const [ModalShow, setModalShow] = useState(false)
    const [ModalInfoShow, setModalInfoShow] = useState(false)
    const [HoraSelected, setHoraSelected] = useState({
        horasextras_id: "",
        empleado_id : "",
        fecha: "",
        hora_inicial: "",
        hora_final: "",
        cant_Horas: "",
        estado: "",
        ot: ""
    }) 

    function AutorizarHora(horasextras_id){
        data.horasextras_id = horasextras_id 
        post(`/horas/autorizacion`)
    }
 
    function AprobarHora(horasextras_id){
        data.horasextras_id = horasextras_id
        post(`/horas/aprobada`)
    }
    
    const HorasExtrasPendientesAprobar = HorasExtras.filter(
        (horasExtras) => horasExtras.estado === "Pendiente"
    );

    const [HorasPendientesAprobar, setHorasPendientesAprobar] = useState(HorasExtrasPendientesAprobar); 
    const FiltroPendientesAprobar = ( searchTerm ) => {
        const filtered = HorasExtrasPendientesAprobar.filter((horas) => {
            const horasextras_id = horas.horasextras_id.toLowerCase();
            const nombre_empleado = horas.responsable.nombre.toLowerCase();
            const ot = horas.ot.toLowerCase();
            const fecha = horas.fecha.toString().toLowerCase();
            const hora_final = horas.hora_final.toLowerCase();
            const hora_inicial = horas.hora_inicial.toLowerCase();
            return (
                horasextras_id.includes(searchTerm) ||
                nombre_empleado.includes(searchTerm) ||
                ot.includes(searchTerm) ||
                fecha.includes(searchTerm) ||
                hora_final.includes(searchTerm) ||
                hora_inicial.includes(searchTerm)
            );
        });
        setHorasPendientesAprobar(filtered);
    };

    const HorasExtrasPendientesAutorizar = HorasExtras.filter(
        (horasExtras) => horasExtras.estado === "Aprobado"
    );

    const [HorasPendientesAutorizar, setHorasPendientesAutorizar] = useState(HorasExtrasPendientesAutorizar);
     
    const FiltroPendientesAutorizar = ( searchTerm ) => {
        const filtered = HorasExtrasPendientesAutorizar.filter((horas) => {
            const horasextras_id = horas.horasextras_id.toLowerCase();
            const nombre_empleado = horas.responsable.nombre.toLowerCase();
            const ot = horas.ot.toLowerCase();
            const fecha = horas.fecha.toString().toLowerCase();
            const hora_final = horas.hora_final.toLowerCase();
            const hora_inicial = horas.hora_inicial.toLowerCase();
            return (
                horasextras_id.includes(searchTerm) ||
                nombre_empleado.includes(searchTerm) ||
                ot.includes(searchTerm) ||
                fecha.includes(searchTerm) ||
                hora_final.includes(searchTerm) ||
                hora_inicial.includes(searchTerm)
            );
        });
        setHorasPendientesAutorizar(filtered);
    };

    useEffect(() => { 
        setHorasPendientesAprobar(HorasExtrasPendientesAprobar)
        setHorasPendientesAutorizar(HorasExtrasPendientesAutorizar)
    }, [HorasExtras])
    
    return (
        <>
            {
                Admin === 'Coordinador de MTTO' ? (
                    <div className="w-full h-full bg-gray-200 flex flex-col justify-start items-start justify-items-center overflow-hidden overflow-y-auto">
                        <div className='w-full h-auto bg-gray-200 gap-2 flex justify-evenly items-center justify-items-center p-2 '>
                            <input 
                                type="text" 
                                placeholder='Buscar...' 
                                className='w-full h-[45px] text-black px-4 py-2 focus:outline-none bg-gray-100 border border-black rounded-md ' 
                                onChange={(e) => FiltroPendientesAutorizar(e.target.value.toLowerCase())}
                            />
                        </div>
                        <div  className=' hidden w-full h-auto border-b-2 cursor-pointer md:flex flex-col md:flex-row justify-center items-center justify-items-center bg-white'>
                            <div className='w-full py-4 md:w-full h-full flex flex-col md:flex-row   bg-[#323c7c] text-white'>
                                <div className='w-full flex '> 
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
                                        <span className='font-bold'> HORA INICIO </span>
                                    </div>
                                    <div className={`${Auth ? 'w-full md:w-[20%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                        <span className='font-bold'> HORA FIN </span>
                                    </div>
                                </div>
                                <div className="w-[500px] h-auto flex justify-center items-center">
                                    <span className='font-bold'> ACCIONES </span>
                                </div>
                            </div>
                        </div>
                        {
                            HorasPendientesAprobar 
                            ?  
                                HorasPendientesAprobar.map((horasExtras) => (
                                    <div key={horasExtras.horasextras_id} className='w-full  h-auto border-b-2   cursor-pointer  px-4 py-2  flex flex-col md:flex-row justify-center items-center justify-items-center gap-3 bg-white'>
                                        <div className='w-full md:w-full h-full flex flex-col text-center md:flex-row justify-center items-center justify-items-center'>
                                            <div className={`${Auth ? 'w-full lg:w-[20%] ' : 'hidden'} h-auto flex lg:justify-center lg:items-center`}>
                                                <span className='font-semibold'> <span className="sm:hidden"> Trabajador: </span> {horasExtras.responsable.nombre}</span>
                                            </div>
                                            <div className={`${Auth ? 'w-full lg:w-[20%] ' : 'w-[25%]'} h-auto flex lg:justify-center lg:items-center`}>
                                                <span className='font-semibold'><span className="sm:hidden"> OT: </span> {horasExtras.ot}</span>
                                            </div>
                                            <div className={`${Auth ? 'w-full lg:w-[20%] ' : 'w-[25%]'} h-auto flex lg:justify-center lg:items-center`}>
                                                <span className='font-semibold'> <span className="sm:hidden"> Fecha: </span> {horasExtras.fecha.toString()}</span>
                                            </div>
                                            <div className={`${Auth ? 'w-full lg:w-[20%] ' : 'w-[25%]'} h-auto flex lg:justify-center lg:items-center`}>
                                                <span className='font-semibold'> <span className="sm:hidden"> Hora Inicial: </span> {horasExtras.hora_inicial}</span>
                                            </div>
                                            <div className={`${Auth ? 'w-full lg:w-[20%] ' : 'w-[25%]'} h-auto flex lg:justify-center lg:items-center`}>
                                                <span className='font-semibold'> <span className="sm:hidden"> Hora Final: </span> {horasExtras.hora_final}</span>
                                            </div>
                                        </div>
                                        <div className={` ${Auth ? 'w-full md:w-1/4 h-full flex flex-col justify-center items-center gap-1' : 'hidden' } `}>
                                            <div className="w-full flex flex-col lg:flex-row gap-1 lg:gap-3 justify-center items-center">
                                                <div onClick = { () => AprobarHora( horasExtras.horasextras_id )}   className='w-full h-auto px-4 py-2 text-white bg-green-500 hover:bg-green-800 hover:border-green-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center'>
                                                    Aprobar
                                                </div>
                                                <div onClick = { () => { 
                                                        setDesaprobar(false)
                                                        setDesautorizar(false)
                                                        setEditar(true)
                                                        setHoraSelected({
                                                            horasextras_id : horasExtras.horasextras_id,
                                                            empleado_id    : horasExtras.empleado_id,
                                                            fecha          : horasExtras.fecha,
                                                            hora_inicial   : horasExtras.hora_inicial,
                                                            hora_final     : horasExtras.hora_final,
                                                            cant_Horas     : horasExtras.cant_Horas,
                                                            estado         : horasExtras.estado,
                                                            ot             : horasExtras.ot
                                                        })  
                                                        setModalShow(true)
                                                }}   
                                                    className='w-full h-auto px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-800 hover:border-yellow-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center'>
                                                    Editar
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col lg:flex-row gap-1 lg:gap-3 justify-center items-center">
                                                <div className='w-full lg:w-1/2 h-auto px-4 py-2 text-white bg-blue-500 hover:bg-blue-800 hover:border-blue-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center' onClick={ () => {
                                                    setHoraSelected({
                                                        horasextras_id:horasExtras.horasextras_id,
                                                        empleado_id :horasExtras.responsable.nombre,
                                                        fecha:horasExtras.fecha,
                                                        hora_inicial:horasExtras.hora_inicial,
                                                        hora_final:horasExtras.hora_final,
                                                        cant_Horas:horasExtras.cant_Horas,
                                                        estado:horasExtras.estado,
                                                        ot:horasExtras.ot,
                                                        observaciones: horasExtras.observaciones
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
                                                    setHoraSelected({
                                                        horasextras_id : horasExtras.horasextras_id,
                                                        empleado_id    : horasExtras.empleado_id,
                                                        fecha          : horasExtras.fecha,
                                                        hora_inicial   : horasExtras.hora_inicial,
                                                        hora_final     : horasExtras.hora_final,
                                                        cant_Horas     : horasExtras.cant_Horas,
                                                        estado         : horasExtras.estado,
                                                        ot             : horasExtras.ot
                                                    })  
                                                    setModalShow(true)
                                                } }   className='w-full lg:w-1/2 h-auto px-4 py-2 text-white bg-red-500 hover:bg-red-800 hover:border-red-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center'>
                                                    Desautorizar
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            : null
                        }
                        {
                            Desautorizar ? (
                                <Modal
                                    isVisible = { ModalShow }
                                    onClose   = { () => setModalShow(false) }
                                    tittle    = {` Detalles de des-autorizacion `}
                                >
                                    <DesautorizarHora HoraData = { HoraSelected } onClose = { () => ModalShow(false) } />
                                </Modal>
                            ) : null
                        } 
                        <Modal
                            isVisible = { ModalInfoShow }
                            tittle = {` Detalles de Hora `}
                            onClose = { () => setModalInfoShow(false) }
                        >
                            <div className="w-full h-auto p-4 flex flex-col justify-center items-center gap-3 ">
                                <div className="w-full flex justify-start items-center rounded-md border border-black px-4 py-2">
                                TRABAJADOR : { HoraSelected.empleado_id }
                                </div>
                                <div className="w-full flex flex-row justify-start items-center gap-3">
                                    <div className="w-1/2 border border-black rounded-md px-4 py-2">
                                    Hora de inicio: { HoraSelected.hora_inicial }
                                    </div>
                                    <div className="w-1/2 border border-black rounded-md px-4 py-2">
                                    Hora de finalizacion: { HoraSelected.hora_final }
                                    </div>
                                </div>
                                <div className="w-full flex flex-row justify-start items-center gap-3">
                                    <div className="w-1/2 border border-black rounded-md px-4 py-2">
                                    OT: { HoraSelected.ot }
                                    </div>
                                    <div className="w-1/2 border border-black rounded-md px-4 py-2">
                                    Fecha: { HoraSelected.fecha }
                                    </div>
                                </div>
                                <div className="w-full flex justify-start items-center rounded-md border border-black px-4 py-2">
                                    OBSERVACIONES : { HoraSelected.observaciones }
                                </div>
                            </div>
                        </Modal>
                    </div>
                )  : Admin === 'Logistica' ? (
                    <div className="w-full h-full bg-gray-200 flex flex-col justify-start items-start justify-items-center overflow-hidden overflow-y-auto">
                        <div className='w-full h-auto bg-gray-200 gap-2 flex justify-evenly items-center justify-items-center p-2 '>
                            <input 
                                type="text" 
                                placeholder='Buscar...' 
                                className='w-full h-[45px] text-black px-4 py-2 focus:outline-none bg-gray-100 border border-black rounded-md ' 
                                onChange={(e) => FiltroPendientesAutorizar(e.target.value.toLowerCase())}
                            />
                        </div>
                        <div  className=' hidden w-full h-auto border-b-2 cursor-pointer md:flex flex-col md:flex-row justify-center items-center justify-items-center bg-white'>
                            <div className='w-full py-4 md:w-full h-full flex flex-col md:flex-row   bg-[#323c7c] text-white'>
                                <div className='w-full flex '> 
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
                                        <span className='font-bold'> HORA INICIO </span>
                                    </div>
                                    <div className={`${Auth ? 'w-full md:w-[20%]' : 'w-full md:w-[25%]'} h-auto flex justify-start md:justify-center items-center`}>
                                        <span className='font-bold'> HORA FIN </span>
                                    </div>
                                </div>
                                <div className="w-[500px] h-auto flex justify-center items-center">
                                    <span className='font-bold'> ACCIONES </span>
                                </div>
                            </div>
                        </div>
                        {
                            HorasPendientesAutorizar 
                            ?  
                                HorasPendientesAutorizar.map((horasExtras) => (
                                    <div key={horasExtras.horasextras_id} className='w-full  h-auto border-b-2   cursor-pointer  px-4 py-2  flex flex-col md:flex-row justify-center items-center justify-items-center gap-3 bg-white'>
                                        <div className='w-full md:w-full h-full flex flex-col text-center md:flex-row justify-center items-center justify-items-center'>
                                            <div className={`${Auth ? 'w-full lg:w-[20%] ' : 'hidden'} h-auto flex lg:justify-center lg:items-center`}>
                                                <span className='font-semibold'> <span className="sm:hidden"> Trabajador: </span> {horasExtras.responsable.nombre}</span>
                                            </div>
                                            <div className={`${Auth ? 'w-full lg:w-[20%] ' : 'w-[25%]'} h-auto flex lg:justify-center lg:items-center`}>
                                                <span className='font-semibold'><span className="sm:hidden"> OT: </span> {horasExtras.ot}</span>
                                            </div>
                                            <div className={`${Auth ? 'w-full lg:w-[20%] ' : 'w-[25%]'} h-auto flex lg:justify-center lg:items-center`}>
                                                <span className='font-semibold'> <span className="sm:hidden"> Fecha: </span> {horasExtras.fecha.toString()}</span>
                                            </div>
                                            <div className={`${Auth ? 'w-full lg:w-[20%] ' : 'w-[25%]'} h-auto flex lg:justify-center lg:items-center`}>
                                                <span className='font-semibold'> <span className="sm:hidden"> Hora Inicial: </span> {horasExtras.hora_inicial}</span>
                                            </div>
                                            <div className={`${Auth ? 'w-full lg:w-[20%] ' : 'w-[25%]'} h-auto flex lg:justify-center lg:items-center`}>
                                                <span className='font-semibold'> <span className="sm:hidden"> Hora Final: </span> {horasExtras.hora_final}</span>
                                            </div>
                                        </div>
                                        <div className={` ${Auth ? 'w-full md:w-1/4 h-full flex flex-col justify-center items-center gap-1' : 'hidden' } `}>
                                            <div className="w-full flex flex-col lg:flex-row gap-1 lg:gap-3 justify-center items-center">
                                                <div onClick = { () => AutorizarHora( horasExtras.horasextras_id )}   className='w-full h-auto px-4 py-2 text-white bg-green-500 hover:bg-green-800 hover:border-green-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center'>
                                                    Autorizar
                                                </div>
                                                <div onClick = { () => { 
                                                        setDesaprobar(false)
                                                        setDesautorizar(false)
                                                        setEditar(true)
                                                        setHoraSelected({
                                                            horasextras_id : horasExtras.horasextras_id,
                                                            empleado_id    : horasExtras.empleado_id,
                                                            fecha          : horasExtras.fecha,
                                                            hora_inicial   : horasExtras.hora_inicial,
                                                            hora_final     : horasExtras.hora_final,
                                                            cant_Horas     : horasExtras.cant_Horas,
                                                            estado         : horasExtras.estado,
                                                            ot             : horasExtras.ot
                                                        })  
                                                        setModalShow(true)
                                                }}   
                                                    className='w-full h-auto px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-800 hover:border-yellow-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center'>
                                                    Editar
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col lg:flex-row gap-1 lg:gap-3 justify-center items-center">
                                                <div className='w-full lg:w-1/2 h-auto px-4 py-2 text-white bg-blue-500 hover:bg-blue-800 hover:border-blue-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center' onClick={ () => {
                                                    setHoraSelected({
                                                        horasextras_id:horasExtras.horasextras_id,
                                                        empleado_id :horasExtras.responsable.nombre,
                                                        fecha:horasExtras.fecha,
                                                        hora_inicial:horasExtras.hora_inicial,
                                                        hora_final:horasExtras.hora_final,
                                                        cant_Horas:horasExtras.cant_Horas,
                                                        estado:horasExtras.estado,
                                                        ot:horasExtras.ot,
                                                        observaciones: horasExtras.observaciones
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
                                                    setHoraSelected({
                                                        horasextras_id : horasExtras.horasextras_id,
                                                        empleado_id    : horasExtras.empleado_id,
                                                        fecha          : horasExtras.fecha,
                                                        hora_inicial   : horasExtras.hora_inicial,
                                                        hora_final     : horasExtras.hora_final,
                                                        cant_Horas     : horasExtras.cant_Horas,
                                                        estado         : horasExtras.estado,
                                                        ot             : horasExtras.ot
                                                    })  
                                                    setModalShow(true)
                                                } }   className='w-full lg:w-1/2 h-auto px-4 py-2 text-white bg-red-500 hover:bg-red-800 hover:border-red-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center'>
                                                    Desautorizar
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            : null
                        }
                        {
                            Desautorizar ? (
                                <Modal
                                    isVisible = { ModalShow }
                                    onClose   = { () => setModalShow(false) }
                                    tittle    = {` Detalles de des-autorizacion `}
                                >
                                    <DesautorizarHora HoraData = { HoraSelected } onClose = { () => ModalShow(false) } />
                                </Modal>
                            ) : null
                        } 
                        <Modal
                            isVisible = { ModalInfoShow }
                            tittle = {` Detalles de Hora `}
                            onClose = { () => setModalInfoShow(false) }
                        >
                            <div className="w-full h-auto p-4 flex flex-col justify-center items-center gap-3 ">
                                <div className="w-full flex justify-start items-center rounded-md border border-black px-4 py-2">
                                TRABAJADOR : { HoraSelected.empleado_id }
                                </div>
                                <div className="w-full flex flex-row justify-start items-center gap-3">
                                    <div className="w-1/2 border border-black rounded-md px-4 py-2">
                                    Hora de inicio: { HoraSelected.hora_inicial }
                                    </div>
                                    <div className="w-1/2 border border-black rounded-md px-4 py-2">
                                    Hora de finalizacion: { HoraSelected.hora_final }
                                    </div>
                                </div>
                                <div className="w-full flex flex-row justify-start items-center gap-3">
                                    <div className="w-1/2 border border-black rounded-md px-4 py-2">
                                    OT: { HoraSelected.ot }
                                    </div>
                                    <div className="w-1/2 border border-black rounded-md px-4 py-2">
                                    Fecha: { HoraSelected.fecha }
                                    </div>
                                </div>
                                <div className="w-full flex justify-start items-center rounded-md border border-black px-4 py-2">
                                    OBSERVACIONES : { HoraSelected.observaciones }
                                </div>
                            </div>
                        </Modal>
                    </div>
                ) : null
            }        
        </>
    )
}

export default Pendientes;