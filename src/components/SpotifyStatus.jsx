import { useState, useEffect, useRef } from 'react';

const playlist = [
  { title: "Mist", artist: "Esdee Kid", src: "/Mist.mp3" },
  { title: "In the Pool", artist: "Kensuke Ushio — Chainsaw Man OST", src: "/in_the_pool.mp3" }
];
let currentAudio = null;
let currentSong = null;
let currentIndex = 0;

const getRandomSong = () => {
  if (currentSong === null) return playlist[currentIndex];
  const available = playlist.filter(s => s !== currentSong);
  return available[Math.floor(Math.random() * available.length)];
};

export default function SpotifyStatus() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSong, setActiveSong] = useState(playlist[0]);
  const popupRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => {
      clearTimeout(timer);
      if (currentAudio) {
        currentAudio.pause();
      }
    };
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

  const toggleAudio = () => {
    if (isPlaying) {
      if (currentAudio) currentAudio.pause();
      setIsPlaying(false);
    } else {
      const song = getRandomSong();
      
      if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
      }
      
      currentAudio = new Audio(song.src);
      currentAudio.loop = true;
      currentAudio.volume = 1;
      
      currentSong = song;
      setActiveSong(song);
      
      currentAudio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.error('Audio play failed:', err));
    }
  };

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
      <div className={`spotify-popup ${isOpen ? 'open' : ''}`}>
        <div className="flex items-start gap-3">
          <div className="spotify-icon-large">
            <span>🎵</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="spotify-song-title">{activeSong.title}</span>
              <div className={`spotify-equalizer ${isPlaying ? 'active' : ''}`}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </div>
            <p className="spotify-artist">{activeSong.artist}</p>
            <button 
              className="spotify-play-btn cursor-hover"
              onClick={toggleAudio}
            >
              {isPlaying ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                  Now playing...
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Play track
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button 
        className={`spotify-trigger-btn cursor-hover ${isPlaying ? 'playing' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ fontSize: '12px' }}>🎵</span>
        <span>what I'm listening to</span>
      </button>
    </div>
  );
}
