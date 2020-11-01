import { createTimeOptions } from "./time-options";

describe('createTimeOptions', () => {
  xit('returns an array of time options, starting from zero up to 24h bases on the step count', () => {
    const results = createTimeOptions(15)
    expect(results.slice(0, 3)).toEqual([
      { displayTime: '12:00 AM', isoTime: '00:00:00' },
      { displayTime: '12:15 AM', isoTime: '00:15:00' },
      { displayTime: '12:30 AM', isoTime: '00:30:00' }
    ])

    expect(results.slice(4, 8)).toEqual([
      { displayTime: '1:00 AM', isoTime: '01:00:00' },
      { displayTime: '1:15 AM', isoTime: '01:15:00' },
      { displayTime: '1:30 AM', isoTime: '01:30:00' },
      { displayTime: '1:45 AM', isoTime: '01:45:00' }
    ])

    expect(results.slice(60, 64)).toEqual([
      { displayTime: '3:00 PM', isoTime: '15:00:00' },
      { displayTime: '3:15 PM', isoTime: '15:15:00' },
      { displayTime: '3:30 PM', isoTime: '15:30:00' },
      { displayTime: '3:45 PM', isoTime: '15:45:00' }
    ])

    expect(results.length).toEqual(4 * 24)
  })
})
