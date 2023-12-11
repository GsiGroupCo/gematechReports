import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Modal from "../../UI/Modal";
import EditBonos from "../../forms/Bonos/EditBonos";
import DesaprobarBono from "../../forms/Bonos/DesaprobarBono";
import DesautorizarBono from "../../forms/Bonos/DesautorizarBono";
import Search from "@/Components/UI/Search";

const Pendientes = ({Bonos, Auth, Admin }) => {
    
    const { data, post } = useForm(); 

    const [Editar, setEditar] = useState(false)
    const [Desaprobar, setDesaprobar] = useState(false) 

    const [BonoSelected, setBonoSelected] = useState({
        bono_id    : Bonos.bono_id,
        ot_id      : Bonos.ot_id,
        lugar_bono : Bonos.lugar_bono,
        fecha_bono : Bonos.fecha_bono,
        cliente    : Bonos.cliente,
    })
 
    function AutorizarBono(bono_id){
        data.bono_id = bono_id
        data.user_id = Admin.user_id
        post(`/bono/autorizacion`)
    }

    function AprobarBono(bono_id){
        data.bono_id = bono_id
        data.user_id = Admin.user_id
        post(`/bono/aprobada`)
    }
    
    function EditarRegistro(Bonos){ 
        setBonoSelected({
            bono_id    : Bonos.bono_id,
            ot_id      : Bonos.ot_id,
            lugar_bono : Bonos.lugar_bono,
            fecha_bono : Bonos.fecha_bono,
            cliente    : Bonos.cliente, 
        })    
        setDesaprobar(false)
        setEditar(true)
    }

    function DesaprobarRegistro(Bonos){
        setBonoSelected({
            bono_id     : Bonos.bono_id,
            ot_id       : Bonos.ot_id,
            lugar_bono  : Bonos.lugar_bono,
            fecha_bono  : Bonos.fecha_bono,
            cliente     : Bonos.cliente, 
        })   
        setEditar(false) 
        setDesaprobar(true)
    }

    
    useEffect(() => {
        setBonosPendientes(BonosP)
        setBonosAutorizar(BonosA)
        setBonosPenAut(BonosPA)
    }, [Bonos]);

    const BonosP = Bonos.filter(
        (bonos) => bonos.estado === "Pendiente"
    );
 
    const [BonosPendientes, setBonosPendientes] = useState(BonosP);
    const FiltrarPendientes = ( searchTerm ) => {
        const filteredPendientes  = BonosP.filter((data) => { 
            const bono_id         = data.bono_id.toLowerCase();
            const nombre_empleado = data.responsable.nombre.toLowerCase();
            const ot_id           = data.ot_id.toLowerCase();
            const fecha_bono      = data.fecha_bono.toString().toLowerCase();
            const cliente         = data.cliente.toLowerCase();
            const lugar           = data.lugar_bono.toLowerCase();
            return ( 
                bono_id.includes(searchTerm)         ||
                nombre_empleado.includes(searchTerm) ||
                ot_id.includes(searchTerm)           ||
                fecha_bono.includes(searchTerm)      ||
                cliente.includes(searchTerm)         ||
                lugar.includes(searchTerm)
            );
        });
        setBonosPendientes(filteredPendientes); 
    }; 

    const BonosA = Bonos.filter(
        (bonos) => bonos.estado === "Aprobado"
    );
    
    const [BonosAutorizar, setBonosAutorizar] = useState(BonosA);
    const FiltrarAutorizados = ( searchTerm ) => {
        const FiltrarAuth  = BonosA.filter((data) => { 
            const bono_id         = data.bono_id.toLowerCase();
            const nombre_empleado = data.responsable.nombre.toLowerCase();
            const ot_id           = data.ot_id.toLowerCase();
            const fecha_bono      = data.fecha_bono.toString().toLowerCase();
            const cliente         = data.cliente.toLowerCase();
            const lugar           = data.lugar_bono.toLowerCase();
            return ( 
                nombre_empleado.includes(searchTerm) ||
                bono_id.includes(searchTerm)         ||
                ot_id.includes(searchTerm)           ||
                fecha_bono.includes(searchTerm)      ||
                cliente.includes(searchTerm)         ||
                lugar.includes(searchTerm)
            );
        });
        setBonosAutorizar(FiltrarAuth); 
    }; 
    
    const BonosPA = Bonos.filter(
        (bonos) => bonos.estado === "Aprobado" || bonos.estado === "Pendiente"
    );
    const [BonosPenAut, setBonosPenAut] = useState(BonosPA);
    const FiltrarPenAut = ( searchTerm ) => {
        const FiltrarPenAut  = BonosPenAut.filter((data) => { 
            const bono_id         = data.bono_id.toLowerCase();
            const nombre_empleado = data.responsable.nombre.toLowerCase();
            const ot_id           = data.ot_id.toLowerCase();
            const fecha_bono      = data.fecha_bono.toString().toLowerCase();
            const cliente         = data.cliente.toLowerCase();
            const lugar           = data.lugar_bono.toLowerCase();
            return ( 
                nombre_empleado.includes(searchTerm) ||
                bono_id.includes(searchTerm)         ||
                ot_id.includes(searchTerm)           ||
                fecha_bono.includes(searchTerm)      ||
                cliente.includes(searchTerm)         ||
                lugar.includes(searchTerm)
            );
        });
        setBonosAutorizar(FiltrarPenAut); 
    }; 
 
  return (
    <>
        {
            Admin.cargo === 'Coordinador de MTTO' ? (
                <div className="w-full h-full flex flex-col px-4 xl:px-96 pb-16 bg-gray-800 justify-start items-start justify-items-center gap-2">
                    <Search SearchEvent = { (e) =>  FiltrarPendientes(e.target.value.toLowerCase()) } />
                    {
                        BonosPendientes  ?   BonosPendientes.map((Bonos) => (
                            <div 
                                key={Bonos.bono_id}
                                className='w-full h-auto border-b-2  cursor-pointer gap-3 pb-2 flex flex-col justify-center items-start justify-items-center bg-white rounded-sm shadow-sm shadow-black'
                            >
                                <div className={` flex flex-row justify-between ${ Bonos.estado === 'Pendiente' ? 'bg-red-500 text-white font-bold' : Bonos.estado === 'Autorizado' ? 'bg-green-500 text-white font-bold' : 'bg-yellow-500 text-black font-bold' } w-full h-auto px-4 py-2 rounded-sm `}>
                                    <div className="w-auto">
                                        { Bonos.estado }
                                    </div>
                                    <div className="w-auto flex gap-3">
                                        <div onClick = {() => AprobarBono(Bonos.bono_id)} className="w-[25px] h-full bg-green-500  hover:bg-green-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                            
                                        </div>
                                        <div onClick={()=> EditarRegistro(Bonos)} className="w-[25px] h-full bg-yellow-500 hover:bg-yellow-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                            
                                        </div>
                                        <div onClick={() => DesaprobarRegistro(Bonos)} className="w-[25px] h-full bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                    <div className={`${Auth ? 'block' : 'hidden'}`}>
                                    Responsable: { Bonos.responsable.nombre }
                                    </div>
                                    <div>
                                    Fecha: { Bonos.fecha_bono }
                                    </div>
                                </div>
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                    <div>
                                    Cliente: { Bonos.cliente }
                                    </div>
                                    <div>
                                    Lugar: { Bonos.lugar_bono }
                                    </div> 
                                </div>
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4"> 
                                    <div>
                                    OT: { Bonos.ot_id }
                                    </div>
                                    <div>
                                    Detalles: { Bonos.detalles }
                                    </div>
                                </div>
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                    Observaciones: { Bonos.observaciones }
                                </div> 
                            </div>
                        )) : null
                    }
                    <Modal
                        isVisible = { Editar }
                        onClose   = { () => setEditar(false) }
                        tittle    = {` Editando Hora Extra `}
                    >
                        <EditBonos BonoData = { BonoSelected } onClose = { () => setEditar(false) } />
                    </Modal>
                    <Modal
                        isVisible = { Desaprobar }
                        onClose   = { () => setDesaprobar(false) }
                        tittle    = {` Detalles de des-autorizacion `}
                    >
                        <DesautorizarBono Admin = { Admin }  BonoData = { BonoSelected } onClose = { () => setDesaprobar(false) } />
                    </Modal>
                </div>
            ) : Admin.cargo === 'Gerencia' ?  (
                <div className="w-full h-full flex flex-col px-4 xl:px-96 pb-16 bg-gray-800 justify-start items-start justify-items-center gap-2"> 
                    <Search SearchEvent = {  (e) =>  FiltrarAutorizados(e.target.value.toLowerCase()) } />
                    {
                        BonosAutorizar ? BonosAutorizar.map((Bonos) => (
                            <div 
                                key={Bonos.bono_id}
                                className='w-full h-auto border-b-2  cursor-pointer gap-3 pb-2 flex flex-col justify-center items-start justify-items-center bg-white rounded-sm shadow-sm shadow-black'
                            >
                                <div className={` flex flex-row justify-between ${ Bonos.estado === 'Pendiente' ? 'bg-red-500 text-white font-bold' : Bonos.estado === 'Autorizado' ? 'bg-green-500 text-white font-bold' : 'bg-yellow-500 text-black font-bold' } w-full h-auto px-4 py-2 rounded-sm `}>
                                    <div className="w-auto">
                                        { Bonos.estado }
                                    </div>
                                    <div className="w-auto flex gap-3">
                                        <div onClick = {() => AutorizarBono(Bonos.bono_id)} className="w-[25px] h-full bg-green-500  hover:bg-green-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                            
                                        </div>
                                        <div onClick={()=> EditarRegistro(Bonos)} className="w-[25px] h-full bg-yellow-500 hover:bg-yellow-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                            
                                        </div>
                                        <div onClick={() => DesaprobarRegistro(Bonos)} className="w-[25px] h-full bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                    <div className={`${Auth ? 'block' : 'hidden'}`}>
                                    Responsable: { Bonos.responsable.nombre }
                                    </div>
                                    <div>
                                    Fecha: { Bonos.fecha_bono }
                                    </div>
                                </div>
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                    <div>
                                    Cliente: { Bonos.cliente }
                                    </div>
                                    <div>
                                    Lugar: { Bonos.lugar_bono }
                                    </div> 
                                </div>
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4"> 
                                    <div>
                                    OT: { Bonos.ot_id }
                                    </div>
                                    <div>
                                    Detalles: { Bonos.detalles }
                                    </div>
                                </div>
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                    Observaciones: { Bonos.observaciones }
                                </div> 
                            </div>
                        )) : null
                    }
                    <Modal
                        isVisible = { Editar }
                        onClose   = { () => setEditar(false) }
                        tittle    = {` Editando Hora Extra `}
                    >
                        <EditBonos BonoData = { BonoSelected } onClose = { () => setEditar(false) } />
                    </Modal>
                    <Modal
                        isVisible = { Desaprobar }
                        onClose   = { () => setDesaprobar(false) }
                        tittle    = {` Detalles de des-autorizacion `}
                    >
                        <DesautorizarBono Admin = { Admin }  BonoData = { BonoSelected } onClose = { () => setDesaprobar(false) } />
                    </Modal>
                </div>
            ) : Admin.cargo === 'Gerente general' ?  (
                <div className="w-full h-full flex flex-col px-4 xl:px-96 pb-16 bg-gray-800 justify-start items-start justify-items-center gap-2"> 
                    <Search SearchEvent = {  (e) =>  FiltrarPenAut(e.target.value.toLowerCase()) } />
                    {
                        BonosPenAut ? BonosPenAut.map((Bonos) => (
                            <div 
                                key={Bonos.bono_id}
                                className='w-full h-auto border-b-2  cursor-pointer gap-3 pb-2 flex flex-col justify-center items-start justify-items-center bg-white rounded-sm shadow-sm shadow-black'
                            >
                                <div className={` flex flex-row justify-between ${ Bonos.estado === 'Pendiente' ? 'bg-red-500 text-white font-bold' : Bonos.estado === 'Autorizado' ? 'bg-green-500 text-white font-bold' : 'bg-yellow-500 text-black font-bold' } w-full h-auto px-4 py-2 rounded-sm `}>
                                    <div className="w-auto">
                                        { Bonos.estado }
                                    </div>
                                    <div className="w-auto flex gap-3">
                                        <div  onClick = {() => AutorizarBono(Bonos.bono_id)} className="w-[25px] h-full bg-green-500  hover:bg-green-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                            
                                        </div>
                                        <div onClick={()=> EditarRegistro(Bonos)} className="w-[25px] h-full bg-yellow-500 hover:bg-yellow-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                            
                                        </div>
                                        <div onClick={() => DesaprobarRegistro(Bonos)} className="w-[25px] h-full bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                    <div className={`${Auth ? 'block' : 'hidden'}`}>
                                    Responsable: { Bonos.responsable.nombre }
                                    </div>
                                    <div>
                                    Fecha: { Bonos.fecha_bono }
                                    </div>
                                </div>
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                    <div>
                                    Cliente: { Bonos.cliente }
                                    </div>
                                    <div>
                                    Lugar: { Bonos.lugar_bono }
                                    </div> 
                                </div>
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4"> 
                                    <div>
                                    OT: { Bonos.ot_id }
                                    </div>
                                    <div>
                                    Detalles: { Bonos.detalles }
                                    </div>
                                </div>
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                    Observaciones: { Bonos.observaciones }
                                </div> 
                            </div>
                        )) : null
                    }
                    <Modal
                        isVisible = { Editar }
                        onClose   = { () => setEditar(false) }
                        tittle    = {` Editando Hora Extra `}
                    >
                        <EditBonos BonoData = { BonoSelected } onClose = { () => setEditar(false) } />
                    </Modal>
                    <Modal
                        isVisible = { Desaprobar }
                        onClose   = { () => setDesaprobar(false) }
                        tittle    = {` Detalles de des-autorizacion `}
                    >
                        <DesautorizarBono Admin = { Admin }  BonoData = { BonoSelected } onClose = { () => setDesaprobar(false) } />
                    </Modal>
                </div>
            ) : null
        }
    </>
  )
}

export default Pendientes;