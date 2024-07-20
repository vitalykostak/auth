import { describe, expect, test } from 'vitest';
import { render, act } from '@testing-library/react';
import { useSessionRepository } from './useSessionRepository';
import { AuthSession } from './types';
import { useObservable } from '@/shared/lib/Observerable';

const setup = () => {
  const returnVal: ReturnType<typeof useSessionRepository> & {
    session: AuthSession;
  } = {} as ReturnType<typeof useSessionRepository> & { session: AuthSession };
  const TestComponent = () => {
    const repositoryData = useSessionRepository();
    Object.assign(
      returnVal,
      repositoryData,
      useObservable(repositoryData.getSessionObservable())
    );
    return null;
  };
  render(<TestComponent />);

  return returnVal;
};

describe('useSessionRepository', () => {
  test('useSessionRepository', async () => {
    const repositoryData = setup();

    // by default session does not exist
    expect(repositoryData.session).toBeNull();

    // creating session should work properly
    const session = { id: 'id', email: 'email', token: 'token' };
    await act(async () => repositoryData.createSession(session));
    expect(repositoryData.session).toEqual(session);

    // removing session should work properly
    await act(async () => repositoryData.removeSession());
    expect(repositoryData.session).toBeNull();
  });
});
