import * as Yup from 'yup';

export function initialValue() {
  return {
    FechaInicial: "",
    FechaFinal: "",
    Lugar: "",
    Cliente: "",
    tipe: "",
    Ot: "",
    observaciones: ""
  };
}

export function validationSchema() {
  return Yup.object({
    FechaInicial: Yup.date()
      .test('año-actual', 'El año no puede ser menor al año actual', function (value) {
        if (value) {
          const yearActual = new Date().getFullYear();
          const yearFecha = value.getFullYear();
          return yearFecha >= yearActual;
        }
        return true; // Permitir si no se proporciona una fecha
      })
      .test('mes-actual', 'El mes y el año deben ser iguales a los actuales', function (value) {
        if (value) {
          const now = new Date();
          const yearActual = now.getFullYear();
          const monthActual = now.getMonth();
          const monthFecha = value.getMonth();
          const yearFecha = value.getFullYear();
          return yearFecha === yearActual && monthFecha === monthActual;
        }
        return true;
      })
      .required('La Fecha de Inicio es Requerida'),
    FechaFinal: Yup.date()
      .test('año-actual', 'El año no puede ser diferente al año actual', function (value) {
        if (value) {
          const yearActual = new Date().getFullYear();
          const yearFecha = value.getFullYear();
          return yearFecha === yearActual;
        }
        return true; // Permitir si no se proporciona una fecha
      })
      .test('mes-actual', 'El mes y el año deben ser iguales a los actuales', function (value) {
        if (value) {
          const now = new Date();
          const yearActual = now.getFullYear();
          const monthActual = now.getMonth();
          const monthFecha = value.getMonth();
          const yearFecha = value.getFullYear();
          return yearFecha === yearActual && monthFecha === monthActual;
        }
        return true;
      })
      .min(Yup.ref('FechaInicial'), 'La Fecha Final no puede ser menor que la Fecha de Inicio')
      .required('La Fecha Final es Requerida'),
    Lugar: Yup.string().required('El Lugar es requerido'),
    Cliente: Yup.string().required('El cliente es requerido'),
    tipe: Yup.string().required('El tipo de OT es requerido'),
    Ot: Yup.string().required('El numero de OT es requerido'),
    observaciones: Yup.string().required('Las observaciones son requeridas'),
  });
}