import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import styles from './login.module.css';

const Login = () => {
  return (
    <>
      <div className={styles.formWrapper}>
        <AccountCircleIcon className= {styles.formAvatar} />
        <form className={styles.form} autoComplete='off'>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input type="email" name="username" placeholder="Email" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <input type="password" name="password" placeholder="Password" required />
          </div>
          <button className={`btn btn-primary ${styles.loginBtn}`}>Login</button>
          <span className={styles.haveAccount}>
            Don't have an account? <Link to="/register" >Sign Up</Link>
          </span>
        </form>
      </div>
    </>
  )
}

export default Login