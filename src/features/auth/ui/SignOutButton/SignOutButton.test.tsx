import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SignOutButton } from './SignOutButton';
import * as useSessionRepository from '@/entities/session';

describe('SignOutButton', () => {
  test('should remove session on click', () => {
    const useSessionRepositorySpy = vi.spyOn(
      useSessionRepository,
      'useSessionRepository'
    );

    const removeSession = vi.fn();

    useSessionRepositorySpy.mockReturnValue({
      removeSession,
    } as unknown as ReturnType<
      typeof useSessionRepository.useSessionRepository
    >);

    render(<SignOutButton />);

    expect(screen.getByTestId('feature_SignOutBtn')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('feature_SignOutBtn'));
    expect(removeSession).toHaveBeenCalled();
  });
});
