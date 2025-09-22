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
  format?: string
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
    format: undefined,
  }

  constructor(settings: Partial<UtcTimeSettings>) {
    Object.assign(this.defaultSettings, settings)
    const loop = () => {
      this.initTime(this.defaultSettings)
      if (!this.defaultSettings.disableAutoUpdate) {
        setTimeout(loop, 1000)
      }
    }
    loop()

    document
      .querySelectorAll('*[' + this.defaultSettings.attr + ']')
      .forEach((timeField) => {
        const sourceValue = timeField.getAttribute(this.defaultSettings.attr)
        if (sourceValue) {
          const date = this.getDate(sourceValue)
          this.defaultSettings.onSet(timeField, date)
        }
      })
  }

  formatDate(date: Date, format: string): string {
    const pad = (n: number) => (n < 10 ? '0' + n : n.toString())
    const replacements: { [key: string]: string } = {
      YYYY: date.getUTCFullYear().toString(),
      MM: pad(date.getUTCMonth() + 1),
      DD: pad(date.getUTCDate()),
      HH: pad(date.getUTCHours()),
      mm: pad(date.getUTCMinutes()),
      ss: pad(date.getUTCSeconds()),
    }

    return format.replace(
      /YYYY|MM|DD|HH|mm|ss/g,
      (match) => replacements[match],
    )
  }

  timeSince(date: Date, settings: UtcTimeSettings): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    let interval = Math.floor(seconds / 2592000) // 30 days
    if (interval >= 1) {
      return settings.format
        ? this.formatDate(date, settings.format)
        : date.toLocaleString()
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
    if (seconds >= 0) {
      return Math.floor(seconds) + settings.secondsAgo
    } else {
      return settings.format
        ? this.formatDate(date, settings.format)
        : date.toLocaleString()
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

  initTime(settings: UtcTimeSettings): void {
    document
      .querySelectorAll('*[' + settings.attr + ']')
      .forEach((timeField) => {
        const sourceValue = timeField.getAttribute(settings.attr)
        if (!sourceValue) return

        const date = this.getDate(sourceValue)
        let text: string

        // 修改：核心逻辑更新
        if (settings.format) {
          // 1. 如果提供了 format，则拥有最高优先级
          text = this.formatDate(date, settings.format)
        } else if (settings.disableAgo) {
          // 2. 如果禁用了相对时间，则使用本地化日期
          text = date.toLocaleString()
        } else {
          // 3. 否则，计算相对时间
          text = this.timeSince(date, settings)
        }

        timeField.innerHTML = text
      })
  }
}

export default UtcTime
