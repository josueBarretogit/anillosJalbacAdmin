const validationSchema = {
  correo(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
  contrasena(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
  rol(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
};

export { validationSchema };
