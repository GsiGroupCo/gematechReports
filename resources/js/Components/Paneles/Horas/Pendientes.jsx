import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Modal from "../../UI/Modal";
import EditHoras from "../../forms/Horas/EditHoras";
import DesaprobarHora from "../../forms/Horas/DesaprobarHora";
import DesautorizarHora from "../../forms/Horas/DesautorizarHora";
import Search from "@/Components/UI/Search";

    const Pendientes = ({ HorasExtras, Auth, Admin }) => { 
  
    const { data, post } = useForm();
    const [Editar, setEditar]             = useState(false)
    const [Desautorizar, setDesautorizar] = useState(false)
 
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

    function EditarRegistro(horasExtras){ 
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
        setDesautorizar(false)
        setEditar(true)
    }

    function DesAuthRegistro(horasExtras){
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
        setEditar(false)
        setDesautorizar(true)
    }

    function AutorizarHora(horasextras_id){ 
        data.horasextras_id = horasextras_id
        post(`/horas/autorizacion`)
    }
 
    function AprobarHora(horasextras_id){
        data.horasextras_id = horasextras_id
        post(`/horas/aprobada`)
    }
    
    useEffect(() => { 
        setHorasPendientes(HorasExtrasP)
        setHorasAutorizar(HorasExtrasAp)
        setHorasFiltradas(HorasExtrasPA)
    }, [HorasExtras])

    const HorasExtrasPA = HorasExtras.filter(
        (horasExtras) => horasExtras.estado === "Pendiente" ||  horasExtras.estado === "Aprobado"
    );

    const [HorasFiltradas, setHorasFiltradas] = useState(HorasExtrasPA); 
    const FiltroHoras = ( searchTerm ) => {
        const filtered = HorasExtrasPA.filter((horas) => {
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
        setHorasFiltradas(filtered);
    };
    
    
    const HorasExtrasP = HorasExtras.filter(
        (horasExtras) => horasExtras.estado === "Pendiente"
    );

    const [HorasPendientes, setHorasPendientes] = useState(HorasExtrasP); 
    const FiltroPendientes = ( searchTerm ) => {
        const filtered = HorasExtrasP.filter((horas) => {
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
        setHorasPendientes(filtered);
    };

    const HorasExtrasAp = HorasExtras.filter(
        (horasExtras) => horasExtras.estado === "Aprobado"
    );

    const [HorasAutorizar, setHorasAutorizar] = useState(HorasExtrasAp);
    const FiltroAutorizar = ( searchTerm ) => {
        const filtered = HorasExtrasAp.filter((horas) => {
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
        setHorasAutorizar(filtered);
    };

    return (
        <>
            {
                Admin.cargo === 'Coordinador de MTTO' ? (
                    <div className="w-full h-full flex flex-col px-4 xl:px-96 pb-16 bg-gray-800 justify-start items-start justify-items-center gap-2"> 
                        <div className="w-full flex flex-col xl:flex-row gap-3">
                            <Search SearchEvent = { (e) =>  FiltroPendientes(e.target.value.toLowerCase()) } />
                            <a href="/horas/aprobe/all" className="whitespace-nowrap w-auto h-[45px] grid place-content-center px-4 py-2 xl:mt-4 focus:outline-none bg-gray-600 hover:bg-green-500 cursor-pointer transition duration-700 hover:font-semibold text-white placeholder-white">
                                Aprobar todo
                            </a>
                        </div> 
                        {
                            HorasPendientes  ?   HorasPendientes.map((horasExtras) => (
                                <div 
                                    key={horasExtras.horasextras_id}
                                    className='w-full h-auto border-b-2  cursor-pointer gap-3 pb-2 flex flex-col justify-center items-start justify-items-center bg-white rounded-sm shadow-sm shadow-black'
                                >
                                    <div className={` flex flex-row justify-between ${ horasExtras.estado === 'Pendiente' ? 'bg-red-500 text-white font-bold' : horasExtras.estado === 'Autorizado' ? 'bg-green-500 text-white font-bold' : 'bg-yellow-500 text-black font-bold' } w-full h-auto px-4 py-2 rounded-sm `}>
                                        <div className="w-auto">
                                            { horasExtras.estado }
                                        </div>
                                        <div className="w-auto flex gap-3">
                                            <div onClick={() => AprobarHora(horasExtras.horasextras_id, Admin.empleado_id) } className="w-[25px] h-full bg-green-500  hover:bg-green-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                                
                                            </div>
                                            <div onClick={() => EditarRegistro(horasExtras) } className="w-[25px] h-full bg-yellow-500 hover:bg-yellow-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                                
                                            </div>
                                            <div onClick={() => DesAuthRegistro(horasExtras) } className="w-[25px] h-full bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                        <div className={`${Auth ? 'block' : 'hidden'}`}>
                                            Responsable: <span className="font-bold">{ horasExtras.responsable.nombre }</span>
                                        </div>
                                        <div>
                                            Fecha: { horasExtras.fecha }
                                        </div>
                                    </div>
                                    <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                        <div>
                                            Hora Inicial: { horasExtras.hora_inicial }
                                        </div>
                                        <div>
                                            Hora Final: { horasExtras.hora_final }
                                        </div>  
                                    </div>
                                    <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                        <div>
                                            Cantidad Horas: { horasExtras.cant_Horas }
                                        </div> 
                                        <div>
                                            OT: { horasExtras.ot }
                                        </div>
                                    </div>
                                    <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                        Observaciones: { horasExtras.observaciones }
                                    </div> 
                                </div>
                            )) : null
                        }
                        <Modal
                            isVisible = { Editar }
                            onClose   = { () => setEditar(false) }
                            tittle    = {` Editando Hora Extra `}
                        >
                            <EditHoras HoraData = { HoraSelected } onClose = { () => Editar(false) } />
                        </Modal>
                        <Modal
                            isVisible = { Desautorizar }
                            onClose   = { () => setDesautorizar(false) }
                            tittle    = {` Detalles de des-autorizacion `}
                        >
                            <DesautorizarHora Admin = { Admin } HoraData = { HoraSelected } onClose = { () => Desautorizar(false) } />
                        </Modal>
                    </div>
                )  : Admin.cargo === 'Logistica' ? (
                    <div className="w-full h-full flex flex-col px-4 xl:px-96 pb-16 bg-gray-800 justify-start items-start justify-items-center gap-2">  
                        <div className="w-full flex flex-col xl:flex-row gap-3">
                            <Search SearchEvent = { (e) =>  FiltroAutorizar(e.target.value.toLowerCase()) } />
                            <a href="/horas/auth/all" className="whitespace-nowrap w-auto h-[45px] grid place-content-center px-4 py-2 xl:mt-4 focus:outline-none bg-gray-600 hover:bg-green-500 cursor-pointer transition duration-700 hover:font-semibold text-white placeholder-white">
                                Autorizar todo
                            </a>
                        </div> 
                        {
                            HorasAutorizar  ?   HorasAutorizar.map((horasExtras) => (
                                <div 
                                    key={horasExtras.horasextras_id}  
                                    className='w-full h-auto border-b-2  cursor-pointer gap-3 pb-2 flex flex-col justify-center items-start justify-items-center bg-white rounded-sm shadow-sm shadow-black'
                                >
                                    <div className={` flex flex-row justify-between ${ horasExtras.estado === 'Pendiente' ? 'bg-red-500 text-white font-bold' : horasExtras.estado === 'Autorizado' ? 'bg-green-500 text-white font-bold' : 'bg-yellow-500 text-black font-bold' } w-full h-auto px-4 py-2 rounded-sm `}>
                                        <div className="w-auto">
                                            { horasExtras.estado }
                                        </div>
                                        <div className="w-auto flex gap-3">
                                            <div onClick={() => AutorizarHora(horasExtras.horasextras_id) } className="w-[25px] h-full bg-green-500  hover:bg-green-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                                
                                            </div>
                                            <div onClick={() => EditarRegistro(horasExtras) }  className="w-[25px] h-full bg-yellow-500 hover:bg-yellow-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                                
                                            </div>
                                            <div onClick={()=> DesAuthRegistro(horasExtras) } className="w-[25px] h-full bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                        <div className={`${Auth ? 'block' : 'hidden'}`}>
                                            Responsable: <span className="font-bold">{ horasExtras.responsable.nombre }</span>
                                        </div>
                                        <div>
                                            Fecha: { horasExtras.fecha }
                                        </div>
                                    </div>
                                    <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                        <div>
                                            Hora Inicial: { horasExtras.hora_inicial }
                                        </div>
                                        <div>
                                            Hora Final: { horasExtras.hora_final }
                                        </div>  
                                    </div>
                                    <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                        <div>
                                            Cantidad Horas: { horasExtras.cant_Horas }
                                        </div> 
                                        <div>
                                            OT: { horasExtras.ot }
                                        </div>
                                    </div>
                                    <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                        Observaciones: { horasExtras.observaciones }
                                    </div> 
                                </div>
                            )) : null
                        } 
                        <Modal
                            isVisible = { Editar }
                            onClose   = { () => setEditar(false) }
                            tittle    = {` Editando Hora Extra `}
                        >
                            <EditHoras HoraData = { HoraSelected } onClose = { () => Editar(false) } />
                        </Modal>
                        <Modal
                            isVisible = { Desautorizar }
                            onClose   = { () => setDesautorizar(false) }
                            tittle    = {` Detalles de des-autorizacion `}
                        >
                            <DesautorizarHora Admin = { Admin } HoraData = { HoraSelected } onClose = { () => Desautorizar(false) } />
                        </Modal> 
                    </div>
                ) : Admin.cargo === 'Gerente general' ? (
                    <div className="w-full h-full flex flex-col px-4 xl:px-96 pb-16 bg-gray-800 justify-start items-start justify-items-center gap-2">  
                        <div className="w-full flex flex-col xl:flex-row gap-3">
                            <Search SearchEvent = { (e) =>  FiltroHoras(e.target.value.toLowerCase()) } />
                            <a href="/horas/auth/all" className="whitespace-nowrap w-auto h-[45px] grid place-content-center px-4 py-2 xl:mt-4 focus:outline-none bg-gray-600 hover:bg-green-500 cursor-pointer transition duration-700 hover:font-semibold text-white placeholder-white">
                                Autorizar todo
                            </a>
                        </div> 
                        {
                            HorasFiltradas  ?   HorasFiltradas.map((horasExtras) => (
                                <div 
                                    key={horasExtras.horasextras_id}  
                                    className='w-full h-auto border-b-2  cursor-pointer gap-3 pb-2 flex flex-col justify-center items-start justify-items-center bg-white rounded-sm shadow-sm shadow-black'
                                >
                                    <div className={` flex flex-row justify-between ${ horasExtras.estado === 'Pendiente' ? 'bg-red-500 text-white font-bold' : horasExtras.estado === 'Autorizado' ? 'bg-green-500 text-white font-bold' : 'bg-yellow-500 text-black font-bold' } w-full h-auto px-4 py-2 rounded-sm `}>
                                        <div className="w-auto">
                                            { horasExtras.estado }
                                        </div>
                                        <div className="w-auto flex gap-3">
                                            <div onClick={() => AutorizarHora(horasExtras.horasextras_id) } className="w-[25px] h-full bg-green-500  hover:bg-green-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                                
                                            </div>
                                            <div onClick={() => EditarRegistro(horasExtras)} className="w-[25px] h-full bg-yellow-500 hover:bg-yellow-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                                
                                            </div>
                                            <div onClick={() => DesAuthRegistro(horasExtras)} className="w-[25px] h-full bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                        <div className={`${Auth ? 'block' : 'hidden'}`}>
                                            Responsable: <span className="font-bold">{ horasExtras.responsable.nombre }</span>
                                        </div>
                                        <div>
                                            Fecha: { horasExtras.fecha }
                                        </div>
                                    </div>
                                    <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                        <div>
                                            Hora Inicial: { horasExtras.hora_inicial }
                                        </div>
                                        <div>
                                            Hora Final: { horasExtras.hora_final }
                                        </div>  
                                    </div>
                                    <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                        <div>
                                            Cantidad Horas: { horasExtras.cant_Horas }
                                        </div> 
                                        <div>
                                            OT: { horasExtras.ot }
                                        </div>
                                    </div>
                                    <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                        Observaciones: { horasExtras.observaciones }
                                    </div> 
                                </div>
                            )) : null
                        } 
                        <Modal
                            isVisible = { Editar }
                            onClose   = { () => setEditar(false) }
                            tittle    = {` Editando Hora Extra `}
                        >
                            <EditHoras HoraData = { HoraSelected } onClose = { () => Editar(false) } />
                        </Modal>
                        <Modal
                            isVisible = { Desautorizar }
                            onClose   = { () => setDesautorizar(false) }
                            tittle    = {` Detalles de des-autorizacion `}
                        >
                            <DesautorizarHora Admin = { Admin } HoraData = { HoraSelected } onClose = { () => Desautorizar(false) } />
                        </Modal>
                    </div>
                ) : null
            }        
        </>
    )
}

export default Pendientes;