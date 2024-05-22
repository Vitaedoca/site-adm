"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CredentialsSchema } from "@/schemas/auth/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { startTransition, useState } from "react"
import { login } from "./actions/login"
import { Toaster, toast } from 'sonner'


export default function LoginForm() {
    
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    
    const  form = useForm<z.infer<typeof CredentialsSchema>>({
        resolver: zodResolver(CredentialsSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    

    const onsubmit = async (values: z.infer<typeof CredentialsSchema>) => {
        
        startTransition( async () => {
            
            try {

                const resp = await login(values)

                if (resp.error) {
                    toast.error(resp.error)
                    form.reset()
                  }

                if (resp.success) {
                    toast.success(resp.success)
                    setSuccess(resp.success)

                   await setTimeout(() => {
                        window.location.href = "/dashboard"
                   }) // 2 segundos, ajuste conforme necessário
                   
                }

                } catch (err) {
                    toast.error('Login inválido')
                    form.reset()
                }
        })

    }


  return (

    <div className="flex flex-col w-screen min-h-screen items-center justify-center">

        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
            Digite seu e-mail abaixo para fazer login em sua conta
            </CardDescription>
        </CardHeader>
        <CardContent>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)}>
                    <div className="grid gap-4">

                    <FormField
                        control={form.control}
                        name='email'
                        render={() => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                {...form.register('email')}
                                />
                                {/* {form.formState.errors.email && <span className="text-red-600">Digite um e-mail válido!</span>} */}
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name='password'
                            render={() => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                    type="password"
                                    placeholder="m@example.com"
                                    required
                                    {...form.register('password')}
                                    />
                                    {/* {form.formState.errors.email && <span className="text-red-600">Digite um e-mail válido!</span>} */}
                                </FormControl>
                                <FormDescription />
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>

                    <Toaster richColors/>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    {/* <Button variant="outline" className="w-full">
                        Login with Google
                    </Button> */}
                    </div>
                </form>
            </Form>
        </CardContent>
        </Card>
    </div>
  )
}
