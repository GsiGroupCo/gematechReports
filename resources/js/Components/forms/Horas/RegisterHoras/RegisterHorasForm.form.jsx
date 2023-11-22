import * as Yup from 'yup'

export function initialValue() {
  return {
      Fecha: "",
      HoraInicial: "07:30",
      HoraFinal:"17:00",
      tipe:"",
      Ot:"",
      observaciones:""
    }
}

export function validationSchema(){
  return Yup.object({
      Fecha: Yup.date()
      .test('año-actual', 'El año no puede ser menor al año actual', function (value) {
        if (value) {
          const yearActual = new Date().getFullYear();
          const yearFecha = value.getFullYear();
          return yearFecha >= yearActual;
        }
        return true; // Permitir si no se proporciona una fecha
      }).test('mes-actual', 'El mes y el año deben ser iguales a los actuales', function (value) {
        if (value) {
          const now = new Date();
          const yearActual = now.getFullYear();
          const monthActual = now.getMonth();
          const yearFecha = value.getFullYear();
          const monthFecha = value.getMonth();
      
          return (yearFecha === yearActual && monthFecha === monthActual);
        }
        return true; 
      })
      .required('La Fecha es Requerida'),
      HoraInicial: Yup.mixed().test('hora-inicial', 'La Hora inicial debe ser menor o igual a la Hora final', function (value) {
        const horaInicial = value;
        const horaFinal = this.parent.HoraFinal;
        if (horaInicial && horaFinal) {
          return horaInicial <= horaFinal;
        }
        return true;
      }).required('La Hora de inicio es requerida'),
      HoraFinal: Yup.mixed().test('hora-final', 'La Hora final debe ser mayor o igual a la Hora inicial', function (value) {
        const horaInicial = this.parent.HoraInicial;
        const horaFinal = value;
        if (horaInicial && horaFinal) {
          return horaFinal >= horaInicial;
        }
        return true;
      }).required('La Hora Final es requerida'),
      tipe: Yup.string().required('El tipo de OT es obligatorio'),
      Ot: Yup.string().required('El campo Ot es obligatorio'),      
      observaciones: Yup.string().required('Las observaciones son requeridas'),
    });
}
