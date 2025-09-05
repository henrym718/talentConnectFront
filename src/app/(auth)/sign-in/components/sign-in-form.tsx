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
import { OctagonAlertIcon } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { signIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const signInSchema = z.object({
  email: z.string().email({ message: 'Correo inválido' }),
  password: z.string().min(8, { message: 'Mínimo 6 caracteres' }),
});

export function SignInForm() {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [disabledButtons, setDisabledButtons] = useState<boolean>(false);

  const router = useRouter();

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleCredentialsSignIn = signInForm.handleSubmit(async (credentials) => {
    setErrorMessage(null);
    setDisabledButtons(true);
    await signIn.email(
      {
        email: credentials.email,
        password: credentials.password,
        rememberMe: true,
      },
      {
        onSuccess() {
          router.push('/');
        },
        onError() {
          setDisabledButtons(false);
          setErrorMessage('Credenciales incorrectas');
        },
      },
    );
  });

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setDisabledButtons(true);
    await signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="grid p-0 md:grid-cols-2">
        <Form {...signInForm}>
          <form className="p-6 md:p-8" onSubmit={handleCredentialsSignIn}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido nuevamente</h1>
                <p className="text-muted-foreground text-balance">
                  Ingrese sus credenciales para loguearse
                </p>
              </div>

              <div className="grid gap-2">
                <FormField
                  control={signInForm.control}
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
                  control={signInForm.control}
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

              {!!errorMessage && (
                <Alert className="bg-destructive/10 border-none">
                  <OctagonAlertIcon className="size-4 !text-destructive" />
                  <AlertTitle>{errorMessage}</AlertTitle>
                </Alert>
              )}
              <Button disabled={disabledButtons} type="submit" className="w-full">
                Continuar
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
                onClick={handleGoogleSignIn}
                disabled={disabledButtons}
              >
                <span className="flex items-center gap-2">
                  <FaGoogle />
                  Google
                </span>
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
