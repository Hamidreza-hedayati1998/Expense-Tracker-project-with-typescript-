
import { Outlet } from 'react-router-dom';
import Menuside from '../component/navbar-side';
import Header from '../component/header/navbar';
import styles from './layout.module.scss';
import '../index.css'
const Layout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menuwrap}>
        <Menuside />
      </div>
      <div className={styles.mainrwrap}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;