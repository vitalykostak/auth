import { describe, expect, test, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { useLogin } from './useLogin';
import {
  LoginFormDepsContext,
  loginFormDepsContext,
} from '../ui/LoginForm/deps';

const emailExample = 'email@gmail.com';
const passwordExample = '123456789';
const authService = { login: vi.fn().mockReturnValue({ data: 'session' }) };
const createSession = vi.fn();
const deps = { authService, createSession };

const setup = () => {
  const returnVal: ReturnType<typeof useLogin> = {} as ReturnType<
    typeof useLogin
  >;
  const TestComponent = () => {
    Object.assign(returnVal, useLogin());
    return null;
  };
  render(
    <loginFormDepsContext.Provider
      value={deps as unknown as LoginFormDepsContext}
    >
      <TestComponent />
    </loginFormDepsContext.Provider>
  );

  return returnVal;
};

describe('useLogin', () => {
  test('useLogin', async () => {
    const useLoginData = setup();

    // by default email and password is empty
    expect(useLoginData.email).toBe('');
    expect(useLoginData.password).toBe('');

    // setEmail should work
    await act(async () => useLoginData.setEmail(emailExample));
    expect(useLoginData.email).toBe(emailExample);

    // setPassword should work
    await act(async () => useLoginData.setPassword(passwordExample));
    expect(useLoginData.password).toBe(passwordExample);

    // submit should call login() properly
    await act(async () => useLoginData.onSubmit());
    expect(authService.login).toHaveBeenCalledWith({
      email: emailExample,
      password: passwordExample,
    });
  });
});
