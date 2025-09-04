'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAuthClient } from 'better-auth/client';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader2, OctagonAlertIcon } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Correo inválido' }),
  password: z.string().min(8, { message: 'Mínimo 6 caracteres' }),
});

const authClient = createAuthClient();

export function SingUpForm() {
  const [serverError, setServerError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleOnSubmitCredentials = form.handleSubmit(async (data) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: 'henry',
        callbackURL: '/',
      },
      {
        onError() {
          setServerError('Credenciales ya existen');
        },
      },
    );
  });

  const handleOnSubmitGoogle = async () => {
    await authClient.signIn.social({
      provider: 'google',
    });
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="grid p-0 md:grid-cols-2">
        <Form {...form}>
          <form onSubmit={handleOnSubmitCredentials} className="p-6 md:p-8 ">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido nuevamente</h1>
                <p className="text-muted-foreground text-balance">
                  Ingrese sus credenciales para loguearse
                </p>
              </div>

              <div className="grid gap-2">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="m@example.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {serverError && (
                <Alert className="bg-destructive/10 border-none">
                  <OctagonAlertIcon className="size-4 !text-destructive" />
                  <AlertTitle>{serverError}</AlertTitle>
                </Alert>
              )}

              <Button type="submit" className="w-full">
                {form.formState.isSubmitting ? (
                  <span className="flex items-center gap-4">
                    Continuar
                    <Loader2 className="size-4 animate-spin" />
                  </span>
                ) : (
                  'Continuar'
                )}
              </Button>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:border-border after:border-t after:z-0">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  O continua con
                </span>
              </div>

              <Button
                type="button"
                className="w-full"
                variant="outline"
                onClick={handleOnSubmitGoogle}
              >
                Google
              </Button>
            </div>
          </form>
        </Form>
        <div className=" border-none bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col"></div>
      </CardContent>
    </Card>
  );
}
