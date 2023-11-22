import * as Yup from 'yup';

export function initialValue() {
  return {
    email:'',
    old_password: '',
    new_password: '',
    confirm_new_password: '',
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().required('El correo es requerido'),
    old_password: Yup.string().required('La Contraseña antigua es requerida'),
    new_password: Yup.string().required('La Contraseña nueva es requerida'),
    confirm_new_password: Yup.string()
      .required('Por favor confirma la contraseña nueva')
      .test('password-match', 'Las contraseñas no coinciden', function (value) {
        const { new_password } = this.parent;
        return value === new_password || value === '';
      }),
  });
}
