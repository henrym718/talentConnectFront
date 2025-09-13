import { AlertCircleIcon } from 'lucide-react';

interface ErrorProps {
  tittle: string;
  description: string;
}

export function ErrorState({ tittle, description }: ErrorProps) {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
        <AlertCircleIcon className="size-6 text-red-500" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-medium"> {tittle} </h6>
          <span className="text-sm"> {description} </span>
        </div>
      </div>
    </div>
  );
}
