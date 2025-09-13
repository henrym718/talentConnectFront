'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { OctagonAlertIcon } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { signIn, signUp } from '@/lib/authClient';
import { useRouter } from 'next/navigation';

const signUpSchema = z.object({
  name: z.string().min(2, { message: 'Nombre muy corto' }),
  email: z.string().email({ message: 'Correo inválido' }),
  password: z.string().min(8, { message: 'Mínimo 6 caracteres' }),
});

export function SignUpView() {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [disabledButtons, setDisabledButtons] = useState<boolean>(false);

  const router = useRouter();

  const singUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleSignUp = async (formData: z.infer<typeof signUpSchema>) => {
    setErrorMessage(null);
    setDisabledButtons(true);
    await signUp.email(
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess() {
          router.push('/');
        },
        onError() {
          setDisabledButtons(false);
          setErrorMessage('Credenciales ya existen');
        },
      },
    );
  };

  const handleGoogleSignUp = async () => {
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
        <Form {...singUpForm}>
          <form onSubmit={singUpForm.handleSubmit(handleSignUp)} className="p-6 md:p-8 ">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido nuevamente</h1>
                <p className="text-muted-foreground text-balance">
                  Ingrese sus credenciales para loguearse
                </p>
              </div>

              <div className="grid gap-2">
                <FormField
                  name="name"
                  control={singUpForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Joe Doe" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  name="email"
                  control={singUpForm.control}
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
                  control={singUpForm.control}
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

              {!!errorMessage && (
                <Alert className="bg-destructive/10 border-none">
                  <OctagonAlertIcon className="size-4 !text-destructive" />
                  <AlertTitle>{errorMessage}</AlertTitle>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={disabledButtons}>
                Continuar
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
                onClick={handleGoogleSignUp}
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
        <div className=" border-none bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col"></div>
      </CardContent>
    </Card>
  );
}
