import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { loginFormDepsContext } from './deps';
import { AuthService } from '../../model/services/AuthService/AuthService';
import * as useLogin from '../../hooks/useLogin';

const createSession = vi.fn();
const authService = {
  login: vi.fn().mockImplementation(createSession),
} as unknown as AuthService;

const useLoginReturnValue = {
  email: 'email@gmail.com',
  password: '1432234',
  setEmail: vi.fn(),
  setPassword: vi.fn(),
  onSubmit: vi.fn(),
};

const renderLoginForm = () =>
  render(
    <loginFormDepsContext.Provider
      value={{
        createSession,
        authService,
      }}
    >
      <LoginForm />
    </loginFormDepsContext.Provider>
  );

describe('LoginForm', () => {
  test('by default submit button should be disabled', () => {
    renderLoginForm();

    expect(
      screen.queryByTestId('feature__LoginForm__submit_btn')
    ).toBeDisabled();
  });

  test('submit button should be disabled if email is not inputted', () => {
    const useLoginSpy = vi.spyOn(useLogin, 'useLogin');

    useLoginSpy.mockReturnValue({ ...useLoginReturnValue, email: '' });

    renderLoginForm();

    expect(
      screen.queryByTestId('feature__LoginForm__submit_btn')
    ).toBeDisabled();
  });

  test('submit button should be disabled if password is not inputted', () => {
    const useLoginSpy = vi.spyOn(useLogin, 'useLogin');

    useLoginSpy.mockReturnValue({ ...useLoginReturnValue, password: '' });

    renderLoginForm();

    expect(
      screen.queryByTestId('feature__LoginForm__submit_btn')
    ).toBeDisabled();
  });

  test('if both email and password is inputted submit button should not be disabled', () => {
    const useLoginSpy = vi.spyOn(useLogin, 'useLogin');

    useLoginSpy.mockReturnValue(useLoginReturnValue);

    renderLoginForm();

    expect(
      screen.queryByTestId('feature__LoginForm__submit_btn')
    ).not.toBeDisabled();
  });

  test('after click submit button authService.login should be called', () => {
    const useSessionObservableSpy = vi.spyOn(useLogin, 'useLogin');

    const onSubmit = vi.fn().mockImplementation(authService.login);

    useSessionObservableSpy.mockReturnValue({
      ...useLoginReturnValue,
      onSubmit,
    });

    renderLoginForm();

    fireEvent.click(screen.getByTestId('feature__LoginForm__submit_btn'));
    expect(authService.login).toHaveBeenCalled();
    expect(createSession).toHaveBeenCalled();
  });
});
