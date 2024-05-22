'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RegisterSchema } from '@/schemas/auth/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { register } from './actions/register';
import { startTransition, useState } from "react"
import { Toaster, toast } from 'sonner'


export default function RegisterForm() {

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  const onsubmit = async (data: z.infer<typeof RegisterSchema>) => {
    startTransition( async () => {

      try {

        const resp = await register(data)

        if (resp.error) {
            toast.error(resp.error)
            form.reset()
          }

        if (resp.success) {
            toast.success(resp.success)
            setSuccess(resp.success)

            setTimeout(() => {
                window.location.href = "/login"
            }, 1000) // 2 segundos, ajuste conforme necessário
           
        }

        } catch (err) {
            toast.error('Login inválido')
            form.reset()
        }
    })
  }
  
  
  return (
    <div className='m-auto mt-52'>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            Cadastre-se
          </CardTitle>
          <CardDescription>Crie uma conta gratuitamente</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="text-left " onSubmit={form.handleSubmit(onsubmit)}>
              <div className="space-y-6">
       
                <div className="grid w-full max-w-sm items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="name"
                  render={() => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="name"
                          id="name"
                          placeholder="Fulano de Tal"
                          {...form.register('name')}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="email"
                  render={() => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          id="email"
                          placeholder="Fulano de Tal"
                          {...form.register('email')}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                <FormField
                  control={form.control}
                  name="password"
                  render={() => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="password"
                          placeholder="*******"
                          {...form.register('password')}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
              </div>
              <Toaster richColors />
              <Button size={'lg'} type="submit" className="w-full mt-10 ">
                Registrar
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Link
            className={cn(
              buttonVariants({ variant: 'link', size: 'sm' }),
              'mt-2 mx-auto'
            )}
            href="/login"
          >
            Já possui conta?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
