import { Input } from '@/shared/ui/Input/Input';
import { FC, FormEventHandler } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import classNames from 'classnames';
import { useLogin } from '../../hooks/useLogin';

type LoginFormProps = {
  className?: string;
  onSuccessfulLogin?: () => void;
};

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { className, onSuccessfulLogin } = props;

  const { email, password, setEmail, setPassword, onSubmit } = useLogin();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await onSubmit();
    onSuccessfulLogin?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames('flex gap-2 flex-col w-fit', className)}
    >
      <Input
        placeholder="Email"
        value={email}
        onChange={setEmail}
        type="email"
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={setPassword}
        type="password"
      />
      <Button
        dataTestId="feature__LoginForm__submit_btn"
        title="Sign in"
        type="submit"
        disabled={!email || !password}
      >
        Sign In
      </Button>
    </form>
  );
};
