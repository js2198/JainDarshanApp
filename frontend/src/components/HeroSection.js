import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
  
    <div className='hero-container'>
   
        <h4>|| नमो तित्थस्स ||</h4>
      <h1>JAIN DARSHAN</h1>
      <p>Get connected to all Jain Deraser across India</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>

      </div>
   
    </div>
  );
}

export default HeroSection;
