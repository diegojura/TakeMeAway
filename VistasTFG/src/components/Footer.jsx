import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="flex flex-col items-center bg-black text-center text-white p-4">
      <div className="w-full text-center text-sm">
        © 2025 Copyright:&ensp;
        <Link to="/" className="underline hover:text-gray-300">Campeones</Link>
      </div>
    </footer>
  );
}

export default Footer;
