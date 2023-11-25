import * as Yup from 'yup'

export function initialValue() {
  return {
        Nombre: "",
        email : "",
        password: "",
        cargo:""
    }
}

export function validationSchema(){
    return Yup.object({
        Nombre: Yup.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .required('El nombre del usuario es requerido'),
        email: Yup.string().required('El email del usuario es requerido'),
        password: Yup.string()  
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('La Contraseña es requerida'),
        cargo: Yup.string()
        .oneOf(['Gerencia', 'Gerente general', 'Coordinador de MTTO', 'HSEQ / GESTION DE TALENTO HUMANO','AUX PERMISOS','CONTABILIDAD','LOGISTICA'], 'Selecciona un cargo válido')
        .required('El cargo es requerido'),
    })
}
