import { createStrictContext, useStrictContext } from '@/shared/lib/react';
import { AuthService } from '../../model/services/AuthService/AuthService';
import { AuthSession } from '@/entities/session';

export type LoginFormDepsContext = {
  authService: AuthService;
  createSession: (session: AuthSession) => void;
};

export const loginFormDepsContext = createStrictContext<LoginFormDepsContext>();

export const useLoginFormDeps = () => useStrictContext(loginFormDepsContext);
