export function generateRandomArray(
  size: number,
  min: number,
  max: number,
): number[] {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min,
  );
}
