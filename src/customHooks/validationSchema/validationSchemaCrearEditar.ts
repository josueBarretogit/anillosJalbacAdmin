import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const validationSchemaEditarNombre = {
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

const validationSchemaEditarSolitario = {
  formaPiedra(value: string) {
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
  tamanoPiedra(value: string) {
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

const validationSchemaEditarDije = {
  alto(value: string) {
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
  ancho(value: string) {
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
  referencia(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
};

const validationSchemaCrearNombre = toTypedSchema(
  z.object({
    nombre: z.string({ required_error: "Este campo es requerido" }).nonempty(),
    pesoOro: z.coerce
      .number({
        required_error: "Este campo es requerido",
        invalid_type_error: "Este campo solo admite numeros",
      })
      .positive(),
    pesoPlata: z.coerce
      .number({
        required_error: "Este campo es requerido",
        invalid_type_error: "Este campo solo admite numeros",
      })
      .positive(),
    categoria: z
      .string({ required_error: "Este campo es requerido" })
      .nonempty(),
    talla: z
      .number({
        invalid_type_error: "Este campo solo admite numeros",
      })
      .int(),
    referencia: z.number({ required_error: "Este campo es requerido" }).int(),
    imagen: z.any({ required_error: "Este campo es requerido" }),
  }),
);

const validationSchemaCrearSolitario = {
  formaPiedra(value: string) {
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
  tamanoPiedra(value: string) {
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

const validationSchemaCrearDije = {
  alto(value: string) {
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
  ancho(value: string) {
    if (!value) {
      return "Este campo es obligatorio";
    }
    return true;
  },
  categoriaDije(value: string) {
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

export {
  validationSchemaEditarNombre,
  validationSchemaEditarDije,
  validationSchemaEditarSolitario,
  validationSchemaCrearNombre,
  validationSchemaCrearSolitario,
  validationSchemaCrearDije,
};
