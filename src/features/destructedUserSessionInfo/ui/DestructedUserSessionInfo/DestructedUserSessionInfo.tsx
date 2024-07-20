import { useSessionRepository } from '@/entities/session';
import { useObservable } from '@/shared/lib/Observerable';
import classNames from 'classnames';
import { FC } from 'react';

type DestructuredUserSessionInfoProps = {
  className?: string;
  dataTestId?: string;
};

export const DestructuredUserSessionInfo: FC<
  DestructuredUserSessionInfoProps
> = (props) => {
  const { className, dataTestId = 'feature__DestructuredUserSessionInfo' } =
    props;

  const { getSessionObservable } = useSessionRepository();
  const { session } = useObservable(getSessionObservable());

  if (!session) {
    return null;
  }

  return (
    <pre
      data-testid={dataTestId}
      className={classNames('text-sky-400', className)}
    >
      {JSON.stringify(session, null, 2)}
    </pre>
  );
};
