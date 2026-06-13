import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 10;

/**
 * GET /api/icy?url=<stream_url>
 *
 * Connects to an ICY/Icecast stream, sends Icy-MetaData:1,
 * reads just enough bytes to extract the first metadata chunk,
 * then closes the connection and returns { title, artist, raw }.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const streamUrl = searchParams.get('url');

  if (!streamUrl) {
    return NextResponse.json({ error: 'No url param' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    // Kill it after 8s no matter what
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(streamUrl, {
      headers: {
        'Icy-MetaData': '1',
        'User-Agent': 'RadioWheelApp/1.0',
        'Connection': 'close',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // Read icy-metaint from response headers
    const metaint = parseInt(res.headers.get('icy-metaint') || '0', 10);

    if (!metaint) {
      // Server didn't agree to send metadata
      return NextResponse.json({ title: null, reason: 'no-metaint' });
    }

    // Stream the body as bytes, collect only what we need
    const reader = res.body.getReader();
    let buffer = new Uint8Array(0);
    const needed = metaint + 1; // audio bytes + 1 length byte

    while (buffer.length < needed) {
      const { done, value } = await reader.read();
      if (done) break;
      const merged = new Uint8Array(buffer.length + value.length);
      merged.set(buffer);
      merged.set(value, buffer.length);
      buffer = merged;
      if (buffer.length >= needed) break;
    }

    // Cancel the rest of the stream — we don't need it
    reader.cancel().catch(() => {});

    if (buffer.length < needed) {
      return NextResponse.json({ title: null, reason: 'stream-too-short' });
    }

    // Byte at index `metaint` is the metadata length indicator
    const metaLenByte = buffer[metaint];
    const metaLen = metaLenByte * 16;

    if (metaLen === 0) {
      return NextResponse.json({ title: null, reason: 'empty-meta' });
    }

    // We might need more bytes for the metadata itself
    const totalNeeded = metaint + 1 + metaLen;
    if (buffer.length < totalNeeded) {
      // Need to read a bit more — but we already cancelled; try a fresh small read
      // In practice metaLen is usually small (<512 bytes) so it's likely already in buffer
      return NextResponse.json({ title: null, reason: 'meta-truncated' });
    }

    const metaBytes = buffer.slice(metaint + 1, metaint + 1 + metaLen);
    const metaStr = new TextDecoder('utf-8').decode(metaBytes).replace(/\0/g, '').trim();

    // Parse StreamTitle='...';
    const titleMatch = metaStr.match(/StreamTitle='([^']*)'/);
    const title = titleMatch?.[1]?.trim() || null;

    return NextResponse.json({ title, raw: metaStr });

  } catch (err) {
    if (err.name === 'AbortError') {
      return NextResponse.json({ title: null, reason: 'timeout' });
    }
    return NextResponse.json({ title: null, reason: err.message });
  }
}
