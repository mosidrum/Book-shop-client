import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import { paths } from '../routes/paths';
import logo from '../assets/book-open.svg';

const Header = () => {
  return (
    <header>
      <Link to={paths.index} className='logo'>
        <img src={logo} alt='ReactJs' />BookShop
      </Link>
      <nav>
        <NavLink to={paths.books}>Books</NavLink>
      </nav>
    </header>
  )
}

export default Header