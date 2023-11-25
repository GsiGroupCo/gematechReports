import * as Yup from 'yup'

export function initialValue(PermisosData) { 

  const formatHora = (hora) => {
    const [hours, minutes] = hora.split(':');
    return `${hours}:${minutes}`;
  };

  return {
      Motivo:           PermisosData.motivo,
      FechaInicio:      PermisosData.fecha_inicio,
      FechaTerminacion: PermisosData.fecha_terminacion,
      Solicitante:      PermisosData.empleado_id,
      Jornada:          PermisosData.jornada,
      HoraInicio:       formatHora(PermisosData.hora_inicio),
      HoraTerminacion:  formatHora(PermisosData.hora_fin),
      Observaciones:    PermisosData.observaciones
    }
}

export function validationSchema(){
  return Yup.object();
}
