export const arabicPlurals = (choice: number): number => {
  if (choice === 0) {
    return 0 // Zero times
  }
  if (choice === 1) {
    return 1 // One Time
  }
  if (choice === 2) {
    return 2 // Two Times
  }
  if (choice >= 3 && choice <= 10) {
    return 3 // Many Times (3-10)
  }
  return 4 // 11 and above
}