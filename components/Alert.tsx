import clsx from 'clsx';

type AlertProps = {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
};

export const Alert = ({ type, message }: AlertProps) => (
  <div
    className={clsx(
      `w-full flex items-center justify-center leading-6 p-4`,
      type === 'info' && 'bg-blue-500/50 border border-blue-500',
      type === 'success' && 'bg-green-500/50 border border-green-500',
      type === 'warning' && 'bg-yellow-500/50 border border-yellow-500',
      type === 'error' && 'bg-red-500/50 border border-red-500'
    )}
  >
    {/* // classNames(styles.alert, styles[`alert-${type}`])} */}
    {message}
  </div>
);
