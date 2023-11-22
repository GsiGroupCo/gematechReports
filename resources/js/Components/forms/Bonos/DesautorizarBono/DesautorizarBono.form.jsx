import * as Yup from 'yup'

export function initialValue() {
  return { 
      detalles : ""
    }
}

export function validationSchema(){
  return Yup.object({
      detalles: Yup.string().required('Los detalles son obligatorios')
    });
}
