import { format, add, parse, parseISO } from "date-fns";

export interface TimeOptions {
  displayTime: string
  isoTime: string
}

export function createTimeOptions(minuteStep: number): TimeOptions[] {
  let totalTime = 0
  let dateTime = parse('00:00:00', 'HH:mm:ss', new Date())
  const options = []

  while (totalTime < 60 * 24) {
    const displayTime = dateTime
    const isoTime = `${format(dateTime, 'HH:mm:ss')}`
    options.push({isoTime, displayTime})
    totalTime += minuteStep
    dateTime = add(dateTime, {minutes: 15})
  }
  return options
}
