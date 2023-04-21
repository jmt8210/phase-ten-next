import styles from '@/styles/Header.module.sass';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className={styles.header}>
      <b>Phase 10</b>
      <div style={{ float: 'right' }}>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};
