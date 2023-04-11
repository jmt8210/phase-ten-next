import styles from '@/styles/Header.module.sass';

export const Header = () => {
  return (
    <div className={styles.header}>
      <b>Phase 10</b>
      <div style={{ float: 'right' }}>Login</div>
    </div>
  );
};
