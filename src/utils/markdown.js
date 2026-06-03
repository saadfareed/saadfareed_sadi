export const stripHtml = html =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const buildOpenSourceMetrics = (tech = [], year) => {
  const metrics = [
    { value: year, label: 'Year' },
    { value: 'Open Source', label: 'Type' },
  ];

  tech.slice(0, 2).forEach((item, index) => {
    metrics.push({ value: item, label: index === 0 ? 'Primary Stack' : 'Tools' });
  });

  while (metrics.length < 4) {
    metrics.push({ value: 'Public', label: 'Availability' });
    break;
  }

  return metrics.slice(0, 4);
};
