import React from 'react';

const Header = () => {
  return (
    <header className="text-gray-600 body-font shadow-md bg-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          
          <span className="ml-3 text-xl font-bold">Finance Tracker</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900 cursor-pointer">Dashboard</a>
          <a className="mr-5 hover:text-gray-900 cursor-pointer">Transactions</a>
          <a className="mr-5 hover:text-gray-900 cursor-pointer">Reports</a>
          <a className="mr-5 hover:text-gray-900 cursor-pointer">Settings</a>
        </nav>
        <button className="inline-flex items-center bg-green-500 text-white border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-base mt-4 md:mt-0">
          Add Transaction
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
