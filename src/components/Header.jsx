import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/codechef.svg';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { signin, signout, user } = useAuth();
  const authenticated = !!user;
  return (
    <header className="text-gray-700 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img className="w-10" src={logo} alt="React Logo" />
          <span className="ml-3 text-xl">Breadbook</span>
        </Link>
        <nav
          className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-gray-900">Home</Link>
          {authenticated && <Link to="/share" className="mr-5 hover:text-gray-900">Share</Link>}
        </nav>
        {authenticated && <span className="mr-5">{user.displayName}</span>}
        <button
          type="button"
          className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
          onClick={() => (authenticated ? signout() : signin())}
        >
          {authenticated ? 'Logout' : 'Login'}
        </button>
      </div>
    </header>
  );
};

export default Header;
