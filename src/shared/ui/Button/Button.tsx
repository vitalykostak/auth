import classNames from 'classnames';
import { ButtonHTMLAttributes, FC, memo } from 'react';

type ButtonProps = {
  className?: string;
  dataTestId?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = memo((props) => {
  const { className, disabled, dataTestId, ...otherProps } = props;

  return (
    <button
      className={classNames(
        'p-1 w-60 hover:cursor-pointer text-white outline-0 border rounded-lg bg-black hover:opacity-50',
        { 'hover:cursor-default hover:opacity-80 opacity-80': disabled },
        className
      )}
      data-testid={dataTestId}
      disabled={disabled}
      {...otherProps}
    />
  );
});
