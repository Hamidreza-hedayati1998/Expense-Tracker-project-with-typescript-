import React from 'react';
import { Outlet } from 'react-router-dom';
import Menuside from '../component/navbarside';
import Header from '../component/Header';
import styles from './layout.module.scss';

const Layout: React.FC = () => {
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