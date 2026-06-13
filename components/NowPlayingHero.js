'use client';

export default function NowPlayingHero({
  station, genre, status, nowPlaying,
  onPrev, onNext, onFav, isFav, onDismiss
}) {
  const color = genre?.color || '#f5a623';
  const glow  = genre?.glow  || '#f5a623';

  const statusText =
    status === 'playing' ? '▶  ON AIR' :
    status === 'loading' ? '⏳  TUNING IN...' :
    status === 'error'   ? '⚠  SIGNAL LOST' : '';

  const statusColor =
    status === 'playing' ? '#48bb78' :
    status === 'loading' ? '#f5a623' : '#e53e3e';

  // Double the text for seamless looping ticker
  const tickerText = nowPlaying ? `♪  ${nowPlaying}  ·  ` : null;

  return (
    <div className="now-playing-hero">
      <div className="hero-genre" style={{ color: glow, textShadow: `0 0 16px ${glow}` }}>
        {genre?.label?.toUpperCase() || ''}
      </div>

      <div
        className={`hero-dot${status === 'playing' ? ' pulse' : ''}`}
        style={{ background: color, boxShadow: `0 0 20px ${glow}` }}
      />

      <div className="hero-station-name">{station?.name || ''}</div>

      {station?.country && (
        <div className="hero-country">📍 {station.country}</div>
      )}

      <div className="ticker-wrap">
        {tickerText ? (
          <div className="ticker-track">
            {/* Duplicate for seamless loop */}
            <span className="ticker-text" style={{ color: glow }}>{tickerText}</span>
            <span className="ticker-text" style={{ color: glow }}>{tickerText}</span>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <span className="ticker-idle">
              {status === 'playing' ? 'live stream — no track metadata' :
               status === 'loading' ? 'tuning in...' : 'signal lost — trying next...'}
            </span>
          </div>
        )}
      </div>

      <div className="hero-status" style={{ color: statusColor }}>{statusText}</div>

      <div className="hero-controls">
        <button className="hero-nav-btn" onClick={onPrev} title="Previous station">⏮</button>
        <button className={`hero-fav-btn${isFav ? ' saved' : ''}`} onClick={onFav}>
          {isFav ? '⭐ SAVED' : '☆ FAVORITE'}
        </button>
        <button className="hero-nav-btn" onClick={onNext} title="Next station">⏭</button>
      </div>

      <button className="hero-back-btn" onClick={onDismiss}>↩ STATION LIST</button>
    </div>
  );
}
