import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const mensajesError = {
  required_error: "Este campo es requerido",
  invalid_type_error: "Este campo solo admite numeros",
};

const propiedadesComunes = {
  pesoOro: z.coerce
    .number(mensajesError)
    .positive({ message: "No pongas numeros negativos" })
    .transform((pesoOro) => pesoOro + " gr"),
  pesoPlata: z.coerce
    .number(mensajesError)
    .positive({ message: "No pongas numeros negativos" })
    .transform((pesoPlata) => pesoPlata + " gr"),
  referencia: z.coerce
    .number(mensajesError)
    .int({ message: "El numero tiene que ser entero" })
    .positive({ message: "El numero tiene que ser entero" })
    .transform((referencia) => "#" + referencia),
};

const ObjectValidationEditarNombre = z.object({
  nombre: z
    .string({ required_error: "Este campo es requerido" })
    .regex(/[a-zA-Z0-9]$/, "No puedes ingresar caracteres especiales")
    .nonempty({ message: "Este campo es requerido" }),
  categoria: z.string({ required_error: "Este campo es requerido" }).nonempty(),
  talla: z.coerce
    .string(mensajesError)
    .regex(
      new RegExp(/^\d+$|([0-9] \/ [0-9])$/),
      "Solo es valido este formato: numero ó numero / numero",
    ),
  ...propiedadesComunes,
});

const ObjectValidationCrearNombre = ObjectValidationEditarNombre.extend({
  imagen: z
    .any({ required_error: "Este campo es requerido" })
    .refine((files: File) => files != undefined, "Una imagen es obligatoria")
    .refine(
      (file) => file?.[0]?.type.includes("image/"),
      "Solo se aceptan imagenes",
    ),
});

const ObjectValidationEditarDije = z.object({
  nombre: z
    .string({ required_error: "Este campo es requerido" })
    .regex(/[a-zA-Z0-9]$/, "No puedes ingresar caracteres especiales")
    .nonempty({ message: "Este campo es requerido" }),
  pesoOro: z.coerce
    .number(mensajesError)
    .positive({ message: "No pongas numeros negativos" })
    .transform((pesoOro) => pesoOro + " gr"),
  pesoPlata: z.coerce
    .number(mensajesError)
    .positive({ message: "No pongas numeros negativos" })
    .transform((pesoPlata) => pesoPlata + " gr"),
  categoria: z.string({ required_error: "Este campo es requerido" }).nonempty(),
  talla: z.coerce
    .string(mensajesError)
    .regex(
      new RegExp(/^\d+$|([0-9] \/ [0-9])$/),
      "Solo es valido este formato: numero ó numero / numero",
    ),
  referencia: z.coerce
    .number(mensajesError)
    .int({ message: "El numero tiene que ser entero" })
    .positive({ message: "El numero tiene que ser entero" })
    .transform((referencia) => "#" + referencia),
});
const validationSchemaCrearNombre = toTypedSchema(ObjectValidationCrearNombre);

const validationSchemaEditarNombre = toTypedSchema(
  ObjectValidationEditarNombre,
);

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
