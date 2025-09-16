'use clinet';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Dispatch, SetStateAction } from 'react';
import { AgentForm } from './agents-form';

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
      <AgentForm onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} />
    </ResponsiveDialog>
  );
}
