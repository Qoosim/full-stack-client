import styles from './navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/" className={styles.logo}>Juubix</Link>
          <Link to="/" className={styles.home}>Home</Link>
        </div>
        <nav className={styles.headerRight}>
            <ul className={styles.navigation}>
              <Link to="/login" className={styles.login}>Login</Link>
              <Link to="/register" className={styles.register}>Sign Up</Link>
            </ul>
        </nav>
      </header> 
    </>
  )
}

export default Navbar;