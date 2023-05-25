export function date_shortcut() {
  return [
    {
      text: 'Today',
      value: new Date(),
    },
    {
      text: 'Yesterday',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        return date
      },
    },
    {
      text: 'A week ago',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        return date
      },
    },
  ]
}


export function formatNumber(number: string): string {
  let formatted = parseInt(number).toLocaleString();

  if ('NaN' === formatted.toString()) {
    return ''
  }

  return formatted
}

export function removeCommas(strNumber: string): Number {
  return parseInt(strNumber.replaceAll(',', ''))
}

export function formatInputValue(number: string): string {
  if (!number.length) return ''
  return formatNumber(removeCommas(number).toString())
}
