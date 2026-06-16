'use client';

import { useRouter } from 'next/navigation';
import styles from '@/styles/auth.module.scss';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'GET',
      });

      if (res.ok) {
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">Nuvosid</Link>
        </div>
        <div className={styles.userInfo}>
          <span>Welcome, User</span>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </nav>

      <main className={styles.dashboardContent}>
        <div className="container py-4">
          <h2>Dashboard</h2>
          <p>Welcome to your secure dashboard area. Here you can manage your account and view statistics.</p>

          <div className="row g-4 mt-3">
            <div className="col-6 col-lg-3">
              <div className={styles.statCard}>
                <h3>Total Courses</h3>
                <div className={styles.value}>12</div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className={styles.statCard}>
                <h3>Completed</h3>
                <div className={styles.value}>4</div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className={styles.statCard}>
                <h3>Certificates</h3>
                <div className={styles.value}>2</div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className={styles.statCard}>
                <h3>Hours Spent</h3>
                <div className={styles.value}>48h</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
