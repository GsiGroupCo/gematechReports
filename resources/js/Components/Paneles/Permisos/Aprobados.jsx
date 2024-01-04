import React, { useEffect, useState } from 'react' 
import pdf_icon from '../../../../../public/img/pdf.png'
import Search from '@/Components/UI/Search';
import Modal from '@/Components/UI/Modal';

export default function Aprobados({ Permisos, Auth }) {

  const [DocumentoShow, setDocumentoShow]     = useState(false) 

  const [DocumentosSeleccionado, setDocumentosSeleccionado]   = useState({
    anexo_id : "",
    permiso_id : "",
    nombre_documento: "",
    url: ""
  })
  
  function SeleccionarDocumento(Documento){
    setDocumentosSeleccionado({
        anexo_id : Documento.anexo_id,
        permiso_id : Documento.permiso_id,
        nombre_documento: Documento.nombre_documento,
        url: Documento.url
    })
    setDocumentoShow(true)
  }
    
  const PermisoData = [];
  Permisos.forEach(Permisos => {
    
    const anexosData = Permisos.anexos && Permisos.anexos.length > 0 ?
    Permisos.anexos.map(documentos => ({
      anexo_id: documentos.anexo_id,
      permiso_id: documentos.permiso_id,
      nombre_documento: documentos.nombre_documento,
      url: documentos.url,
      created_at: documentos.created_at,
      updated_at: documentos.updated_at,
    })) : []; 

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

  const [PermisosFiltrados, setPermisosFiltrados] = useState(Permisos); 
   
  useEffect(() => {
    setPermisosFiltrados(Permisos)
  }, [Permisos])
   
  const filterData = ( searchTerm ) => {
    const filtered = Permisos.filter((permisos) => {
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
    setPermisosFiltrados(filtered);
  };

  return (
    <div className="w-full h-full flex flex-col px-4 xl:px-96 pb-16 justify-start bg-gray-800 items-start justify-items-center gap-2"> 
      <Search SearchEvent = { (e) => filterData(e) } />
      {
        PermisosFiltrados 
        ?  
          PermisosFiltrados.map((permisos) => (
            <div 
              key = {permisos.permiso_id}
              className='w-full h-auto border-b-2  cursor-pointer gap-3 pb-2 flex flex-col justify-center items-start justify-items-center bg-white rounded-sm shadow-sm shadow-black'
            >
              <div className={` ${ permisos.estado === 'Pendiente' ? 'bg-red-500 text-white font-bold' : permisos.estado === 'Aprobado' ? 'bg-green-500 text-white font-bold' : 'bg-yellow-500 text-black font-bold' } w-full h-auto px-4 py-2 rounded-sm `}>
                  { permisos.estado }
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
                        <div onClick={()=>SeleccionarDocumento(data)} key={data.anexo_id} className='w-[25px] h-auto'>
                          <img src={pdf_icon} alt="Anexos Permiso" className='w-full h-full object-cover'/>
                        </div>
                      )) : null
                    }
                  </div>
              </div>  
              <Modal
                isVisible = { DocumentoShow }
                onClose = { () => setDocumentoShow(false) }
                tittle = { DocumentosSeleccionado.nombre_documento } 
              > 
                <div className='w-full  md:w-[750px] h-[600px] '>
                  <embed src={`https://reports.gematech.co/storage/Permisos/${DocumentosSeleccionado.permiso_id}/${DocumentosSeleccionado.url}`} type="application/pdf" className='w-full h-full' />
                </div>
              </Modal> 
            </div>
          ))
        : null
      } 
    </div>
  )
}
