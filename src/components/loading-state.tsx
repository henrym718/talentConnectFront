import { Loader2Icon } from 'lucide-react';

interface LoadingStateProps {
  tittle: string;
  description: string;
}

export function LoadingState({ tittle, description }: LoadingStateProps) {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
        <Loader2Icon className="size-6 animate-spin text-primary" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-medium"> {tittle} </h6>
          <span className="text-sm"> {description} </span>
        </div>
      </div>
    </div>
  );
}
