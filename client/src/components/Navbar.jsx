import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
    <h2>SkillX</h2>
    <a href="/">🏠 Home</a>
    <a href="/chat">💬 Chat</a>
    <a href="/Playground">🕹️ Playground</a>
    <a href="/Profile">👤 Profile</a>
  </nav>
  

  );
};

export default Navbar;
