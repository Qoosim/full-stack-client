import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './register.module.css';

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordConfirm.current.value) {
      passwordConfirm.current.setCustomValidity("Passwords don't match");
    } else {
      const newUser = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      };
      try {
        const { data } = await axios.post('/auth/register', newUser);
        toast.success(data.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  }

  return (
    <>
      <div className={styles.formWrapper}>
        <AccountCircleIcon className= {styles.formAvatar} />
        <form className={styles.form} autoComplete='off' onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Username</label>
            <input type="text" ref={username} name="username" placeholder="Username" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input type="email" ref={email} name="username" placeholder="Email" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <input type="password" ref={password} name="password" placeholder="Password" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password Confirm</label>
            <input type="password" ref={passwordConfirm} name="password-confirm" placeholder="Password Confirm" required />
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