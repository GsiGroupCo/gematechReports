
import { useEffect, useState } from "react"
import Modal from "../Modal";

const Aprobadas = ({ HorasExtras, Auth }) => {
  
    const [datosFiltrados, setDatosFiltrados] = useState(HorasExtras);
    const [ModalShow, setModalShow] = useState(false);
    const [HoraSelected, setHoraSelected] = useState({
      horasextras_id: "",
      empleado_id : "",
      fecha: "",
      hora_inicial: "",
      hora_final: "",
      cant_Horas: "",
      estado: "",
      ot: "",
      observaciones:""
    }) 
     
    useEffect(() => {
      setDatosFiltrados(HorasExtras)
    }, [HorasExtras])
    
    const filterData = ( searchTerm ) => {
      const filtered = HorasExtras.filter((horas) => {
          const horasextras_id = horas.horasextras_id.toLowerCase();
          const nombre_empleado = horas.responsable.nombre.toLowerCase();
          const ot = horas.ot.toLowerCase();
          const fecha = horas.fecha.toString().toLowerCase();
          const hora_final = horas.hora_final.toLowerCase();
          const hora_inicial = horas.hora_inicial.toLowerCase();
          return (
              horasextras_id.includes(searchTerm)  ||
              nombre_empleado.includes(searchTerm) ||
              ot.includes(searchTerm)              ||
              fecha.includes(searchTerm)           ||
              hora_final.includes(searchTerm)      ||
              hora_inicial.includes(searchTerm)
          );
      });
      setDatosFiltrados(filtered);
    };

  return (
    <div className="w-full h-auto bg-gray-200 flex flex-col justify-start items-start justify-items-center">
      <div className='w-full h-auto bg-gray-200 gap-2 flex justify-evenly items-center justify-items-center p-2 '>
        <input 
          type="text" 
          placeholder='Buscar...' 
          className='w-full h-[45px] text-black px-4 py-2 focus:outline-none bg-white border border-black rounded-md ' 
          onChange={(e) => filterData(e.target.value.toLowerCase())}
        />
      </div>
      <div  className=' hidden w-full h-auto border-b-2 border-[#323c7c] cursor-pointer md:flex flex-col md:flex-row justify-center items-center justify-items-center bg-white'>
          <div className='w-full py-4 md:w-full h-full flex flex-col md:flex-row justify-center items-center justify-items-center bg-[#323c7c] text-white'>
            <div className={`${Auth ? 'w-[14%]' : 'hidden'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> Nombre </span>
            </div>
            <div className={`${Auth ? 'w-[14%]' : 'w-[16%]'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> ESTADO </span>
            </div>
            <div className={`${Auth ? 'w-[14%]' : 'w-[16%]'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> OT </span>
            </div>
            <div className={`${Auth ? 'w-[14%]' : 'w-[16%]'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> FECHA  </span>
            </div>
            <div className={`${Auth ? 'w-[14%]' : 'w-[16%]'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> HORA INICIO </span>
            </div>
            <div className={`${Auth ? 'w-[14%]' : 'w-[16%]'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> HORA FIN </span>
            </div>
            <div className={`${Auth ? 'w-[14%]' : 'w-[16%]'} h-auto flex justify-center items-center`}>
                <span className='font-bold'> DETALLES </span>
            </div>
          </div>
      </div>
      {
        datosFiltrados 
        ?  
          datosFiltrados.map((horasExtras) => (
                <div key={horasExtras.id} onClick = { () => {
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
                  setModalShow(true)
                }} className='w-full h-auto border-b-2  cursor-pointer  px-4 py-4 gap-3  flex flex-col justify-center items-center justify-items-center bg-white'>
                    <div className='w-full  h-full flex flex-col md:flex-row text-center justify-evenly items-start justify-items-center'>
                      <div className={`${Auth ? 'w-[14%]' : 'w-full md:hidden'} h-full flex justify-start md:justify-center items-center`}>
                        <span className='font-semibold'> {horasExtras.responsable.nombre}</span>
                      </div>
                      <div className={`${Auth ? 'w-[14%]' : 'w-full md:w-[16%]'} h-full flex justify-start md:justify-center items-center`}>
                        <span className='font-semibold'> {horasExtras.estado}</span>
                      </div>
                      <div className={`${Auth ? 'w-[14%]' : 'w-full md:w-[16%]'} h-full flex justify-start md:justify-center items-center`}>
                        <span className='font-semibold'> {horasExtras.ot}</span>
                      </div>
                      <div className={`${Auth ? 'w-[14%]' : 'w-full md:w-[16%]'} h-full flex justify-start md:justify-center items-center`}>
                        <span className='font-semibold'> {horasExtras.fecha.toString()}</span>
                      </div>
                      <div className={`${Auth ? 'w-[14%]' : 'w-full md:w-[16%]'} h-full flex justify-start md:justify-center items-center`}>
                        <span className='font-semibold'> {horasExtras.hora_inicial}</span>
                      </div>
                      <div className={`${Auth ? 'w-[14%]' : 'w-full md:w-[16%]'} h-full flex justify-start md:justify-center items-center`}>
                        <span className='font-semibold'> {horasExtras.hora_final}</span>
                      </div>
                      <div className={`${Auth ? 'w-[14%]' : 'w-full md:w-[16%]'} h-full flex justify-start md:justify-center items-center`}>
                        <span className='font-semibold'> {horasExtras.detalles}</span>
                      </div>
                    </div>
                </div>
            ))
        : null
      }
      <Modal
        isVisible = { ModalShow }
        tittle = {` Detalles de Hora `}
        onClose = { () => setModalShow(false) }
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
  )
}

export default Aprobadas