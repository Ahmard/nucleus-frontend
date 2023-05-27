export function to_cent(number: number) {
  return number * 100
}

export function from_cent(number: number) {
  if (isNaN(number)) return 0;
  return number / 100
}

export function formatNumber(number: number, minFractionDigits: number = 2) {
  return Intl
    .NumberFormat('en-NG', {minimumFractionDigits: minFractionDigits})
    .format(number);
}

export function formatMoneyAmount(number: number, minFractionDigits: number = 2) {
  return new Intl.NumberFormat(`en-NG`, {
    currency: `NGN`,
    style: 'currency',
    minimumFractionDigits: minFractionDigits
  }).format(number)
}

export function formatKobo(
  number: number | string,
  minFractionDigits: number = 2,
  currency_symbol: string | null = null,
  default_val = 'N/A',
) {
  if (!number) {
    return default_val;
  }

  let normalized_number = parseInt(<string>number) / 100;

  if (currency_symbol) {
    return `${currency_symbol} ${formatNumber(normalized_number, minFractionDigits)}`
  }

  return formatMoneyAmount(normalized_number, minFractionDigits)
}

export function formatKoboNumber(number: number, minFractionDigits: number = 2) {
  return Intl
    .NumberFormat('en-NG', {minimumFractionDigits: minFractionDigits})
    .format(number / 100);
}

export function formatMoneyAmountDisplay(num: any, nairaSign: Boolean = false) {
  if (num === null) return 0;

  num = num.tostring().replace(/[^0-9.]/g, '');
  if (num < 1000) {
    return num;
  }
  let si = [
    {v: 1E3, s: "K"},
    {v: 1E6, s: "M"},
    {v: 1E9, s: "B"},
    {v: 1E12, s: "T"},
    {v: 1E15, s: "P"},
    {v: 1E18, s: "E"}
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    }
  }

  const formatted = (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;

  if (nairaSign) {
    let amount = formatted.slice(0, -1)
    let unit = formatted.slice(formatted.length - 2, 1)

    return formatMoneyAmount(parseInt(amount))
  }

  return formatted
}
