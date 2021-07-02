import got from 'got'
import type { FetchResponse, FetchOptions } from '@textshq/platform-sdk'

class Client {
  async requestAsString(url: string, opts?: FetchOptions): Promise<FetchResponse<string>> {
    const response = await got({
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

  async requestAsBuffer(url: string, opts?: FetchOptions): Promise<FetchResponse<Buffer>> {
    const response = await got({
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
