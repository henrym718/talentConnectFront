import Image from 'next/image';

interface EmptyProps {
  tittle: string;
  description: string;
}

export function EmptyState({ tittle, description }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/empty.svg" alt="Empty" width={240} height={240} />
      <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
        <h6 className="text-lg font-medium"> {tittle} </h6>
        <span className="text-sm text-muted-foreground"> {description} </span>
      </div>
    </div>
  );
}
