import classNames from 'classnames';
import { ChangeEventHandler, FC, InputHTMLAttributes, memo } from 'react';

type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

type InputProps = {
  onChange: (value: string) => void;
  className?: string;
} & HtmlInputProps;

export const Input: FC<InputProps> = memo((props) => {
  const { onChange, type = 'button', className, ...otherProps } = props;

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <input
      className={classNames(
        'p-1 w-60 cursor-pointer text-color text-sm outline-0 border rounded-lg',
        className
      )}
      onChange={changeHandler}
      {...otherProps}
    />
  );
});
