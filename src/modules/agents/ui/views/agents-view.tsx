'use client';

import { ErrorState } from '@/components/error-state.';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function AgentsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export const AgentsViewLoading = () => {
  return <LoadingState tittle="Loading Agents" description="This may take a few seconds" />;
};

export const AgentsViewError = () => {
  return <ErrorState tittle="Faield to load agents" description="Something went wrong" />;
};
