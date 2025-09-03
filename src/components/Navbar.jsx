import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navButtonStyle = {
    display: 'inline-block',
    padding: isMobile ? '0.8rem 1rem' : '0.6rem 1.2rem',
    backgroundColor: '#0f0f0f',
    color: '#00ffcc',
    border: '1px solid #00ffcc',
    borderRadius: '4px',
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    textDecoration: 'none',
    textShadow: '0 0 5px rgba(0, 255, 204, 0.5)',
    boxShadow: '0 0 10px rgba(0, 255, 204, 0.3)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    margin: isMobile ? '0.5rem 0' : '0 0.5rem',
    position: 'relative',
    overflow: 'hidden',
    width: isMobile ? '100%' : 'auto',
    textAlign: 'center'
  };

  const hoverStyle = {
    backgroundColor: '#00ffcc',
    color: '#0f0f0f',
    boxShadow: '0 0 20px rgba(0, 255, 204, 0.8)',
    textShadow: 'none'
  };

  const hamburgerStyle = {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    padding: '0.5rem',
    zIndex: 1001
  };

  const hamburgerLineStyle = {
    width: '25px',
    height: '3px',
    backgroundColor: '#00ffcc',
    margin: '3px 0',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 5px rgba(0, 255, 204, 0.5)'
  };

  const mobileMenuStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease',
    padding: '2rem'
  };

  const navItems = [
    { path: '/auth', name: localStorage.getItem('token') ? 'LOGOUT' : 'LOGIN' },
    { path: '/search', name: 'SEARCH' },
    { path: '/profile', name: 'PROFILE' },
    { path: '/user/books', name: 'YOUR BOOKS' },
    { path: '/chatbot', name: 'CHATBOT' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav style={{
        backgroundColor: '#0a0a0a',
        padding: isMobile ? '1rem' : '1rem 2rem',
        borderBottom: '1px solid #00ffcc',
        boxShadow: '0 0 25px rgba(0, 255, 204, 0.4)',
        position: 'relative',
        zIndex: 999
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <Link 
            to="/dashboard" 
            style={{
              color: '#00ffcc',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(0, 255, 204, 0.7)',
              letterSpacing: '2px',
              textDecoration: 'none'
            }}
          >
            CYBER_LIB
          </Link>

          {/* Desktop Menu */}
          {!isMobile && (
            <div style={{ display: 'flex' }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={navButtonStyle}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = navButtonStyle.backgroundColor;
                    e.currentTarget.style.color = navButtonStyle.color;
                    e.currentTarget.style.boxShadow = navButtonStyle.boxShadow;
                    e.currentTarget.style.textShadow = navButtonStyle.textShadow;
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Mobile Hamburger Menu */}
          {isMobile && (
            <div style={hamburgerStyle} onClick={toggleMobileMenu}>
              <div style={{
                ...hamburgerLineStyle,
                transform: isMobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'
              }}></div>
              <div style={{
                ...hamburgerLineStyle,
                opacity: isMobileMenuOpen ? '0' : '1'
              }}></div>
              <div style={{
                ...hamburgerLineStyle,
                transform: isMobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'
              }}></div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <div style={mobileMenuStyle}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            width: '100%',
            maxWidth: '300px'
          }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={navButtonStyle}
                onClick={() => setIsMobileMenuOpen(false)}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = navButtonStyle.backgroundColor;
                  e.currentTarget.style.color = navButtonStyle.color;
                  e.currentTarget.style.boxShadow = navButtonStyle.boxShadow;
                  e.currentTarget.style.textShadow = navButtonStyle.textShadow;
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Close button */}
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            color: '#00ffcc',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '0.9rem',
            opacity: '0.7',
            letterSpacing: '1px'
          }}>
            TAP ANYWHERE TO CLOSE
          </div>
        </div>
      )}

      {/* Mobile menu backdrop */}
      {isMobile && isMobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 999,
            cursor: 'pointer'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
