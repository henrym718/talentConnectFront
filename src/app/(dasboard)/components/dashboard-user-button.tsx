'use client';

import { authClient, useSession } from '@/lib/authClient';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { GeneratedAvatar } from '@/components/generated-avatar';
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerHeader,
  DrawerFooter,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function DashboardUserButton() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data, isPending } = useSession();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess() {
          router.push('/sign-in');
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 mb-3 w-full flex items-center justify-between gap-2 bg-white/5 hover:bg-white/10 overflow-hidden">
          {data.user.image ? (
            <Avatar>
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar className="size-9 mr-3" seed={data.user.name} variant="initials" />
          )}

          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full">{data.user.name} </p>
            <p className="text-xs truncate w-full">{data.user.email} </p>
          </div>
          <ChevronDownIcon className="sice-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline" onClick={() => {}}>
              Facturación
              <CreditCardIcon className="size-4" />
            </Button>
            <Button variant="outline" onClick={onLogout}>
              Cerrar sesión
              <LogOutIcon className="size-4" />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 mb-3 w-full flex items-center justify-between gap-2 bg-white/5 hover:bg-white/10 overflow-hidden">
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar className="size-9 mr-3" seed={data.user.name} variant="initials" />
        )}

        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data.user.name} </p>
          <p className="text-xs truncate w-full">{data.user.email} </p>
        </div>
        <ChevronDownIcon className="sice-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="font-medium truncate">{data.user.name}</span>
          <span className="text-sm font-normal text-muted-foreground truncate">
            {data.user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex-items-center justify-between">
          Facturación
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer flex-items-center justify-between"
        >
          Cerrar sesión
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
