import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { toast } from 'react-toastify';

import { basedUrl } from '../../basedUrl';

const Login = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate()

  // axios.defaults.baseURL = "https://node-api-endpoints.onrender.com/api";
  basedUrl();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email.current.value,
      password: password.current.value
    };
    try {
      const { data } = await axios.post('/auth/login', userData);
      localStorage.setItem("token", data.token);
      toast.success("Successfully logged in");
      navigate("/posts");
    } catch (err) {
      toast.error(err.response.data.error)
    }
  }

  return (
    <>
      <div className={styles.formWrapper}>
        <AccountCircleIcon className= {styles.formAvatar} />
        <form onSubmit={handleSubmit} className={styles.form} autoComplete='off'>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              ref={email}
              type="email"
              name="username"
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <input
              ref={password}
              type="password"
              name="password"
              placeholder="Password"
              required
            />
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