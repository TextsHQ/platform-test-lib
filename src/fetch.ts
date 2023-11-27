import type { FetchOptions, FetchResponse } from '@textshq/platform-sdk'
import type { Readable } from 'stream'

import got from 'got'

async function gotFetch(url: string, opts: FetchOptions = {}): Promise<FetchResponse<Buffer>> {
  const res = await got(url, {
    throwHttpErrors: false,
    method: opts.method,
    headers: opts.headers,
    searchParams: opts.searchParams,
    form: opts.form,
    body: opts.body,
    cookieJar: opts.cookieJar,
    followRedirect: opts.followRedirect,
    responseType: 'buffer',
  })
  return {
    statusCode: res.statusCode,
    headers: res.headers,
    body: res.body,
  }
}

async function gotFetchStream(url: string, opts: FetchOptions = {}): Promise<Readable> {
  return got.stream(url, {
    throwHttpErrors: false,
    method: opts.method,
    headers: opts.headers,
    searchParams: opts.searchParams,
    form: opts.form,
    body: opts.body,
    cookieJar: opts.cookieJar,
    followRedirect: opts.followRedirect,
  })
}

export const fetch = gotFetch
export const fetchStream = gotFetchStream
