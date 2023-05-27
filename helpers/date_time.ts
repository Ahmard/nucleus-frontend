export function getMonthName(month: number): string {
  const date = new Date();
  date.setMonth(month);
  return date.toLocaleString("default", {month: "long"});
}

export function generateMonthOptions() {
  const months = [];

  for (let i = 1; i <= 12; i++) {
    months.push({
      id: i,
      text: getMonthName(i - 1)
    })
  }

  return months
}
