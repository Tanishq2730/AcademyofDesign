'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/auth.module.scss';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const endpoint = isLogin ? '/api/login' : '/api/signup';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (isLogin) {
        setSuccess('Authentication successful. Welcome back.');
        setTimeout(() => {
          let dest = '/';
          if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const redirectVal = params.get('redirect');
            if (redirectVal) dest = redirectVal;
          }
          router.push(dest);
          router.refresh();
        }, 1000);
      } else {
        setSuccess('Account created successfully.');
        setTimeout(() => {
          setIsLogin(true);
          setSuccess('');
        }, 1500);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPageWrapper}>
      {/* Illustration Side */}
      <section className={styles.illustrationSide}>
        <Image 
          src="/assets/auth_illustration.png" 
          alt="Design Illustration" 
          fill
          className={styles.illustrationImg}
          priority
        />
        <div className={styles.overlay} />
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={styles.floatingContent}
        >
          <h2>Design Your <br /> Future with Us.</h2>
          <p>Join the community of world-class designers and architects at Nuvosid Academy.</p>
        </motion.div>
      </section>

      {/* Form Side */}
      <section className={styles.formSide}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className={styles.authCard}
        >
          <div className={styles.authToggle}>
            <button 
              className={isLogin ? styles.active : ''} 
              onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
            >
              Sign In
            </button>
            <button 
              className={!isLogin ? styles.active : ''} 
              onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
            >
              Register
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login-text' : 'signup-text'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
              <p className={styles.subtitle}>
                {isLogin 
                  ? 'Access your personal dashboard and courses.' 
                  : 'Start your journey with our professional design courses.'}
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {(error || success) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                {error && <div className={styles.errorMsg}>{error}</div>}
                {success && <div className={styles.successMsg}>{success}</div>}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div 
                  key="name-field"
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: '1.5rem' }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  style={{ overflow: 'hidden' }}
                  className={styles.formGroup}
                >
                  <label className={styles.label} htmlFor="name">Full Name</label>
                  <input
                    className={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required={!isLogin}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Email Address</label>
              <input
                className={styles.input}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@email.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="password">Password</label>
              <input
                className={styles.input}
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>

            <motion.button 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading 
                ? (isLogin ? 'Authenticating...' : 'Creating...') 
                : (isLogin ? 'Sign In' : 'Create Account')}
            </motion.button>
          </form>

          <div className={styles.redirectLink}>
            <Link href="/">
              ← Back to Nuvosid Academy
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
