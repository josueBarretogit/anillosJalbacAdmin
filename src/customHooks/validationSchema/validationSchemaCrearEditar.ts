const validationSchemaEditar = {
  nombre(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
  pesoOro(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
  pesoPlata(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
  categoria(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
  talla(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
  referencia(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
};

const validationSchemaCrear = {
  nombre(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
  pesoOro(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
  pesoPlata(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
  categoria(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
  talla(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
  referencia(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
  imagen(value: File[]) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
};

export { validationSchemaEditar, validationSchemaCrear };
