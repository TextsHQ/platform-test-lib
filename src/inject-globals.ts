import path from 'path'
import { TextsNodeGlobals } from '@textshq/platform-sdk/dist/TextsGlobals'

import { USER_AGENT } from './constants'
import { createHttpClient } from './got-fetch'
import { fetch, fetchStream } from './fetch'
import SyncSqlite from './SyncSqlite'
// import { runOtherWorker } from './workers'

export default function injectGlobals(IS_DEV: boolean, isLoggingEnabled: boolean, userDataDirPath: string) {
  globalThis.AsyncSqlite = SyncSqlite

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
