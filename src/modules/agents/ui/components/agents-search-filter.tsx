'use client';

import { Input } from '@/components/ui/input';
import { useAgentsFilters } from '../../hooks/use-agents-filters';
import { SearchIcon } from 'lucide-react';

export function AgentsSearchFilter() {
  const [query, setQuery] = useAgentsFilters();

  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 w-[200px] pl-7 bg-white"
        value={query.search}
        onChange={(e) => setQuery({ search: e.target.value })}
      />
      <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
