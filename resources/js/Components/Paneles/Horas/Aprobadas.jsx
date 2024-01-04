
import Search from "@/Components/UI/Search";
import { useEffect, useState } from "react" 

const Aprobadas = ({ HorasExtras, Auth }) => {
   
  const [datosFiltrados, setDatosFiltrados] = useState(HorasExtras);
   
  useEffect(() => {
    setDatosFiltrados(HorasExtras)
  }, [HorasExtras])
 
  const filterData = ( searchTerm ) => {
    const filtered = HorasExtras.filter((horas) => {
        const horasextras_id = horas.horasextras_id.toLowerCase();
        const nombre_empleado = horas.responsable.nombre.toLowerCase();
        const estado = horas.estado.toLowerCase();
        const ot = horas.ot.toLowerCase();
        const fecha = horas.fecha.toString().toLowerCase();
        const hora_final = horas.hora_final.toLowerCase();
        const hora_inicial = horas.hora_inicial.toLowerCase();
        return (
            horasextras_id.includes(searchTerm)  ||
            nombre_empleado.includes(searchTerm) ||
            estado.includes(searchTerm)          ||
            ot.includes(searchTerm)              ||
            fecha.includes(searchTerm)           ||
            hora_final.includes(searchTerm)      ||
            hora_inicial.includes(searchTerm)
        );
    });
    setDatosFiltrados(filtered);
  };

  return (
    <div className="w-full h-full flex flex-col px-4 xl:px-96 pb-16 bg-gray-800 justify-start items-start justify-items-center gap-2"> 
      <Search SearchEvent = { (e) => filterData(e) } />
      {
        datosFiltrados 
        ?  
          datosFiltrados.map((horasExtras) => (
              <div 
                key={horasExtras.horasextras_id} 
                className='w-full h-auto border-b-2  cursor-pointer gap-3 pb-2 flex flex-col justify-center items-start justify-items-center bg-white rounded-sm shadow-sm shadow-black'
              >
                <div className={` ${ horasExtras.estado === 'Pendiente' ? 'bg-red-500 text-white font-bold' : horasExtras.estado === 'Autorizado' ? 'bg-green-500 text-white font-bold' : horasExtras.estado === 'Desautorizado' ? 'bg-red-500 text-white font-bold' : 'bg-yellow-500 text-black font-bold' } w-full h-auto px-4 py-2 rounded-sm `}>
                  { horasExtras.estado }
                </div>
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4">
                  <div className={`${Auth ? 'block' : 'hidden'}`}>
                    Responsable: <span className="font-bold"> { horasExtras.responsable.nombre }</span>
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
            ))
        : null
      } 
    </div>
  )
}

export default Aprobadas