import * as Yup from 'yup'

export function initialValue(BonosData) {
  return {
        Fecha   : BonosData.fecha_bono,
        Lugar   : BonosData.lugar_bono,
        Cliente : BonosData.cliente,
        tipe    : "",
        Ot      : ""
    }
}

export function validationSchema(){
    return Yup.object({
        Fecha:   Yup.string().required(' La Fecha es requerida '),
        Lugar:   Yup.string().required(' El Lugar es requerido '),
        Cliente: Yup.string().required(' El cliente es requerido '),
        tipe:    Yup.string().required(' El tipo de OT es requerida '),
        Ot:      Yup.string().required(' El numero de OT es requerida '),
    })
}
