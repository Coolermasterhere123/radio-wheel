'use client';
import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

// Exposes { status } via ref, handles playback side-effects only
const AudioPlayer = forwardRef(function AudioPlayer({ station, volume, onStatus }, ref) {
  const audioRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getAudio: () => audioRef.current,
  }));

  useEffect(() => {
    if (!station?.url_resolved) return;
    const audio = audioRef.current;
    if (!audio) return;

    onStatus('loading');
    audio.src = station.url_resolved;
    audio.volume = volume;

    const onPlaying = () => onStatus('playing');
    const onError = () => onStatus('error');
    const onStalled = () => onStatus('loading');

    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('error', onError);
    audio.addEventListener('stalled', onStalled);
    audio.play().catch(() => onStatus('error'));

    return () => {
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('stalled', onStalled);
      audio.pause();
      audio.src = '';
    };
  }, [station]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  return <audio ref={audioRef} />;
});

export default AudioPlayer;
