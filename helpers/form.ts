import {to_cent} from "~/helpers/monetery";

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

export function removeCommas(strNumber: string, format_to_cent: boolean = false): Number {
  const num = parseInt(strNumber.replaceAll(',', ''))
  return format_to_cent ? to_cent(num) : num
}

export function formatInputValue(number: string): string {
  if (!number.length) return ''
  return formatNumber(removeCommas(number).toString())
}
