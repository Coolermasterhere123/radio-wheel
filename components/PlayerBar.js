'use client';

export default function PlayerBar({ station, genre, status, volume, setVolume, isFav, onFav, onClick }) {
  if (!station) return null;

  const dotColor = genre?.color || '#f5a623';
  const statusText =
    status === 'playing' ? '▶ ON AIR' :
    status === 'loading' ? '⏳' :
    status === 'error'   ? '⚠ LOST' : '';
  const statusColor =
    status === 'playing' ? '#48bb78' :
    status === 'loading' ? '#f5a623' :
    '#e53e3e';

  return (
    <div className="player-bar-wrap">
      <div className="player-bar-inner" onClick={onClick}>
        <div
          className="player-bar-dot"
          style={{ background: dotColor, boxShadow: `0 0 8px ${dotColor}` }}
        />
        <div className="player-bar-info">
          <div className="player-bar-name">{station.name}</div>
          <div className="player-bar-track">
            {station._nowPlaying
              ? `♪ ${station._nowPlaying}`
              : station.country
              ? `📍 ${station.country}${genre ? ` · ${genre.label}` : ''}`
              : genre?.label || ''}
          </div>
        </div>
        <div className="player-bar-status" style={{ color: statusColor }}>{statusText}</div>
        <div className="player-bar-vol" onClick={e => e.stopPropagation()}>
          <span className="vol-label">VOL</span>
          <input
            type="range" min="0" max="1" step="0.01"
            value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
            className="vol-slider"
          />
        </div>
        <button
          className={`station-fav${isFav ? ' saved' : ''}`}
          onClick={e => { e.stopPropagation(); onFav(); }}
        >
          {isFav ? '⭐' : '☆'}
        </button>
      </div>
    </div>
  );
}
