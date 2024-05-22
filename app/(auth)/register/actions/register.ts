'use server'

import db from "@/lib/db"
import { RegisterSchema } from "@/schemas/auth/register"
import { hashSync } from "bcrypt-ts"
import { z } from "zod"

export const register =  async (credentials: z.infer<typeof RegisterSchema>) => {
    
    const validData  = await RegisterSchema.safeParse(credentials)

    // console.log(validData)
    
    if(validData.success) {
        try {
            
            const { name, email, password } = validData.data
            
    
            
            if(!name || !email || !password) {
                throw new Error("Preencha todos os campos");
            }
            
            const isEmail = await db.user.findUnique({
                where: { email },
              })

              console.log('aaaaaaaa', isEmail)
              
                if(isEmail) {
                  throw new Error("Email já cadastrado");
                }
                
                await db.user.create({
                    data: {
                        name,
                        email,
                        passwordHash: hashSync(password, 10),
                    }
              })


              return { success: 'Cadastro criado com sucesso'}
              
            }catch(error) {
                error: {
                    'Erro do Authjs'
                }
            }
        }
        
        return {
            error: 'Dados inválidos'
        }

    }