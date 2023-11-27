import got from 'got'
import type { FetchResponse, FetchOptions } from '@textshq/platform-sdk'

class Client {
  // eslint-disable-next-line class-methods-use-this
  async requestAsString(url: string, opts?: FetchOptions): Promise<FetchResponse<string>> {
    const response = await got({
      throwHttpErrors: false,
      url,
      ...opts,
      responseType: 'text',
    })
    return {
      statusCode: response.statusCode,
      headers: response.headers,
      body: response.body,
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async requestAsBuffer(url: string, opts?: FetchOptions): Promise<FetchResponse<Buffer>> {
    const response = await got({
      throwHttpErrors: false,
      url,
      ...opts,
      responseType: 'buffer',
    })
    return {
      statusCode: response.statusCode,
      headers: response.headers,
      body: response.body,
    }
  }
}

export const createHttpClient = () => new Client()
