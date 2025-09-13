import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { HomeView } from '../../modules/home/ui/views/home-view';

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  return <HomeView />;
}
