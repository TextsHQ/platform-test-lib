import path from 'path'
import { TextsNodeGlobals } from '@textshq/platform-sdk/dist/TextsGlobals'

import { USER_AGENT } from './constants'
import { createHttpClient } from './got-fetch'
import { fetch, fetchStream } from './fetch'
// import { runOtherWorker } from './workers'

const IS_DEV = true
const isLoggingEnabled = true

export default function injectGlobals(userDataDirPath: string) {
  // globalThis.AsyncSqlite = AsyncSqlite

  globalThis.texts = {
    IS_DEV,
    isLoggingEnabled,
    log: (...args: any[]) => {
      if (!isLoggingEnabled) return
      console.log(...args)
    },
    error: (...args: any[]) => {
      if (!isLoggingEnabled) return
      console.error(...args)
    },
    constants: {
      USER_AGENT,
      APP_VERSION: '1.0.0',
    },
    Sentry: {
      captureException: () => {},
      captureMessage: () => {},
      startTransaction: () => {},
    },
    async trackPlatformEvent(data: any) {},
    getBinariesDirPath(platformName: string) {
      return path.join(__dirname, '../..', 'platform-' + platformName, 'binaries')
    },
    fetch,
    fetchStream,
    createHttpClient,
    nativeFetch: undefined as any,
    nativeFetchStream: undefined as any,
    runWorker: undefined as any,
    forkChildProcess: undefined as any,
    getOriginalObject: undefined as any,
    openBrowserWindow: undefined as any,
  } satisfies TextsNodeGlobals
}
