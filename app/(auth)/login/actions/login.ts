'use server'

import { signIn } from "@/auth"
import { CredentialsSchema } from "@/schemas/auth/login"
import { z } from "zod"

export const login = async (credentials: z.infer<typeof CredentialsSchema>) => {
    const validData = await CredentialsSchema.safeParse(credentials)

    if (validData.success) {
        try {
            const { email, password } = validData.data
            

            await signIn("credentials", { redirect: false, email, password })


            console.log('Login realizado com sucesso')
            return { success: 'Login realizado com sucesso' }
            

        } catch (error) {

            console.log('erro realizado com sucesso')
            return { error: 'Email e/ou senha Incorretos' }

        }
    }

    console.warn("Dados inválidos", validData.error)
    return { error: 'Dados inválidos' }
}