import { useState, useEffect, useRef } from 'react';

export default function SpotifyStatus() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div 
      className="spotify-widget-container"
      style={{ 
        opacity: isVisible ? 1 : 0, 
        transition: 'opacity 0.5s ease',
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9999 
      }}
      ref={popupRef}
    >
      {/* Popup Card */}
      <div 
        className={`spotify-popup ${isOpen ? 'open' : ''}`}
        style={{
          boxSizing: 'border-box',
          padding: isOpen ? '12px' : '0px',
          width: '324px',
          height: isOpen ? '228px' : '0px',
          marginBottom: isOpen ? '12px' : '0px',
          overflow: 'hidden',
          border: isOpen ? '1px solid rgba(255,255,255,0.1)' : 'none',
          transition: 'height 0.3s ease-in-out, padding 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out, margin-bottom 0.3s ease-in-out, border 0.3s ease-in-out, visibility 0.3s',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <iframe 
          style={{ borderRadius: '12px', width: '100%', height: '152px', border: 'none', display: 'block', flexShrink: 0 }} 
          src="https://open.spotify.com/embed/playlist/2e8LcyrPTaU2dP4Y2kEShC?utm_source=generator&theme=0" 
          allowFullScreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        ></iframe>
        <button 
          onClick={() => setIsOpen(false)}
          className="cursor-hover"
          style={{
            background: 'rgba(255,255,255,0.05)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            width: '100%',
            height: '40px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'none',
            fontSize: '13px',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Close Player
        </button>
      </div>

      {/* Floating Button */}
      <button 
        className="spotify-trigger-btn cursor-hover"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Spotify Player"
      >
        <span style={{ fontSize: '12px' }}>🎵</span>
        <span>what I'm listening to</span>
      </button>
    </div>
  );
}
