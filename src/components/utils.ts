export function range(startNumber: number, endNumber: number): number[] {
  let pages: number[] = [];

  for (let count = startNumber; count <= endNumber; count++) pages.push(count);

  return pages;
}

export function paginate<T>(
  items: T[],
  pageSize: number,
  selectedPage: number
) {
  const startNumber = pageSize * (selectedPage - 1);
  const endNumber = pageSize * selectedPage;

  return items.slice(startNumber, endNumber);
}

export function formatHMS(totalSeconds: number) {
  const abs = Math.abs(totalSeconds);
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = Math.floor(abs % 60);
  return `${h}h ${m}m ${s}s`;
}
