'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Loader2, OctagonAlertIcon } from 'lucide-react';
import { createAuthClient } from 'better-auth/client';

const formSchema = z.object({
  email: z.string().email({ message: 'Correo inválido' }),
  password: z.string().min(8, { message: 'Mínimo 6 caracteres' }),
});

const authClient = createAuthClient();

export function SingInForm() {
  const [error, setError] = useState<null | string>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleOnSubmitCredentials = form.handleSubmit(async (data) => {
    setError(null);
    await createAuthClient().signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: '/',
        rememberMe: true,
      },
      {
        onError() {
          setError('Credenciales incorrectas');
        },
      },
    );
  });

  const handleOnSubmitGoogle = async () => {
    setIsGoogleLoading(true);
    await authClient.signIn.social({
      provider: 'google',
    });
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="grid p-0 md:grid-cols-2">
        <Form {...form}>
          <form className="p-6 md:p-8" onSubmit={handleOnSubmitCredentials}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido nuevamente</h1>
                <p className="text-muted-foreground text-balance">
                  Ingrese sus credenciales para loguearse
                </p>
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {error && (
                <Alert className="bg-destructive/10 border-none">
                  <OctagonAlertIcon className="size-4 !text-destructive" />
                  <AlertTitle>{error}</AlertTitle>
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

              <div className="relative text-center text-sm after:border-border after:absolute after:inset-0 after:top-1/2 after:z-0 after:border-t after:flex after:items-center">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  O continua con
                </span>
              </div>

              <Button
                type="button"
                className="w-full"
                variant="outline"
                onClick={handleOnSubmitGoogle}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    Redirigiendo
                    <Loader2 className="size-4 animate-spin" />
                  </span>
                ) : (
                  'Google'
                )}
              </Button>
            </div>
          </form>
        </Form>

        <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col">
          col-2dsadas
        </div>
      </CardContent>
    </Card>
  );
}
