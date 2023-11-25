import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Modal from "../../UI/Modal";
import DesautorizarPermiso from "../../forms/Permisos/DesautorizarPermiso";
import EditPermiso from "@/Components/forms/Permisos/EditarPermisos/EditarPermisos";

    const Pendiente = ({ Permisos, Auth, Admin }) => { 

    const { data, patch } = useForm();

    const [Editar, setEditar]             = useState(false)
    const [Desautorizar, setDesautorizar] = useState(false)

    const [ModalShow, setModalShow] = useState(false)
    const [ModalInfoShow, setModalInfoShow] = useState(false)

    const [PermisoSelected, setPermisoSelected] = useState({
      permiso_id        : "",
      empleado_id       : "" ,
      motivo            : "" ,
      fecha_inicio      : "" ,
      fecha_terminacion : "" ,
      jornada           : "" ,
      hora_inicio       : "" ,
      hora_fin          : "" ,
      cant_horas        : "" ,
      observaciones     : "" ,
      remuneracion      : "" ,
      estado            : ""         
    }) 

    function AutorizarPermiso(permiso_id){
        data.permiso_id = permiso_id 
        patch(`/permisos/aprobe`)
    }
    
    const PermisosPendientesAprobar = Permisos.filter(
        (Permisos) => Permisos.estado === "Pendiente"
    );

    const [PermisosPendientesAutorizar, setPermisosPendientesAutorizar] = useState(PermisosPendientesAprobar);
    const FiltroPendientesAutorizar = ( searchTerm ) => {
        const filtered = PermisosPendientesAprobar.filter((permisos) => {
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
        setPermisosPendientesAutorizar(filtered);
    };

    useEffect(() => { 
      setPermisosPendientesAutorizar(PermisosPendientesAprobar) 
    }, [Permisos])
    
    return (
      <>
        {
          Admin === 'Gerente general' ? (
              <div className="w-full h-auto bg-gray-200 flex flex-col justify-start items-start justify-items-center ">
                <div className='w-full h-auto bg-gray-200 gap-2 flex justify-evenly items-center justify-items-center p-2 '>
                    <input 
                        type="text" 
                        placeholder='Buscar...' 
                        className='w-full h-[45px] text-black px-4 py-2 focus:outline-none bg-gray-100 border border-black rounded-md ' 
                        onChange={(e) => FiltroPendientesAutorizar(e.target.value.toLowerCase())}
                    />
                </div>
                <div className='hidden w-full py-4 md:w-full h-full md:flex flex-col md:flex-row justify-center items-center justify-items-center bg-[#323c7c] text-white'>
                    <div className={`${Auth ? 'w-[16%]' : 'hidden'} h-auto flex justify-center items-center`}>
                        <span className='font-bold'> Nombre </span>
                    </div>
                    <div className={`${Auth ? 'w-[16%]' : 'w-[20%]'} h-auto flex justify-center items-center`}>
                        <span className='font-bold'> Motivo </span>
                    </div>
                    <div className={`${Auth ? 'w-[16%]' : 'w-[20%]'} h-auto flex justify-center items-center`}>
                        <span className='font-bold'> Fecha Inicio </span>
                    </div>
                    <div className={`${Auth ? 'w-[16%]' : 'w-[20%]'} h-auto flex justify-center items-center`}>
                        <span className='font-bold'> Fecha Final  </span>
                    </div> 
                    <div className={`${Auth ? 'w-[16%]' : 'w-[20%]'} h-auto flex justify-center items-center`}>
                        <span className='font-bold'> Jornada </span>
                    </div>
                    <div className={`${Auth ? 'w-[16%]' : 'w-[20%]'} h-auto flex justify-center items-center`}>
                        <span className='font-bold'> Acciones </span>
                    </div>
                </div>
                {
                    PermisosPendientesAutorizar 
                    ? PermisosPendientesAutorizar.map((permisos) => ( 
                        <div key={permisos.permiso_id} className='w-full bg-white border-b-2 md:w-full h-full flex flex-col text-center md:flex-row justify-center items-center justify-items-center py-2 px-4'>
                            <div className={`${Auth ? 'w-full lg:w-[16%] ' : 'hidden'} h-auto flex lg:justify-center lg:items-center`}>
                                <span className='font-semibold'> <span className="sm:hidden"> Trabajador: </span> {permisos.responsable.nombre}</span>
                            </div>
                            <div className={`${Auth ? 'w-full lg:w-[16%] ' : 'w-[20%]'} h-auto flex lg:justify-center lg:items-center`}>
                                <span className='font-semibold'><span className="sm:hidden"> Motivo: </span> {permisos.motivo}</span>
                            </div>
                            <div className={`${Auth ? 'w-full lg:w-[16%] ' : 'w-[20%]'} h-auto flex lg:justify-center lg:items-center`}>
                                <span className='font-semibold'> <span className="sm:hidden"> Fecha Inicio: </span> {permisos.fecha_inicio}</span>
                            </div>
                            <div className={`${Auth ? 'w-full lg:w-[16%] ' : 'w-[20%]'} h-auto flex lg:justify-center lg:items-center`}>
                                <span className='font-semibold'> <span className="sm:hidden"> Fecha Final: </span> {permisos.fecha_terminacion}</span>
                            </div> 
                            <div className={`${Auth ? 'w-full lg:w-[16%] ' : 'w-[20%]'} h-auto flex lg:justify-center lg:items-center`}>
                                <span className='font-semibold'> <span className="sm:hidden"> Jornada: </span> {permisos.jornada}</span>
                            </div>
                            <div className={` ${Auth ? 'w-full lg:w-[16%] h-full flex flex-col justify-center items-center gap-1  py-2' : 'hidden' } `}>
                                <div className="w-full flex flex-col lg:flex-row gap-1 lg:gap-3 justify-center items-center">
                                    <div onClick = { () => AutorizarPermiso( permisos.permiso_id )}   className='w-full h-auto px-4 py-2 text-white bg-green-500 hover:bg-green-800 hover:border-green-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center'>
                                        Autorizar
                                    </div>
                                    <div onClick = { () => {  
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
                                    }}   
                                        className='w-full h-auto px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-800 hover:border-yellow-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center'>
                                        Editar
                                    </div>
                                </div>
                                <div className="w-full flex flex-col lg:flex-row gap-1 lg:gap-3 justify-center items-center">
                                    <div className='w-full lg:w-1/2 h-auto px-4 py-2 text-white bg-blue-500 hover:bg-blue-800 hover:border-blue-500 cursor-pointer border border-white rounded-md hover:text-white transition duration-700 ease-out font-bold flex justify-center items-center' onClick={ () => {
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
                                            setModalInfoShow(true)
                                        }}
                                    >
                                        Informacion
                                    </div>
                                    <div onClick = { () => {
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
                            <DesautorizarPermiso PermisoData = { PermisoSelected } onClose = { () => ModalShow(false) } />
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
                <Modal
                    isVisible = { ModalInfoShow }
                    tittle = {` Detalles de Permiso  - ${ PermisoSelected.remuneracion }`}
                    onClose = { () => setModalInfoShow(false) }
                >
                    <div className="w-full h-auto p-4 flex flex-col justify-start items-center gap-3">  
                        <div className="w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 rounded-lg border shadow-inner p-4">
                            <div className="w-full h-auto flex flex-col justify-start items-start">
                                <span>Trabajador:</span> 
                                <span className="font-bold">{ PermisoSelected.empleado_id }</span> 
                            </div>
                        </div>
                        <div className="w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 rounded-lg border shadow-inner p-4">
                            <div className="w-full h-auto flex flex-col justify-start items-start">
                                <span>Motivo:</span> 
                                <span className="font-bold">{ PermisoSelected.motivo }</span> 
                            </div>
                            <div className="w-full h-auto flex flex-col justify-start items-start">
                                <span>Jornada:</span>
                                <span className="font-bold">{ PermisoSelected.jornada }</span> 
                            </div>
                        </div>
                        <div className="w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 rounded-lg border shadow-inner p-4">
                            <div className="w-full h-auto flex flex-col justify-start items-start">
                                <span>F Inicio:</span> 
                                <span className="font-bold">{ PermisoSelected.fecha_inicio }</span> 
                            </div>
                            <div className="w-full h-auto flex flex-col justify-start items-start">
                                <span>F Fin:</span>
                                <span className="font-bold">{ PermisoSelected.fecha_terminacion }</span> 
                            </div>
                        </div>
                        <div className="w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 rounded-lg border shadow-inner p-4">
                            <div className="w-full h-auto flex flex-col justify-start items-start">
                                <span>H Inicio:</span> 
                                <span className="font-bold">{ PermisoSelected.hora_inicio }</span> 
                            </div>
                            <div className="w-full h-auto flex flex-col justify-start items-start">
                                <span>H Fin:</span>
                                <span className="font-bold">{ PermisoSelected.hora_fin }</span> 
                            </div>
                        </div>
                        <div className="w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 rounded-lg border shadow-inner p-4">
                            <div className="w-full h-auto flex flex-col justify-start items-start">
                                <span>Cantidad de Horas:</span> 
                                <span className="font-bold">{ PermisoSelected.cant_horas }</span> 
                            </div>
                            <div className="w-full h-auto flex flex-col justify-start items-start">
                                <span>Estado:</span>
                                <span className="font-bold">{ PermisoSelected.estado }</span> 
                            </div>
                        </div> 
                        <div className="w-full h-auto flex justify-start items-center gap-3 rounded-lg border shadow-inner p-4"> 
                            <div className="w-full h-auto flex flex-col justify-start items-start">
                                <span>Observaciones:</span>
                                <span className="font-bold">{ PermisoSelected.observaciones }</span> 
                            </div>
                        </div>
                        <div className="w-full h-auto flex justify-start items-center gap-3 rounded-lg border shadow-inner p-4"> 
                            <div className="w-full h-auto flex flex-col justify-start items-start">
                                <span>Anexos:</span>
                                <span className="font-bold"> Sin Anexos. </span> 
                            </div>
                        </div>
                    </div>
                </Modal>
              </div>
            ) : null
        }        
    </>
  )
}

export default Pendiente;