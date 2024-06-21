import React from 'react';

function Header() {
  return (
    <header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      padding: '0 20px', 
      height: '60px', 
      backgroundColor: '#fff', 
      boxShadow: '0 6px 7px -3px rgba(5, 165, 29, 0.454)' 
    }}>
      <div style={{ flexGrow: 1 }} /> {/* Placeholder to push content to the right */}
      <h1 style={{ 
        margin: 0, 
        fontSize: '20px', 
        color: 'rgb(29, 122, 29)', 
        fontFamily: 'Poppins, sans-serif', 
        fontWeight: 'bold', 
        textAlign: 'right', 
        letterSpacing: '0' // No spacing between letters
      }}>
        Your  Journey  to  a  Greener  Planet!
      </h1>
    </header>
  );
}

export default Header;
