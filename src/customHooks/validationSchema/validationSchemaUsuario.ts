import useUsuarioApi from "@/services/usuariosapi";
import { toTypedSchema } from "@vee-validate/zod";
import { AxiosError } from "axios";
import { z } from "zod";

const { getUsuarioBy } = useUsuarioApi();

const messages = {
  required_error: "Este campo es requerido",
};

const propiedadesComunes = {
  correo: z
    .string(messages)
    .email({ message: "Escribe un correo" })
    .refine(
      async (correo: string) => {
        const correoAlreadyExist = await getUsuarioBy({ correo: correo });
        console.log(correoAlreadyExist);
        if (!correoAlreadyExist) return true;
        return false;
      },
      {
        message: "Este correo ya existe",
      },
    ),
  contrasena: z.string(messages).min(7, { message: "Minimo de caracteres 7" }),
  rol: z.string(messages),
};

const ObjectValidationLogIn = z.object({
  correo: z.string(messages).email({
    message: "Escribe un correo",
  }),
  contrasena: propiedadesComunes.contrasena,
});
const validationSchemaLogIn = toTypedSchema(ObjectValidationLogIn);

const ObjectValidationCrearUsuario = z.object({
  ...propiedadesComunes,
});

const validationSchemaCrearUsuario = toTypedSchema(
  ObjectValidationCrearUsuario,
);

const ObjectValidationEditarUsuario = z.object({
  rol: z.string(messages),
  correo: propiedadesComunes.correo.optional(),
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
