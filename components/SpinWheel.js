'use client';
import { useRef, useEffect, useCallback } from 'react';

// Convert hsl string "hsl(H, S%, L%)" to rgba with alpha
function hslToRgba(hslStr, alpha) {
  const m = hslStr.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!m) return `rgba(200,200,200,${alpha})`;
  let h = parseInt(m[1]) / 360;
  let s = parseInt(m[2]) / 100;
  let l = parseInt(m[3]) / 100;
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return `rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},${alpha})`;
}

// Parse any color (hex or hsl) to rgba string with given alpha
function colorWithAlpha(color, alpha) {
  if (color.startsWith('hsl')) return hslToRgba(color, alpha);
  // hex like #rrggbb
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0,2), 16);
    const g = parseInt(hex.slice(2,4), 16);
    const b = parseInt(hex.slice(4,6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return `rgba(200,200,200,${alpha})`;
}

export default function SpinWheel({ segments, onLanded, spinning, targetIndex }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const angleRef = useRef(0);
  const onLandedRef = useRef(onLanded);
  onLandedRef.current = onLanded;

  const safeTarget = !segments || segments.length === 0 ? 0
    : Math.max(0, Math.min(targetIndex ?? 0, segments.length - 1));

  const draw = useCallback((angle) => {
    const canvas = canvasRef.current;
    if (!canvas || !segments || segments.length === 0) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = Math.min(cx, cy) - 14;
    const n = segments.length;
    const arc = (2 * Math.PI) / n;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Outer glow
    const glowGrad = ctx.createRadialGradient(cx, cy, r - 8, cx, cy, r + 16);
    glowGrad.addColorStop(0, 'rgba(255,255,255,0.08)');
    glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, r + 14, 0, 2 * Math.PI);
    ctx.fillStyle = glowGrad;
    ctx.fill();

    // Segments
    segments.forEach((seg, i) => {
      const startAngle = angle + i * arc;
      const endAngle = startAngle + arc;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.closePath();

      const c0 = colorWithAlpha(seg.color, 0.13);
      const c1 = colorWithAlpha(seg.color, 0.6);
      const segGrad = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
      segGrad.addColorStop(0, c0);
      segGrad.addColorStop(1, c1);
      ctx.fillStyle = segGrad;
      ctx.fill();

      ctx.strokeStyle = colorWithAlpha(seg.color, 0.8);
      ctx.lineWidth = 1.5;
      ctx.shadowColor = seg.glow;
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Label
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startAngle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = seg.glow;
      ctx.shadowBlur = 10;
      const fontSize = Math.max(9, Math.min(14, Math.floor(r / (n * 0.85))));
      ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
      ctx.fillText(seg.label, r - 10, 4);
      ctx.restore();
    });

    // Center hub
    const hub = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26);
    hub.addColorStop(0, '#ffffff');
    hub.addColorStop(0.4, '#cccccc');
    hub.addColorStop(1, '#333333');
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, 2 * Math.PI);
    ctx.fillStyle = hub;
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#0a0a12';
    ctx.fill();

    // Pointer
    ctx.save();
    ctx.translate(cx, 6);
    ctx.beginPath();
    ctx.moveTo(0, 4);
    ctx.lineTo(-13, -14);
    ctx.lineTo(13, -14);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.restore();
  }, [segments]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = Math.min(window.innerWidth - 40, 480);
    canvas.width = size;
    canvas.height = size;
    draw(angleRef.current);
  }, [draw]);

  useEffect(() => {
    if (!spinning || !segments || segments.length === 0) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const arc = (2 * Math.PI) / segments.length;
    const spins = 6 + Math.random() * 4;
    const rawTarget = -Math.PI / 2 - arc / 2 - safeTarget * arc;
    const finalAngle = rawTarget + Math.ceil(spins) * 2 * Math.PI;
    const startAngle = angleRef.current;
    const delta = finalAngle - startAngle;
    const duration = 4000 + Math.random() * 1500;
    const start = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    const animate = (now) => {
      const t = Math.min((now - start) / duration, 1);
      angleRef.current = startAngle + delta * easeOut(t);
      draw(angleRef.current);
      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        angleRef.current = finalAngle;
        onLandedRef.current(safeTarget);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [spinning, safeTarget, segments, draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', margin: '0 auto', borderRadius: '50%' }}
    />
  );
}
