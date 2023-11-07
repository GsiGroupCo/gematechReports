import * as Yup from 'yup'

export function initialValue() {
  return {
        Nombre: "",
        cargo : "",
        cc    : "",
    }
}

export function validationSchema(){
    return Yup.object({
        Nombre: Yup.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .required('El nombre del empleado es requerido'),
        cc: Yup.string()
        .matches(/^\d+$/, 'La cedula debe ser un número')
        .min(6, 'La cedula debe tener al menos 6 dígitos')
        .required('La cedula es requerida'),
        cargo: Yup.string().required('El cargo es requerido')
    })
}
