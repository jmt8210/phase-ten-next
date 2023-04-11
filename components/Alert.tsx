import styles from '@/styles/Alert.module.sass';
import classNames from 'classnames';
type AlertProps = {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
};

export const Alert = ({ type, message }: AlertProps) => (
  <div className={classNames(styles.alert, styles[`alert-${type}`])}>
    {message}
  </div>
);
