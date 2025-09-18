'use client';

import { ErrorState } from '@/components/error-state.';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { DataTable } from '../components/data-table';
import { columns } from '../components/columns';
import { EmptyState } from '@/components/empty-state';
import { useAgentsFilters } from '../../hooks/use-agents-filters';
import { DataPagination } from '../components/data-pagination';

export default function AgentsView() {
  const [query, setQuery] = useAgentsFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({ ...query }));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col">
      <DataTable columns={columns} data={data.items} />
      <DataPagination
        page={query.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setQuery({ page })}
      />
      {data.items.length === 0 && <AgentsViewEmpty />}
    </div>
  );
}

export const AgentsViewLoading = () => {
  return <LoadingState tittle="Loading Agents" description="This may take a few seconds" />;
};

export const AgentsViewError = () => {
  return <ErrorState tittle="Faield to load agents" description="Something went wrong" />;
};

export const AgentsViewEmpty = () => {
  return (
    <EmptyState
      tittle="Create your firts agent"
      description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call"
    />
  );
};
