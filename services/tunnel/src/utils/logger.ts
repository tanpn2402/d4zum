class Logger {
  private filePath: string

  constructor(filePath: string) {
    this.filePath = filePath
  }

  private sout(level: string, ...args: any) {
    console.log(`${new Date().toISOString()} ${level.toUpperCase()} ${this.filePath} `, ...args)
  }

  public info(...args: any) {
    this.sout("INFO", args)
  }

  public wrn(...args: any) {
    this.sout("WRN", args)
  }

  public trace(...args: any) {
    this.sout("TRACE", args)
  }

  public error(...args: any) {
    this.sout("ERROR", args)
  }
}

class LoggerManager {
  public static getLogger(filePath: string): Logger {
    return new Logger(filePath.replace(__dirname, ""))
  }
}

export {
  Logger,
  LoggerManager
}