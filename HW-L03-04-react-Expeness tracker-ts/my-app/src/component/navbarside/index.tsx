import React, { useState } from 'react';
import styles from './navbarside.module.scss';
import { FaHome, FaMoneyBill, FaFile, FaBars, FaTimes } from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";
import { HiWrench } from "react-icons/hi2";
import { IoMdPerson } from "react-icons/io";
import { MdRocketLaunch } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const Menuside: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.mobileHeader}>
        <button className={styles.hamburger} onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className={styles.logo}>Expense Tracker</div>
      </div>

      <nav className={`${styles.container} ${isOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.list}>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }: { isActive: boolean }) => 
                `${isActive ? styles.active : ''}`
              } 
              onClick={() => setIsOpen(false)}
            >
              <span><FaHome /></span>
              <span className={styles.iconText}>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/tables" 
              className={({ isActive }: { isActive: boolean }) => 
                `${isActive ? styles.active : ''}`
              } 
              onClick={() => setIsOpen(false)}
            >
              <span><FiBarChart2 /></span>
              <span className={styles.iconText}>Tables</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/billing" 
              className={({ isActive }: { isActive: boolean }) => 
                `${isActive ? styles.active : ''}`
              } 
              onClick={() => setIsOpen(false)}
            >
              <span><FaMoneyBill /></span>
              <span className={styles.iconText}>Billing</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/rtl" 
              className={({ isActive }: { isActive: boolean }) => 
                `${isActive ? styles.active : ''}`
              } 
              onClick={() => setIsOpen(false)}
            >
              <span><HiWrench /></span>
              <span className={styles.iconText}>RTL</span>
            </NavLink>
          </li>
        </ul>
        
        <div>
          <h1>ACCOUNT PAGES</h1>
          <ul className={styles.listPage}>
            <li>
              <NavLink 
                to="/Profiledetail" 
                className={({ isActive }: { isActive: boolean }) => 
                  `${isActive ? styles.active : ''}`
                } 
                onClick={() => setIsOpen(false)}
              >
                <span><IoMdPerson /></span>
                <span className={styles.iconText}>Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/login" 
                className={({ isActive }: { isActive: boolean }) => 
                  `${isActive ? styles.active : ''}`
                } 
                onClick={() => setIsOpen(false)}
              >
                <span><FaFile /></span>
                <span className={styles.iconText}>SignIn</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/signup" 
                className={({ isActive }: { isActive: boolean }) => 
                  `${isActive ? styles.active : ''}`
                } 
                onClick={() => setIsOpen(false)}
              >
                <span><MdRocketLaunch /></span>
                <span className={styles.iconText}>SignUp</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Menuside;