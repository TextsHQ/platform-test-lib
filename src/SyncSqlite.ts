import betterSqlite from 'better-sqlite3'
// import type { IAsyncSqlite } from '@textshq/platform-sdk'

export default class SyncSqlite { // implements IAsyncSqlite
  private db: betterSqlite.Database

  private statementMap = new Map<string, betterSqlite.Statement>()

  prepareSQL(sql: string) {
    const cached = this.statementMap.get(sql)
    if (cached) return cached
    const prepared = this.db.prepare(sql)
    this.statementMap.set(sql, prepared)
    return prepared
  }

  init(filename: string, options?: betterSqlite.Options) {
    this.db = betterSqlite(filename, options)
  }

  dispose() {
    this.db.close()
  }

  // start boilerplate

  exec(source: string) {
    this.db.exec(source)
    return true
  }

  raw_all<BindParameters extends any[]>(sql: string, ...args: BindParameters) {
    const prepared = this.prepareSQL(sql)
    return prepared.raw().all(...args)
  }

  pluck_all<BindParameters extends any[]>(sql: string, ...args: BindParameters) {
    const prepared = this.prepareSQL(sql)
    return prepared.pluck().all(...args)
  }

  pluck_get<BindParameters extends any[]>(sql: string, ...args: BindParameters) {
    const prepared = this.prepareSQL(sql)
    return prepared.pluck().get(...args)
  }

  all<BindParameters extends any[]>(sql: string, ...args: BindParameters) {
    const prepared = this.prepareSQL(sql)
    return prepared.all(...args)
  }

  get<BindParameters extends any[]>(sql: string, ...args: BindParameters) {
    const prepared = this.prepareSQL(sql)
    return prepared.get(...args)
  }

  run<BindParameters extends any[]>(sql: string, ...args: BindParameters) {
    const prepared = this.prepareSQL(sql)
    return prepared.run(...args)
  }
}
