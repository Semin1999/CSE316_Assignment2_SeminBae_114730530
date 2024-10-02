import { useState } from 'react'
import Navbar from './component/0.Navbar'
import './App.css'

function App() {
  const Navbar: React.FC = () => {
    return (
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/faq">FAQ</a>
          </li>
        </ul>
      </nav>
    );
  };
}

export default App
