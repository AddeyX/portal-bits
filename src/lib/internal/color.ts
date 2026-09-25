export function normalizeHex(value: string): string | null {
  const hex = value.trim().replace(/^#/, '');
  if (/^[\da-f]{3}$/i.test(hex))
    return (
      '#' +
      [...hex]
        .map((c) => c + c)
        .join('')
        .toLowerCase()
    );
  return /^[\da-f]{6}$/i.test(hex) ? '#' + hex.toLowerCase() : null;
}

export function toHsv(hex: string) {
  const color = normalizeHex(hex) ?? '#19e783';
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    delta = max - min;
  const hue = !delta
    ? 0
    : max === r
      ? ((g - b) / delta) % 6
      : max === g
        ? (b - r) / delta + 2
        : (r - g) / delta + 4;
  return { h: (hue * 60 + 360) % 360, s: max ? (delta / max) * 100 : 0, v: max * 100 };
}

export function fromHsv(h: number, s: number, v: number) {
  const saturation = s / 100,
    brightness = v / 100;
  const channel = (n: number) => {
    const k = (n + h / 60) % 6;
    return Math.round(255 * brightness * (1 - saturation * Math.max(0, Math.min(k, 4 - k, 1))))
      .toString(16)
      .padStart(2, '0');
  };
  return '#' + channel(5) + channel(3) + channel(1);
}

export function accentForeground(hex: string) {
  const color = normalizeHex(hex) ?? '#19e783';
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(color.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return r * 0.2126 + g * 0.7152 + b * 0.0722 > 0.179 ? '#000000' : '#ffffff';
}
