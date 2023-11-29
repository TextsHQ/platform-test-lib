import path from 'path'
import { USER_AGENT } from './constants'
import { createHttpClient } from './got-fetch'
import { fetch, fetchStream } from './fetch'

const IS_DEV = true

export default function injectGlobals() {
  // globalThis.AsyncSqlite = AsyncSqlite

  globalThis.texts = {
    IS_DEV,
    log: (...args: any[]) => {
      if (!IS_DEV) return
      console.log(...args)
    },
    error: (...args: any[]) => {
      if (!IS_DEV) return
      console.error(...args)
    },
    constants: {
      USER_AGENT,
      // APP_VERSION: pkg.version,
    },
    Sentry: {
      captureException: () => {},
      captureMessage: () => {},
      startTransaction: () => {},
    },
    trackPlatformEvent: () => {},
    getBinariesDirPath(platformName: string) {
      return path.join(__dirname, '../..', 'platform-' + platformName, 'binaries')
    },
    // runWorker: runOtherWorker,
    fetch,
    fetchStream,
    createHttpClient,
  }
}
