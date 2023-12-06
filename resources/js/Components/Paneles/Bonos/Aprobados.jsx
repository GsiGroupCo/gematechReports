import { useEffect, useState } from "react" 

const Aprobadas = ({Bonos, Auth}) => {

  const BonosA = Bonos.filter(
    (bonos) => bonos.estado === "Autorizado" ||   bonos.estado === "Aprobado"
  );

  const [datosFiltrados, setDatosFiltrados] = useState(BonosA);
  
  useEffect(() => {
    setDatosFiltrados(BonosA)
  }, [Bonos])
    
  const filterData = ( searchTerm ) => {
    const filtered = BonosA.filter((bonos) => {
        const bono_id     = bonos.bono_id.toLowerCase();
        const ot_id       = bonos.ot_id.toLowerCase();
        const responsable = bonos.responsable.nombre.toLowerCase();
        const fecha_bono  = bonos.fecha_bono.toString().toLowerCase();
        const cliente     = bonos.cliente.toLowerCase();
        const lugar       = bonos.lugar_bono.toLowerCase();
        return (
            bono_id.includes(searchTerm)      ||
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
    <div className="w-full h-full flex flex-col px-4 xl:px-96 pb-16 justify-start bg-gray-800 items-start justify-items-center gap-2">
      <input 
        type="text" 
        placeholder='Buscar...' 
        className='w-full h-[45px] px-4 py-2 mt-4 focus:outline-none bg-gray-600 text-white placeholder-white' 
        onChange={(e) => filterData(e.target.value.toLowerCase())}
      /> 
      {
        datosFiltrados  ?  
          datosFiltrados.map((Bonos) => (
            <div 
              key={Bonos.bono_id}
              className='w-full h-auto border-b-2  cursor-pointer gap-3 pb-2 flex flex-col justify-center items-start justify-items-center bg-white rounded-sm shadow-sm shadow-black'
            >
              <div className={` ${ Bonos.estado === 'Pendiente' ? 'bg-red-500 text-white font-bold' : Bonos.estado === 'Autorizado' ? 'bg-green-500 text-white font-bold' : 'bg-yellow-500 text-black font-bold' } w-full h-auto px-4 py-2 rounded-sm `}>
                { Bonos.estado }
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
            ))
        : null
      } 
    </div>
  )
}

export default Aprobadas;