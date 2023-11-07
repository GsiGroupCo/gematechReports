import * as Yup from 'yup'

export function initialValue() {
  return {
        Fecha: "",
        Lugar: "",
        Cliente:"",
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
        Lugar:         Yup.string().required(' El Lugar es requerido '),
        Cliente:       Yup.string().required(' El cliente es requerido '),
        tipe:          Yup.string().required(' El tipo de OT es requerida '),
        Ot:            Yup.string().required(' El numero de OT es requerida '),
        observaciones: Yup.string().required('Las observaciones son requeridas'),
    })
}
