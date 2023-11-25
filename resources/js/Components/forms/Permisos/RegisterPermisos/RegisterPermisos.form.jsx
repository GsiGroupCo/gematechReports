import * as Yup from 'yup'

export function initialValue() {
  return {
      Motivo: "",
      FechaInicio: "",
      FechaTerminacion:"",
      Solicitante:"",
      Jornada:"",
      HoraInicio:"",
      HoraTerminacion:"", 
      Observaciones: ""
    }
}

export function validationSchema(){
  return Yup.object({
      FechaInicio: Yup.string().required('La Fecha es Requerida'),
      FechaTerminacion: Yup.string().required('La Fecha es Requerida'),
      Motivo: Yup.string().required('El Motivo es Requerido '),
      HoraInicio: Yup.mixed().test('hora-inicial', 'La Hora inicial debe ser menor o igual a la Hora final', function (value) {
        const horaInicial = value;
        const horaFinal = this.parent.HoraFinal;
        if (horaInicial && horaFinal) {
          return horaInicial <= horaFinal;
        }
        return true;
      }).required('La Hora de inicio es requerida'),
      HoraTerminacion: Yup.mixed().test('hora-final', 'La Hora final debe ser mayor o igual a la Hora inicial', function (value) {
        const horaInicial = this.parent.HoraInicial;
        const horaFinal = value;
        if (horaInicial && horaFinal) {
          return horaFinal >= horaInicial;
        }
        return true;
      }).required('La Hora Final es requerida'), 
      Jornada: Yup.string().required('La Jornada es obligatoria'),
      Solicitante: Yup.string().required('El Solicitante es obligatorio'),
      Observaciones: Yup.string().required('Las Observaciones son requeridas')
    });
}
