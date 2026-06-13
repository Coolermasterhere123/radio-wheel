'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import AudioPlayer from '../components/AudioPlayer';
import PlayerBar from '../components/PlayerBar';
import StationList from '../components/StationList';
import NowPlayingHero from '../components/NowPlayingHero';
import { CURATED_GENRES, LOCAL_GENRE } from '../lib/stations';
import { fetchLocalStations, fetchIcyTitle } from '../lib/radio';

const FAV_KEY = 'radiowheel_favorites_v4';

function loadFavorites() {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch { return []; }
}
function saveFavorites(f) { try { localStorage.setItem(FAV_KEY, JSON.stringify(f)); } catch {} }

function normalizeStation(s, genre) {
  return {
    stationuuid: s.stationuuid || s.url,
    name: s.name,
    url_resolved: s.url || s.url_resolved,
    country: s.country || '',
    codec: s.codec || '',
    bitrate: s.bitrate || 0,
    homepage: s.homepage || '',
    _genre: genre.label,
    _genreColor: genre.color,
    _genreGlow: genre.glow,
  };
}

export default function Home() {
  const [view, setView] = useState('genres');
  const [showHero, setShowHero] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [stations, setStations] = useState([]);
  const [loadingStations, setLoadingStations] = useState(false);
  const [activeStation, setActiveStation] = useState(null);
  const [playerStatus, setPlayerStatus] = useState('idle');
  const [volume, setVolume] = useState(0.8);
  const [favorites, setFavorites] = useState([]);
  const [nowPlayingMap, setNowPlayingMap] = useState({});
  const [geoStatus, setGeoStatus] = useState('idle');
  const [userCoords, setUserCoords] = useState(null);

  const stationsRef      = useRef([]);
  const activeStationRef = useRef(null);

  useEffect(() => { stationsRef.current = stations; }, [stations]);
  useEffect(() => { activeStationRef.current = activeStation; }, [activeStation]);

  useEffect(() => {
    setFavorites(loadFavorites());
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
  }, []);

  // ── Navigation ──────────────────────────────────────────────────────────
  const goToStation = useCallback((station) => {
    setActiveStation(station);
    setPlayerStatus('loading');
    setShowHero(true);
  }, []);

  const goPrev = useCallback(() => {
    const list = stationsRef.current;
    if (!list.length) return;
    const idx = list.findIndex(s => s.stationuuid === activeStationRef.current?.stationuuid);
    goToStation(list[(idx - 1 + list.length) % list.length]);
  }, [goToStation]);

  const goNext = useCallback(() => {
    const list = stationsRef.current;
    if (!list.length) return;
    const idx = list.findIndex(s => s.stationuuid === activeStationRef.current?.stationuuid);
    goToStation(list[(idx + 1) % list.length]);
  }, [goToStation]);

  // ── MediaSession (Bluetooth car) ────────────────────────────────────────
  useEffect(() => {
    if (!activeStation || typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    const ms = navigator.mediaSession;
    const track = nowPlayingMap[activeStation.stationuuid];
    ms.metadata = new MediaMetadata({
      title:   track || activeStation.name,
      artist:  activeStation._genre || 'Radio Wheel',
      album:   activeStation.country || 'Live Radio',
      artwork: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    });
    ms.playbackState = playerStatus === 'playing' ? 'playing' : 'paused';
    ms.setActionHandler('previoustrack', goPrev);
    ms.setActionHandler('nexttrack',     goNext);
    ms.setActionHandler('play',  () => {});
    ms.setActionHandler('pause', () => {});
    return () => {
      try { ['previoustrack','nexttrack','play','pause'].forEach(a => ms.setActionHandler(a, null)); } catch {}
    };
  }, [activeStation, playerStatus, nowPlayingMap, goPrev, goNext]);

  // ── Audio status ────────────────────────────────────────────────────────
  const handleStatus = useCallback((s) => {
    setPlayerStatus(s);
    if (s === 'error') setTimeout(() => goNext(), 1500);
  }, [goNext]);

  // ── Genre pick — instant, no resolver needed ────────────────────────────
  const pickGenre = useCallback((genre) => {
    setSelectedGenre(genre);
    setView('stations');
    setActiveStation(null);
    setShowHero(false);
    setNowPlayingMap({});
    setStations(genre.stations.map(s => normalizeStation(s, genre)));
  }, []);

  // ── Local / GPS ─────────────────────────────────────────────────────────
  const pickLocal = useCallback(async () => {
    setGeoStatus('locating');
    setSelectedGenre(LOCAL_GENRE);
    setView('stations');
    setActiveStation(null);
    setShowHero(false);
    setStations([]);
    setLoadingStations(true);
    setNowPlayingMap({});

    try {
      let coords = userCoords;
      if (!coords) {
        const pos = await new Promise((res, rej) =>
          navigator.geolocation.getCurrentPosition(res, rej, { timeout: 10000 })
        );
        coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserCoords(coords);
      }
      setGeoStatus('ok');
      const fetched = await fetchLocalStations(coords.lat, coords.lng, 200, 80);
      setStations(fetched.map(s => ({
        stationuuid: s.stationuuid,
        name: s.name,
        url_resolved: s.url_resolved,
        country: s.country || '',
        codec: s.codec || '',
        bitrate: s.bitrate || 0,
        homepage: s.homepage || '',
        _genre: 'Local',
        _genreColor: LOCAL_GENRE.color,
        _genreGlow: LOCAL_GENRE.glow,
      })));
    } catch {
      setGeoStatus('denied');
      setStations([]);
    }
    setLoadingStations(false);
  }, [userCoords]);

  // ── ICY metadata polling ────────────────────────────────────────────────
  useEffect(() => {
    if (!activeStation?.url_resolved) return;
    let alive = true;
    const poll = async () => {
      const title = await fetchIcyTitle(activeStation.url_resolved);
      if (alive && title) setNowPlayingMap(prev => ({ ...prev, [activeStation.stationuuid]: title }));
    };
    const t1 = setTimeout(poll, 3000);
    const t2 = setInterval(poll, 20000);
    return () => { alive = false; clearTimeout(t1); clearInterval(t2); };
  }, [activeStation]);

  // ── Favorites ───────────────────────────────────────────────────────────
  const toggleFav = useCallback((station) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.stationuuid === station.stationuuid);
      const next = exists
        ? prev.filter(f => f.stationuuid !== station.stationuuid)
        : [...prev, station];
      saveFavorites(next);
      return next;
    });
  }, []);

  const playFavorite = useCallback((fav) => {
    const genre = CURATED_GENRES.find(g => g.label === fav._genre)
      || (fav._genre === 'Local' ? LOCAL_GENRE : null)
      || { label: fav._genre, color: fav._genreColor || '#888', glow: fav._genreGlow || '#888' };
    setSelectedGenre(genre);
    goToStation(fav);
  }, [goToStation]);

  const removeFav = useCallback((uuid, e) => {
    e.stopPropagation();
    setFavorites(prev => { const n = prev.filter(f => f.stationuuid !== uuid); saveFavorites(n); return n; });
  }, []);

  const isFav = activeStation ? favorites.some(f => f.stationuuid === activeStation.stationuuid) : false;
  const stationsWithMeta = stations.map(s => ({ ...s, _nowPlaying: nowPlayingMap[s.stationuuid] || null }));
  const activeWithMeta   = activeStation ? { ...activeStation, _nowPlaying: nowPlayingMap[activeStation.stationuuid] || null } : null;
  const activeGenre      = selectedGenre || (activeStation ? CURATED_GENRES.find(g => g.label === activeStation._genre) || LOCAL_GENRE : null);

  return (
    <>
      <AudioPlayer station={activeStation} volume={volume} onStatus={handleStatus} />

      {showHero && activeStation && (
        <NowPlayingHero
          station={activeWithMeta}
          genre={activeGenre}
          status={playerStatus}
          nowPlaying={activeWithMeta?._nowPlaying}
          isFav={isFav}
          onFav={() => toggleFav(activeStation)}
          onPrev={goPrev}
          onNext={goNext}
          onDismiss={() => setShowHero(false)}
        />
      )}

      {!showHero && (
        <main>
          <header>
            <h1 className="logo">
              <span className="logo-icon">📻</span>
              <span className="logo-text">RADIO<span className="logo-accent">WHEEL</span></span>
            </h1>
            <p className="tagline">Discover the world.</p>
          </header>

          {view === 'genres' && (
            <>
              <div className="section-label">Choose a genre</div>
              <div className="genre-grid">
                <button
                  className="genre-btn local-btn"
                  onClick={pickLocal}
                  disabled={geoStatus === 'locating'}
                  style={{
                    borderColor: LOCAL_GENRE.color + '99',
                    color: LOCAL_GENRE.color,
                    boxShadow: `0 0 16px ${LOCAL_GENRE.color}22`,
                    opacity: geoStatus === 'locating' ? 0.7 : 1,
                  }}
                >
                  {geoStatus === 'locating' ? '⏳ LOCATING...' :
                   geoStatus === 'denied'   ? '📍 LOCAL (denied)' : '📍 LOCAL'}
                  <span className="local-locating">
                    {geoStatus === 'ok'     ? 'stations within 200 km of you' :
                     geoStatus === 'denied' ? 'location access was denied' :
                     'tap to find stations near you'}
                  </span>
                </button>

                {CURATED_GENRES.map(g => (
                  <button
                    key={g.id}
                    className="genre-btn"
                    onClick={() => pickGenre(g)}
                    style={{ borderColor: g.color + '99', color: g.color, boxShadow: `0 0 12px ${g.color}18` }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              {favorites.length > 0 && (
                <div className="fav-section">
                  <div className="fav-title">⭐ Favorites</div>
                  <div className="station-list">
                    {favorites.map(fav => (
                      <div
                        key={fav.stationuuid}
                        className={`station-item${activeStation?.stationuuid === fav.stationuuid ? ' active' : ''}`}
                        style={activeStation?.stationuuid === fav.stationuuid
                          ? { borderColor: fav._genreColor, color: fav._genreColor } : {}}
                        onClick={() => playFavorite(fav)}
                      >
                        <div
                          className={`station-dot${activeStation?.stationuuid === fav.stationuuid ? ' pulse' : ''}`}
                          style={{ background: fav._genreColor, boxShadow: `0 0 6px ${fav._genreColor}` }}
                        />
                        <div className="station-info">
                          <div className="station-name">{fav.name}</div>
                          <div className="station-meta">{fav._genre}{fav.country ? ` · ${fav.country}` : ''}</div>
                          {nowPlayingMap[fav.stationuuid] && (
                            <div className="station-now-playing has-track">♪ {nowPlayingMap[fav.stationuuid]}</div>
                          )}
                        </div>
                        <button className="station-fav saved" onClick={e => removeFav(fav.stationuuid, e)}>⭐</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {view === 'stations' && (
            <>
              <div className="stations-header">
                <button className="back-btn" onClick={() => setView('genres')}>← GENRES</button>
                <div className="stations-title" style={{ color: activeGenre?.glow, textShadow: `0 0 12px ${activeGenre?.glow}` }}>
                  {activeGenre?.label}
                </div>
                <div style={{ width: 90 }} />
              </div>
              <StationList
                stations={stationsWithMeta}
                genre={activeGenre}
                activeStation={activeStation}
                favorites={favorites}
                loading={loadingStations}
                onPick={s => goToStation(s)}
                onFav={toggleFav}
              />
            </>
          )}
        </main>
      )}

      {!showHero && (
        <PlayerBar
          station={activeWithMeta}
          genre={activeGenre}
          status={playerStatus}
          volume={volume}
          setVolume={setVolume}
          isFav={isFav}
          onFav={() => activeStation && toggleFav(activeStation)}
          onClick={() => activeStation && setShowHero(true)}
        />
      )}
    </>
  );
}
