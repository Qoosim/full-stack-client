import styles from './home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className={styles.homeWrapper}>
        <h1>Welcome to <b>JUUBIX TEAM</b></h1>
        <p>Kindly login to create posts</p>
        <Link to="/login" className={`btn btn-primary ${styles.loginBtn}`}>Login</Link>
      </div>
    </>
  )
}

export default Home