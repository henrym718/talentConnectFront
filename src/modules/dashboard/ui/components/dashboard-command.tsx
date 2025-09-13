import {
  CommandResponsiveDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { Dispatch, SetStateAction } from 'react';

interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function DashboardCommand({ open, setOpen }: DashboardCommandProps) {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Buscar una reunion o un agente" />
      <CommandList>
        <CommandGroup>
          <CommandItem>Ir al Dasboar</CommandItem>
          <CommandItem>Buscar Usuario</CommandItem>
          <CommandItem>Crear reporte</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
}
