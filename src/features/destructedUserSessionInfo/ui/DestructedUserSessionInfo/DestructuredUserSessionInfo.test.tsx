import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DestructuredUserSessionInfo } from './DestructedUserSessionInfo';
import * as useObservable from '@/shared/lib/Observerable';

describe('DestructuredUserSessionInfo', () => {
  test('should render if session info if user logged in', () => {
    const useSessionObservableSpy = vi.spyOn(useObservable, 'useObservable');

    useSessionObservableSpy.mockReturnValue({ session: {} });
    render(<DestructuredUserSessionInfo />);

    expect(
      screen.queryByTestId('feature__DestructuredUserSessionInfo')
    ).toBeInTheDocument();
  });

  test('should not render if user is not logged in', async () => {
    const useSessionObservableSpy = vi.spyOn(useObservable, 'useObservable');

    useSessionObservableSpy.mockReturnValue({ session: null });

    render(<DestructuredUserSessionInfo />);

    expect(
      screen.queryByTestId('feature__DestructuredUserSessionInfo')
    ).not.toBeInTheDocument();
  });
});
