'use client';

export default function StationList({ stations, genre, activeStation, favorites, onPick, onFav, loading }) {
  if (loading) {
    return (
      <div className="loading-stations" style={{ color: genre?.glow || '#888', animation: 'pulse 1.5s infinite' }}>
        ⏳ Loading {genre?.label} stations...
      </div>
    );
  }
  if (!stations.length) {
    return <div className="loading-stations" style={{ color: '#e53e3e' }}>⚠ No stations found</div>;
  }

  const isFavStation = s => favorites.some(f => f.stationuuid === s.stationuuid);
  const isActive     = s => activeStation?.stationuuid === s.stationuuid;

  return (
    <>
      <div className="station-count">{stations.length} stations</div>
      <div className="station-list">
        {stations.map(station => {
          const active = isActive(station);
          const fav    = isFavStation(station);
          return (
            <div
              key={station.stationuuid}
              className={`station-item${active ? ' active' : ''}`}
              style={active ? { borderColor: genre?.color || '#f5a623', color: genre?.color || '#f5a623' } : {}}
              onClick={() => onPick(station)}
            >
              <div
                className={`station-dot${active ? ' pulse' : ''}`}
                style={{
                  background: genre?.color || '#888',
                  boxShadow: active ? `0 0 10px ${genre?.glow || '#888'}` : 'none',
                }}
              />
              <div className="station-info">
                <div className="station-name">{station.name}</div>
                <div className="station-meta">
                  {[station.country, station.codec, station.bitrate ? `${station.bitrate}k` : null]
                    .filter(Boolean).join(' · ')}
                </div>
                {station._nowPlaying && (
                  <div className="station-now-playing has-track">♪ {station._nowPlaying}</div>
                )}
              </div>
              <button
                className={`station-fav${fav ? ' saved' : ''}`}
                onClick={e => { e.stopPropagation(); onFav(station); }}
              >
                {fav ? '⭐' : '☆'}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
