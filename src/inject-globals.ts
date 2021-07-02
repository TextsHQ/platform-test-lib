import { USER_AGENT } from './constants'
import { createHttpClient } from './create-http-client'

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
      // BUILD_DIR_PATH,
    },
    Sentry: {},
    // trackPlatformEvent,
    // runWorker: runOtherWorker,
    // fetch,
    // fetchStream,
    createHttpClient,
  }
}
