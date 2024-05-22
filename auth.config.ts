import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSchema } from "./schemas/auth/login";
import db from "./lib/db";
import { compareSync } from "bcrypt-ts";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validData = await CredentialsSchema.safeParse(credentials);

        if (validData.success) {
          const { email, password } = validData.data;

          const user = await db.user.findUnique({
            where: { email }
          });

          if (!user) {
            throw new Error("Usuário não encontrado");
          }

          const conferPassword = compareSync(password, user.passwordHash as string);

          if (!conferPassword) {
            throw new Error("Senha incorreta");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email
          }
        }

        return null
      }
    })
  ],
} satisfies NextAuthConfig;
