import { useCallback, useState } from 'react';
import { useLoginFormDeps } from '../ui/LoginForm/deps';

export const useLogin = () => {
  const deps = useLoginFormDeps();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = useCallback(async () => {
    const sessionData = await deps.authService.login({ email, password });
    deps.createSession(sessionData);
  }, [email, password, deps]);

  return { email, setEmail, password, setPassword, onSubmit };
};
