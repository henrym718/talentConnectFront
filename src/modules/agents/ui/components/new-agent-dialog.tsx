'use clinet';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export function NewAgentDialog({ onOpenChange, open }: Props) {
  return (
    <ResponsiveDialog
      title="New Agent"
      descriptiom="Create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      new agents form
    </ResponsiveDialog>
  );
}
