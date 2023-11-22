import * as Yup from 'yup'

export function initialValue(PermisosData) { 

  return {
      Motivo:           PermisosData.motivo,
      FechaInicio:      PermisosData.fecha_inicio,
      FechaTerminacion: PermisosData.fecha_terminacion,
      Solicitante:      PermisosData.Solicitante,
      Jornada:          PermisosData.jornada,
      HoraInicio:       PermisosData.hora_inicio,
      HoraTerminacion:  PermisosData.hora_fin,
      CantHoras:        PermisosData.cant_horas,
      Observaciones:    PermisosData.observaciones
    }
}

export function validationSchema(){
  return Yup.object();
}
