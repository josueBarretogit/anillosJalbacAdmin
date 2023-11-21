import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const validationImage = {
  imagen: z
    .any({ required_error: "Este campo es requerido" })
    .refine((files: File) => files != undefined, "Una imagen es obligatoria")
    .refine(
      (file) => file?.[0]?.type.includes("image/"),
      "Solo se aceptan imagenes",
    ),
};

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

const ObjectValidationCrearNombre =
  ObjectValidationEditarNombre.extend(validationImage);

const ObjectValidationEditarSolitario = z.object({
  formaPiedra: z
    .string({ required_error: "Este campo es requerido" })
    .regex(/[a-zA-Z0-9]$/, "No puedes ingresar caracteres especiales")
    .nonempty({ message: "Este campo es requerido" }),
  tamanoPiedra: z.coerce
    .number(mensajesError)
    .positive({ message: "No pongas numeros negativos" })
    .transform((tamanoPiedra) => tamanoPiedra + " mm"),
  talla: z.coerce
    .string(mensajesError)
    .regex(
      new RegExp(/^\d+$|([0-9] \/ [0-9])$/),
      "Solo es valido este formato: numero ó numero / numero",
    ),
  ...propiedadesComunes,
});

const ObjectValidationEditarDije = z.object({
  categoriaDije: z
    .string({ required_error: "Este campo es requerido" })
    .regex(/[a-zA-Z0-9]$/, "No puedes ingresar caracteres especiales")
    .nonempty({ message: "Este campo es requerido" }),
  alto: z.coerce
    .number(mensajesError)
    .positive({ message: "No pongas numeros negativos" })
    .transform((alto) => alto + " mm"),
  ancho: z.coerce
    .number(mensajesError)
    .positive({ message: "No pongas numeros negativos" })
    .transform((ancho) => ancho + " mm"),
  ...propiedadesComunes,
});

const validationSchemaCrearNombre = toTypedSchema(ObjectValidationCrearNombre);

const validationSchemaEditarNombre = toTypedSchema(
  ObjectValidationEditarNombre,
);

const validationSchemaEditarSolitario = toTypedSchema(
  ObjectValidationEditarSolitario,
);

const ObjectValidationCrearSolitario =
  ObjectValidationEditarSolitario.extend(validationImage);

const validationSchemaCrearSolitario = toTypedSchema(
  ObjectValidationCrearSolitario,
);

const ObjectValidationCrearDije =
  ObjectValidationEditarDije.extend(validationImage);

const validationSchemaEditarDije = toTypedSchema(ObjectValidationEditarDije);

const validationSchemaCrearDije = toTypedSchema(ObjectValidationCrearDije);

export {
  validationSchemaEditarNombre,
  validationSchemaEditarDije,
  validationSchemaEditarSolitario,
  validationSchemaCrearNombre,
  validationSchemaCrearSolitario,
  validationSchemaCrearDije,
};
