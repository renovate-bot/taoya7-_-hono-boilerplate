import { describe, expect, it } from 'vitest'
import app from '@/app'
import { config } from '@/config'

describe('registry', () => {
  it(`/`, async () => {
    const response = await app.request('/')
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('text/html; charset=UTF-8')
    expect(response.headers.get('cache-control')).toBe('no-cache')
  })
  // robots.txt
  it('/robots.txt', async () => {
    config.server.seo.allowRobot = false
    const response404 = await app.request('/robots.txt')
    expect(response404.status).toBe(404)

    config.server.seo.allowRobot = true
    const response = await app.request('/robots.txt')
    expect(response.status).toBe(200)

    expect(await response.text()).toBe('User-agent: *\nDisallow: /')
    expect(response.headers.get('content-type')).toBe('text/plain;charset=UTF-8')
  })
  // 生成 // https://www.logosc.cn/favicon-generator
  it('/favicon.ico', async () => {
    const response = await app.request('/favicon.ico')
    expect(response.status).toBe(200)
  })
})
