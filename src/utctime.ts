/* eslint-disable @typescript-eslint/no-unused-vars */
interface UtcTimeSettings {
  attr: string
  daysAgo: string
  hoursAgo: string
  minutesAgo: string
  secondsAgo: string
  disableAgo: boolean
  onSet: (obj: Element, date: Date) => void
  disableAutoUpdate: boolean
}

class UtcTime {
  defaultSettings: UtcTimeSettings = {
    attr: 'data-utc-time',
    daysAgo: ' days ago',
    hoursAgo: ' hours ago',
    minutesAgo: ' minutes ago',
    secondsAgo: ' seconds ago',
    disableAgo: false,
    onSet: function (obj: Element) {},
    disableAutoUpdate: false,
  }

  constructor(settings: UtcTimeSettings) {
    Object.assign(this.defaultSettings, settings)
    const loop = () => {
      this.initTime(this.defaultSettings)
      if (!this.defaultSettings.disableAutoUpdate) {
        setTimeout(loop, 1000)
      }
    }
    loop()

    document
      .querySelectorAll('*[' + settings.attr + ']')
      .forEach((timeField) => {
        const sourceValue = timeField.getAttribute(settings.attr)
        const date = this.getDate(sourceValue!)
        settings.onSet(timeField, date)
      })
  }

  timeSince(date: Date, settings: typeof this.defaultSettings): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    let interval = Math.floor(seconds / 2592000)
    if (interval >= 1) {
      return date.toLocaleDateString()
    }
    interval = Math.floor(seconds / 86400)
    if (interval >= 1) {
      return interval + settings.daysAgo
    }
    interval = Math.floor(seconds / 3600)
    if (interval >= 1) {
      return interval + settings.hoursAgo
    }
    interval = Math.floor(seconds / 60)
    if (interval >= 1) {
      return interval + settings.minutesAgo
    }
    if (interval >= 0) {
      return Math.floor(seconds) + settings.secondsAgo
    } else {
      return date.toLocaleDateString()
    }
  }

  getDate(inputString: string): Date {
    if (inputString.endsWith(' UTC') || inputString.endsWith('Z')) {
      return new Date(inputString)
    }
    if (!inputString.endsWith(' UTC')) {
      const timeValue = inputString + ' UTC'
      const date = new Date(timeValue)
      if (!isNaN(date.getTime())) {
        return date
      }
    }
    if (!inputString.endsWith('Z')) {
      const timeValue = inputString + 'Z'
      const date = new Date(timeValue)
      if (!isNaN(date.getTime())) {
        return date
      }
    }
    console.warn(
      `jquery-utc-time: Input string ${inputString} can not be converted to UTC time and try to parse as typical date string.`,
    )
    return new Date(inputString)
  }

  initTime(settings: typeof this.defaultSettings): void {
    document
      .querySelectorAll('*[' + settings.attr + ']')
      .forEach((timeField) => {
        const sourceValue = timeField.getAttribute(settings.attr)
        const date = this.getDate(sourceValue!)
        let text = this.timeSince(date, settings)
        if (settings.disableAgo) {
          text = date.toLocaleDateString()
        }
        timeField.innerHTML = text
      })
  }
}

export default UtcTime
