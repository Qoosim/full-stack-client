import styles from './register.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <div className={styles.formWrapper}>
        <AccountCircleIcon className= {styles.formAvatar} />
        <form className={styles.form} autoComplete='off'>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Username</label>
            <input type="text" name="username" placeholder="Username" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input type="email" name="username" placeholder="Email" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <input type="password" name="password" placeholder="Password" required />
          </div>
          <button className={`btn btn-primary ${styles.signupBtn}`}>Sign Up</button>
          <span className={styles.haveAccount}>
            Already have an account? <Link to="/login" >Login</Link>
          </span>
        </form>
      </div>
    </>
  )
}

export default Register