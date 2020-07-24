export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomItems<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

