import * as Yup from 'yup'

export function initialValue() {
  return {
        cc: "",
    }
}

export function validationSchema(){
    return Yup.object({
        cc: Yup.string().required('La cedula de ciudadania es requerida'),
    })
}
