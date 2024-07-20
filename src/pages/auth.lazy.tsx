import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { PageLayout } from '../widgets/PageLayout';
import { Navbar } from '@/widgets/Navbar';
import { authService, LoginForm, loginFormDepsContext } from '@/features/auth';
import { useSessionRepository } from '@/entities/session';

export const Route = createLazyFileRoute('/auth')({
  component: () => <Auth />,
});

export function Auth() {
  const { createSession } = useSessionRepository();

  const navigate = useNavigate();

  const onSuccessfulLogin = () => navigate({ to: '/' });

  return (
    <PageLayout topLine={<Navbar />}>
      <div className="flex items-center flex-col mt-20">
        <h1 className="text-xl font-bold text-sky-400 mb-3">Auth</h1>
        <loginFormDepsContext.Provider value={{ authService, createSession }}>
          <LoginForm onSuccessfulLogin={onSuccessfulLogin} />
        </loginFormDepsContext.Provider>
      </div>
    </PageLayout>
  );
}
