import { useSessionRepository } from '@/entities/session';
import { Button } from '@/shared/ui/Button/Button';
import { FC } from 'react';

type SignOutButtonProps = {
  className?: string;
};

export const SignOutButton: FC<SignOutButtonProps> = () => {
  const { removeSession } = useSessionRepository();

  return (
    <Button dataTestId="feature_SignOutBtn" onClick={removeSession}>
      Sign Out
    </Button>
  );
};
