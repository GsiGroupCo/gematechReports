import * as Yup from 'yup';

export function initialValue() {
  return {
    date_initial: '',
    date_finish: '',
  };
}

export function validationSchema() {
  return Yup.object().shape({
    date_initial: Yup.date()
      .required('Es requerida la Fecha de inicio para la búsqueda')
      .test('fecha-mayor', 'La fecha inicial debe ser menor o igual que la fecha final', function (value) {
        const { date_finish } = this.parent;
        return !date_finish || !value || value <= date_finish;
      }),
    date_finish: Yup.date()
      .required('Es requerida la Fecha Final para la búsqueda')
      .test('fecha-mayor', 'La fecha final debe ser mayor o igual que la fecha inicial', function (value) {
        const { date_initial } = this.parent;
        return !date_initial || !value || value >= date_initial;
      }),
  });
}