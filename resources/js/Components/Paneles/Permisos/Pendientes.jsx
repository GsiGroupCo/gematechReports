import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Modal from "../../UI/Modal";
import DesautorizarPermiso from "../../forms/Permisos/DesautorizarPermiso";
import EditPermiso from "@/Components/forms/Permisos/EditarPermisos/EditarPermisos";
import pdf_icon from '../../../../../public/img/pdf.png'
 
    const Pendiente = ({ Permisos, Auth, Admin }) => {
    
    const PermisoData = [];
    Permisos.forEach(Permisos => {
        const anexosData = Permisos.anexos.map(documentos => ({
        anexo_id: documentos.anexo_id,
        permiso_id: documentos.permiso_id,
        nombre_documento: documentos.nombre_documento,
        url: documentos.url,
        created_at: documentos.created_at,
        updated_at: documentos.updated_at,
        })); 

        PermisoData.push({
        permiso_id: Permisos.permiso_id,
        empleado_id: Permisos.empleado_id,
        motivo: Permisos.motivo,
        fecha_inicio: Permisos.fecha_inicio,
        fecha_terminacion: Permisos.fecha_terminacion,
        jornada: Permisos.jornada,
        hora_inicio: Permisos.hora_inicio,
        hora_fin: Permisos.hora_fin,
        cant_horas: Permisos.cant_horas,
        observaciones: Permisos.observaciones,
        detalles: Permisos.detalles,
        remuneracion: Permisos.remuneracion,
        estado: Permisos.estado,
        responsable: {
            empleado_id: Permisos.responsable.empleado_id,
            nombre: Permisos.responsable.nombre,
            cargo: Permisos.responsable.cargo,
            cc: Permisos.responsable.cc,
            estado: Permisos.responsable.estado,
            created_at: Permisos.responsable.created_at,
            updated_at: Permisos.responsable.updated_at,
        },
        anexos: anexosData,
        created_at: Permisos.created_at,
        updated_at: Permisos.updated_at,
        });
    });

    const { data, patch } = useForm();

    const [Editar, setEditar]               = useState(false)
    const [Desautorizar, setDesautorizar]   = useState(false)

    function AutorizarPermiso(permiso_id){
        data.permiso_id = permiso_id
        data.user_id    = Admin.user_id
        patch(`/permisos/aprobe`)
    }

    function EditarRegistro(permisos){
        setDesautorizar(false)
        setEditar(true)
        setPermisoSelected({
            permiso_id        : permisos.permiso_id,
            empleado_id       : permisos.empleado_id,
            motivo            : permisos.motivo,
            fecha_inicio      : permisos.fecha_inicio,
            fecha_terminacion : permisos.fecha_terminacion,
            jornada           : permisos.jornada,
            hora_inicio       : permisos.hora_inicio,
            hora_fin          : permisos.hora_fin,
            cant_horas        : permisos.cant_horas,
            observaciones     : permisos.observaciones,
            remuneracion      : permisos.remuneracion,
            estado            : permisos.estado
        })  
        setModalShow(true)
    }

    function DesautorizarPermiso(permisos){
        setEditar(false) 
        setDesautorizar(true)
        setPermisoSelected({
            permiso_id        : permisos.permiso_id,
            empleado_id       : permisos.empleado_id,
            motivo            : permisos.motivo,
            fecha_inicio      : permisos.fecha_inicio,
            fecha_terminacion : permisos.fecha_terminacion,
            jornada           : permisos.jornada,
            hora_inicio       : permisos.hora_inicio,
            hora_fin          : permisos.hora_fin,
            cant_horas        : permisos.cant_horas,
            observaciones     : permisos.observaciones,
            remuneracion      : permisos.remuneracion,
            estado            : permisos.estado    
        })  
        setModalShow(true)
    }
        
    const PermisosP = PermisoData.filter(
        (PermisoData) => PermisoData.estado === "Pendiente"
    );
    
    const [PermisosPFiltrados, setPermisosPFiltrados] = useState(PermisosP);
    const FiltroPermisosP = ( searchTerm ) => {
        const filtered = PermisosP.filter((permisos) => {
          const permiso_id        = permisos.permiso_id.toLowerCase();
          const empleado_id       = permisos.responsable.nombre.toLowerCase();
          const motivo            = permisos.motivo.toLowerCase();
          const fecha_inicio      = permisos.fecha_inicio.toString().toLowerCase();
          const fecha_terminacion = permisos.fecha_terminacion.toLowerCase();
          const jornada           = permisos.jornada.toLowerCase();
          const hora_inicio       = permisos.hora_inicio.toLowerCase();
          const hora_fin          = permisos.hora_fin.toLowerCase();
          const cant_horas        = permisos.cant_horas.toLowerCase();
          const observaciones     = permisos.observaciones.toLowerCase();
          const estado            = permisos.estado.toLowerCase(); 
          return (
            permiso_id.includes(searchTerm)         ||
            empleado_id.includes(searchTerm)        ||
            motivo.includes(searchTerm)             ||
            fecha_inicio.includes(searchTerm)       ||
            fecha_terminacion.includes(searchTerm)  ||
            jornada.includes(searchTerm)            ||
            hora_inicio.includes(searchTerm)        ||
            hora_fin.includes(searchTerm)           ||
            cant_horas.includes(searchTerm)         ||
            observaciones.includes(searchTerm)      ||
            estado.includes(searchTerm)
          );
        });
        setPermisosPFiltrados(filtered);
    };

    useEffect(() => { 
        setPermisosPFiltrados(PermisosP) 
    }, [Permisos])
    
    return (
      <>
        {
            Admin.cargo === 'Gerente general' ? (
                <div className="w-full h-full flex flex-col px-4 xl:px-96 pb-16 bg-gray-800 justify-start items-start justify-items-center gap-2">
                    <input 
                        type="text" 
                        placeholder='Buscar...' 
                        className='w-full h-[45px] px-4 py-2 mt-4 focus:outline-none bg-gray-600 text-white placeholder-white' 
                        onChange={(e) => FiltroPermisosP(e.target.value.toLowerCase())}
                    />  
                 {
                    PermisosPFiltrados ? 
                        PermisosPFiltrados.map((permisos) => (
                        <div 
                            key={permisos.permiso_id}
                            className='w-full h-auto border-b-2  cursor-pointer gap-3 pb-2 flex flex-col justify-center items-start justify-items-center bg-white rounded-sm shadow-sm shadow-black'
                        >
                            <div className={` flex flex-row justify-between ${ permisos.estado === 'Pendiente' ? 'bg-red-500 text-white font-bold' : permisos.estado === 'Autorizado' ? 'bg-green-500 text-white font-bold' : 'bg-yellow-500 text-black font-bold' } w-full h-auto px-4 py-2 rounded-sm `}>
                                <div className="w-auto">
                                    { permisos.estado }
                                </div>
                                <div className="w-auto flex gap-3">
                                    <div onClick = {() => AutorizarPermiso(permisos.permiso_id)} className="w-[25px] h-full bg-green-500  hover:bg-green-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                        
                                    </div>
                                    <div onClick={()=> EditarRegistro(permisos)} className="w-[25px] h-full bg-yellow-500 hover:bg-yellow-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                        
                                    </div>
                                    <div onClick={() => DesautorizarPermiso(permisos)} className="w-[25px] h-full bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                <div className={`${Auth ? 'block' : 'hidden'}`}>
                                Responsable: <span className='font-bold'>{ permisos.responsable.nombre }</span>
                                </div>
                            </div>
                            <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4"> 
                                <div>
                                Fecha Inicio: { permisos.fecha_inicio }
                                </div>
                                <div>
                                Fecha Terminacion: { permisos.fecha_terminacion }
                                </div>
                            </div> 
                            <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4"> 
                                <div>
                                Hora Inicio: { permisos.hora_inicio }
                                </div>
                                <div>
                                Hora Fin: { permisos.hora_fin }
                                </div>
                            </div>
                            <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4"> 
                                <div>
                                remuneracion: { permisos.remuneracion }
                                </div>
                                <div>
                                Cantidad Horas: { permisos.cant_horas }
                                </div>
                            </div>
                            <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4"> 
                                <div>
                                Jornada: { permisos.jornada }
                                </div>
                                <div>
                                Motivo: { permisos.motivo }
                                </div>
                            </div>
                            <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                Observaciones: { permisos.observaciones }
                            </div>
                            <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                <span>
                                    Anexos:
                                </span> 
                                <div className='flex gap-3'>
                                    {
                                        permisos.anexos ? permisos.anexos.map((data) => (
                                            <div key={data.anexo_id} className='w-[25px] h-auto'>
                                                <img src={pdf_icon} alt="Anexos Permiso" className='w-full h-full object-cover'/>
                                            </div>
                                        )) : null
                                    }
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
                            <DesautorizarPermiso PermisoData = { PermisoSelected } onClose = { () => setModalShow(false) } />
                        </Modal>
                    ) : null
                }
                {
                    Editar ? (
                        <Modal
                            isVisible = { ModalShow }
                            onClose   = { () => setModalShow(false) }
                            tittle    = {` Editando Permiso `}
                        >
                            <EditPermiso PermisoSelected = { PermisoSelected } onClose = { () => setModalShow() } />
                        </Modal>
                    ) : null
                }  
              </div>
            ) : Admin.cargo === 'HSEQ / GESTION DE TALENTO HUMANO' || Admin.cargo === 'AUX PERMISOS' ? (
                <div className="w-full h-full flex flex-col px-4 xl:px-96 pb-16 bg-gray-800 justify-start items-start justify-items-center gap-2">
                    <input 
                        type="text" 
                        placeholder='Buscar...' 
                        className='w-full h-[45px] px-4 py-2 mt-4 focus:outline-none bg-gray-600 text-white placeholder-white' 
                        onChange={(e) => FiltroPermisosP(e.target.value.toLowerCase())}
                    />  
                    {
                        PermisosPFiltrados ? 
                            PermisosPFiltrados.map((permisos) => (
                            <div 
                                key={permisos.permiso_id}
                                className='w-full h-auto border-b-2  cursor-pointer gap-3 pb-2 flex flex-col justify-center items-start justify-items-center bg-white rounded-sm shadow-sm shadow-black'
                            >
                                <div className={` flex flex-row justify-between ${ permisos.estado === 'Pendiente' ? 'bg-red-500 text-white font-bold' : permisos.estado === 'Autorizado' ? 'bg-green-500 text-white font-bold' : 'bg-yellow-500 text-black font-bold' } w-full h-auto px-4 py-2 rounded-sm `}>
                                    <div className="w-auto">
                                        { permisos.estado }
                                    </div>
                                    <div className="w-auto flex gap-3">
                                        <div onClick = {() => AutorizarPermiso(permisos.permiso_id)} className="w-[25px] h-full bg-green-500  hover:bg-green-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                            
                                        </div>
                                        <div onClick={()=> EditarRegistro(permisos)} className="w-[25px] h-full bg-yellow-500 hover:bg-yellow-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                            
                                        </div>
                                        <div onClick={() => DesautorizarPermiso(permisos)} className="w-[25px] h-full bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out rounded-full border border-white shadow shadow-black">
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                    <div className={`${Auth ? 'block' : 'hidden'}`}>
                                    Responsable: <span className='font-bold'>{ permisos.responsable.nombre }</span>
                                    </div>
                                </div>
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4"> 
                                    <div>
                                    Fecha Inicio: { permisos.fecha_inicio }
                                    </div>
                                    <div>
                                    Fecha Terminacion: { permisos.fecha_terminacion }
                                    </div>
                                </div> 
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4"> 
                                    <div>
                                    Hora Inicio: { permisos.hora_inicio }
                                    </div>
                                    <div>
                                    Hora Fin: { permisos.hora_fin }
                                    </div>
                                </div>
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4"> 
                                    <div>
                                    remuneracion: { permisos.remuneracion }
                                    </div>
                                    <div>
                                    Cantidad Horas: { permisos.cant_horas }
                                    </div>
                                </div>
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4"> 
                                    <div>
                                    Jornada: { permisos.jornada }
                                    </div>
                                    <div>
                                    Motivo: { permisos.motivo }
                                    </div>
                                </div>
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                    Observaciones: { permisos.observaciones }
                                </div>
                                <div className="w-full flex  flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                                    <span>
                                        Anexos:
                                    </span> 
                                    <div className='flex gap-3'>
                                        {
                                            permisos.anexos ? permisos.anexos.map((data) => (
                                                <div key={data.anexo_id} className='w-[25px] h-auto'>
                                                    <img src={pdf_icon} alt="Anexos Permiso" className='w-full h-full object-cover'/>
                                                </div>
                                            )) : null
                                        }
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
                                <DesautorizarPermiso PermisoData = { PermisoSelected } onClose = { () => setModalShow(false) } />
                            </Modal>
                        ) : null
                    }
                    {
                        Editar ? (
                            <Modal
                                isVisible = { ModalShow }
                                onClose   = { () => setModalShow(false) }
                                tittle    = {` Editando Permiso `}
                            >
                                <EditPermiso PermisoSelected = { PermisoSelected } onClose = { () => setModalShow() } />
                            </Modal>
                        ) : null
                    } 
                </div> 
            ) : null
        }        
    </>
  )
}

export default Pendiente;