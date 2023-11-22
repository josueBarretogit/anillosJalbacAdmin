import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const messages = {
  required_error: "Este campo es requerido",
};

const propiedadesComunes = {
  correo: z.string(messages).email({ message: "Escribe un correo" }),
  contrasena: z.string(messages).min(7, { message: "Minimo de caracteres 7" }),
};

const ObjectValidationLogIn = z.object(propiedadesComunes);
const validationSchemaLogIn = toTypedSchema(ObjectValidationLogIn);

const ObjectValidationCrearUsuario = z.object({
  rol: z.string(messages),
  ...propiedadesComunes,
});

const validationSchemaCrearUsuario = toTypedSchema(
  ObjectValidationCrearUsuario,
);

const ObjectValidationEditarUsuario = z.object({
  rol: z.string(messages),
  correo: propiedadesComunes.correo,
  contrasena: propiedadesComunes.contrasena.optional(),
});

const validationSchemaEditarUsuario = toTypedSchema(
  ObjectValidationEditarUsuario,
);

export {
  validationSchemaCrearUsuario,
  validationSchemaEditarUsuario,
  validationSchemaLogIn,
};
