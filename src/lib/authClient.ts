import { createAuthClient } from 'better-auth/react'; // ¡Importante usar 'better-auth/react'!

// No es necesario especificar baseURL, better-auth la lee automáticamente desde el .env
export const authClient = createAuthClient({});

export const { signIn, signUp, signOut, useSession } = authClient;
