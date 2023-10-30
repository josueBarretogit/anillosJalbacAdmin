const validationSchema = {
  imagen(value: File[]) {
    if (!value) {
      return "Una imagen es obligatoria";
    }
    return true;
  },
};

export { validationSchema };
