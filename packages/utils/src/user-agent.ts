import helper from './helper'

const WhichBrowser = require('which-browser')

enum PlatformType {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
  TABLET = 'tablet',
  OTHER = 'other',
}

interface UserAgent {
  browser: {
    name: string
    version: string
  }
  os: {
    name: string
    version: string
  }
  platform: {
    type: string
    model: string
    manufacturer: string
  }
}

export function parseUserAgent(userAgent: string): UserAgent {
  const { browser, device, os } = new (WhichBrowser as any)(userAgent)

  return {
    browser: {
      name: helper.isValid(browser.name) ? browser.name : PlatformType.OTHER,
      version: helper.isValid(browser.version?.value) ? browser.version?.value : PlatformType.OTHER,
    },
    os: {
      name: helper.isValid(os.name) ? os.name : PlatformType.OTHER,
      version: helper.isValid(os.version?.value) ? os.version?.value : PlatformType.OTHER,
    },
    platform: {
      type: Object.values(PlatformType).includes(device.type) ? device.type : PlatformType.OTHER,
      model: helper.isValid(device.model) ? device.model : PlatformType.OTHER,
      manufacturer: device.manufacturer,
    },
  }
}
