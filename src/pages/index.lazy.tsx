import { createLazyFileRoute } from '@tanstack/react-router';
import { PageLayout } from '@/widgets/PageLayout';
import { Navbar } from '@/widgets/Navbar';
import { SignOutButton } from '@/features/auth';
import { useSessionRepository } from '@/entities/session';
import { useObservable } from '@/shared/lib/Observerable';
import { DestructuredUserSessionInfo } from '@/features/destructedUserSessionInfo';

export const Route = createLazyFileRoute('/')({
  component: () => <Main />,
});

function Main() {
  const { getSessionObservable } = useSessionRepository();
  const { session } = useObservable(getSessionObservable());

  return (
    <PageLayout topLine={<Navbar />}>
      <div className="flex w-full justify-center mt-5">
        {session ? (
          <div className="flex gap-3 flex-col">
            <DestructuredUserSessionInfo />
            <SignOutButton />
          </div>
        ) : (
          <h1 className="text-6xl font-bold text-sky-400">Hello world</h1>
        )}
      </div>
    </PageLayout>
  );
}
