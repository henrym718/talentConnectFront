import { Button } from '@/components/ui/button';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function DataPagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          disabled={page === 1}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
