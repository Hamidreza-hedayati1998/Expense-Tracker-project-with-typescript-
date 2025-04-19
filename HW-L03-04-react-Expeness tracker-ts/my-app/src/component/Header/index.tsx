import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './header.module.scss';
import { FaHome, FaBell } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoIosSettings, IoMdWallet } from "react-icons/io";

type PageTitle = 'Login' | 'Sign Up' | 'Settings' | 'Notifications' | 'Profile' | 'Wallet' | 'Dashboard';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate(`/?search=${encodeURIComponent(e.target.value)}`);
  };
  
  const pathnames = location.pathname.split('/').filter(x => x);
  
  const handleSearchClick = () => {
    const inputElement = document.querySelector<HTMLInputElement>(`.${styles.inputsearch}`);
    if (inputElement) {
      handleSearch({ target: inputElement } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const getPageTitle = (path: string): PageTitle => {
    switch(path) {
      case 'login':
        return 'Login';
      case 'signup':
        return 'Sign Up';
      case 'settings':
        return 'Settings';
      case 'notifications':
        return 'Notifications';
      case 'Profiledetail':
        return 'Profile';
      case 'Wallet':
        return 'Wallet';  
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className={styles.containerheader}>
      <div className={styles.leftlist}>
        <div className={styles.textright}>
          <Link to="/" className={`flex items-center`}>
            <span><FaHome /></span>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              return isLast ? (
                <span key={name}>/{getPageTitle(name)}</span>
              ) : (
                <span key={name}>
                  /<Link to={routeTo}>{getPageTitle(name)}</Link>
                </span>
              );
            })}
          </Link>
        </div>
        <div>
          <h1 className='text-xl'>
            {pathnames.length > 0 ? getPageTitle(pathnames[pathnames.length - 1]) : 'Dashboard'}
          </h1>
        </div>
      </div>
      <div className={styles.rightlist}>
        <div className='m-8'> 
          <Link to="/Wallet">
            <IoMdWallet size={24}/>
          </Link>
        </div>
        <div className={styles.inputwrap}>
          <button onClick={handleSearchClick}><IoSearch /></button>
          <input 
            className={styles.inputsearch} 
            type="text" 
            onChange={handleSearch} 
            placeholder="Search transactions..." 
          />
        </div>
        <ul className="flex gap-4 items-center">
          <li>
            <NavLink 
              to="/login" 
              className={({ isActive }: { isActive: boolean }) => 
                `flex px-2 items-center ${
                  isActive ? 'text-[#fff] font-bold border-l-4 h-5 border-blue-600' : ''
                }`
              }
            >
              <span><MdPerson /></span>signin
            </NavLink>
          </li>
          <li>
            <Link to="/">
              <IoIosSettings />
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaBell />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;