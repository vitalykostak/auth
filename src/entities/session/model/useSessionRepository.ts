import { BehaviorSubject } from 'rxjs';
import { AuthSession } from './types';
import { useCallback, useLayoutEffect } from 'react';
import { container } from 'tsyringe';
import { SessionRepository } from './SessionRepository';

type SessionState = {
  session: AuthSession | null;
};

const initialState: SessionState = {
  session: null,
};

const sessionRepository = container.resolve(SessionRepository);

const sessionObservable = new BehaviorSubject<SessionState>(initialState);

const setNextState = (state: Partial<SessionState>) => {
  sessionObservable.next({ ...sessionObservable.getValue(), ...state });
};

export const useSessionRepository = () => {
  const createSession = useCallback((session: AuthSession) => {
    sessionRepository.saveSession(session);
    setNextState({ session });
  }, []);

  const removeSession = useCallback(() => {
    sessionRepository.removeSession();
    setNextState({ session: null });
  }, []);

  useLayoutEffect(() => {
    setNextState({ session: sessionRepository.getSession() });
  }, []);

  const getSessionObservable = useCallback(() => sessionObservable, []);

  return { createSession, removeSession, getSessionObservable };
};
