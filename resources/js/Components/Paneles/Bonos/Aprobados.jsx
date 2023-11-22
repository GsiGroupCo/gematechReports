import { useEffect, useState } from "react"
import Modal from "../../UI/Modal";

const Aprobadas = ({Bonos, Auth}) => {

  const [datosFiltrados, setDatosFiltrados] = useState(Bonos);
  const [ModalShow, setModalShow] = useState(false);
  const [BonoSelected, setBonoSelected] = useState({
    bono_id      : "",
    ot_id        : "",
    empleado_id  : "",
    lugar_bono   : "",
    fecha_bono   : "",
    cliente      : "",    
    observaciones: ""
})

  useEffect(() => {
    setDatosFiltrados(Bonos)
  }, [Bonos])
    
  const filterData = ( searchTerm ) => {
    const filtered = Bonos.filter((bonos) => {
        const ot_id       = bonos.ot_id.toLowerCase();
        const responsable = bonos.responsable.nombre.toLowerCase();
        const fecha_bono  = bonos.fecha_bono.toString().toLowerCase();
        const cliente     = bonos.cliente.toLowerCase();
        const lugar       = bonos.lugar_bono.toLowerCase();
        return (
            ot_id.includes(searchTerm)        ||
            responsable.includes(searchTerm)  ||
            fecha_bono.includes(searchTerm)   ||
            cliente.includes(searchTerm)      ||
            lugar.includes(searchTerm)
        );
    });
    setDatosFiltrados(filtered);
  };

  return (
    <div className="w-full h-full bg-gray-200 flex flex-col justify-start items-start justify-items-center ">
      <div className='w-full h-auto bg-gray-200 gap-2 flex justify-evenly items-center justify-items-center p-2 '>
        <input 
            type="text" 
            placeholder='Buscar...' 
            className='w-full h-[45px] text-black px-4 py-2 focus:outline-none bg-white border border-black rounded-md ' 
            onChange={(e) => filterData(e.target.value.toLowerCase())}
        />
      </div>
      <div  className=' hidden w-full h-auto border-b-2   cursor-pointer md:flex flex-col md:flex-row justify-center items-center justify-items-center bg-white'>
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
                  <span className='font-bold'> CLIENTE </span>
              </div>
               <div className={`${Auth ? 'w-[14%]' : 'w-[16%]'} h-auto flex justify-center items-center`}>
                  <span className='font-bold'> LUGAR </span>
              </div>
               <div className={`${Auth ? 'w-[14%]' : 'w-[16%]'} h-auto flex justify-center items-center`}>
                  <span className='font-bold'> DETALLES </span>
              </div>
          </div>
      </div>
      {
        datosFiltrados  ?  
          datosFiltrados.map((Bonos) => (
              <div key = { Bonos.id } onClick={ () => {
                setBonoSelected({
                  bono_id      : Bonos.bono_id,
                  ot_id        : Bonos.ot_id,
                  empleado_id  : Bonos.responsable.nombre,
                  lugar_bono   : Bonos.lugar_bono,
                  fecha_bono   : Bonos.fecha_bono,
                  cliente      : Bonos.cliente,
                  observaciones: Bonos.observaciones
                })
                setModalShow(true)
              }} className='w-full h-auto border-b-2   cursor-pointer  px-4 py-2  flex flex-col justify-center items-center justify-items-center bg-white'>
                <div className='w-full h-full flex flex-col md:flex-row text-center  justify-evenly items-center justify-items-center'>
                  <div className={`${Auth ? 'w-full lg:w-[14%]' : 'hidden'} h-auto flex lg:justify-center items-center`}>
                    <span className='font-bold '> <span className="sm:hidden"> TRABAJADOR: </span> {Bonos.responsable.nombre} </span>
                  </div>
                  <div className={`${Auth ? 'w-full lg:w-[14%]' : 'w-full md:w-[16%]'} h-full flex justify-start lg:justify-center items-center`}>
                    <span className='font-semibold'><span className="sm:hidden"> ESTADO: </span>{Bonos.estado} </span>
                  </div>
                  <div className={`${Auth ? 'w-full lg:w-[14%]' : 'w-full md:w-[16%]'} h-full flex justify-start lg:justify-center items-center`}>
                    <span className='font-semibold'><span className="sm:hidden"> OT: </span>  {Bonos.ot_id} </span>
                  </div>
                    <div className={`${Auth ? 'w-full lg:w-[14%]' : 'w-full md:w-[16%]'} h-full flex justify-start lg:justify-center items-center`}>
                    <span className='font-semibold'><span className="sm:hidden"> FECHA: </span> {Bonos.fecha_bono.toString()} </span>
                  </div>
                    <div className={`${Auth ? 'w-full lg:w-[14%]' : 'w-full md:w-[16%]'} h-full flex justify-start lg:justify-center items-center`}>
                    <span className='font-semibold'><span className="sm:hidden"> BONO: </span>  {Bonos.cliente} </span>
                  </div>  
                  <div className={`${Auth ? 'w-full lg:w-[14%]' : 'w-full md:w-[16%]'} h-full flex justify-start lg:justify-center items-center`}>
                    <span className='font-semibold'><span className="sm:hidden"> LUGAR: </span>  {Bonos.lugar_bono} </span>
                  </div>
                  <div className={`${Auth ? 'w-full lg:w-[14%]' : 'w-full md:w-[16%]'} h-full flex justify-start lg:justify-center items-center`}>
                    <span className='font-semibold'><span className="sm:hidden"> DETALLES: </span>  {Bonos.detalles} </span>
                  </div>
                </div> 
              </div>
            ))
        : null
      }
      <Modal
        isVisible = { ModalShow }
        tittle = {` Detalles de Bono `}
        onClose = { () => setModalShow(false) }
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
    </div>
  )
}

export default Aprobadas;