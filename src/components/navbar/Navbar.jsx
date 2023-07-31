import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

   axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    toast.success("You are now logged out");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/" className={styles.logo}>Juubix</Link>
          <Link to="/" className={styles.home}>Home</Link>
        </div>
        <nav className={styles.headerRight}>
            <ul className={styles.navigation}>
              { isLoggedIn ? (
                <Link to="/login" onClick={logout}>Logout</Link>
                ) : (
                <div className={styles.navigation}>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Sign Up</Link>
                </div>
              )}
            </ul>
        </nav>
      </header> 
    </>
  )
}

export default Navbar;