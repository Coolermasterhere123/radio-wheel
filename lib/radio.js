const RB = 'https://de1.api.radio-browser.info/json';

/** GPS-based local stations via Radio Browser */
export async function fetchLocalStations(lat, lng, radiusKm = 200, limit = 80) {
  try {
    const res = await fetch(
      `${RB}/stations/search?limit=${limit}&order=votes&reverse=true&hidebroken=true&geo_lat=${lat}&geo_long=${lng}&geo_distance=${radiusKm * 1000}`,
      { headers: { 'User-Agent': 'RadioWheelApp/1.0' } }
    );
    return (await res.json()).filter(s => s.url_resolved && s.name);
  } catch { return []; }
}

/** ICY metadata via server-side proxy */
export async function fetchIcyTitle(streamUrl) {
  try {
    const res = await fetch(
      `/api/icy?url=${encodeURIComponent(streamUrl)}`,
      { signal: AbortSignal.timeout(10000) }
    );
    const data = await res.json();
    return data.title || null;
  } catch { return null; }
}
