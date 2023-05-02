import { AppName } from '@/types/misc'

/**
 * Logger adds some style to your console.
 * @param name Logger name appearing in the console
 */
export class ApplicationLogger {
  private name: string
  private style: {
    print: string
    debug: string
    info: string
    warn: string
    error: string
  }

  constructor(name = 'Logger') {
    this.name = `%c${name}`

    // Just needs color at the end of the string
    const baseStyle = 'border-radius: 3px; padding: 2px 4px; color: white; background-color:'

    // Tried using Quasar getPaletteColor() but it doesn't load them correctly.
    // These color codes should be the same as those in ~/src/main.ts
    this.style = {
      print: `${baseStyle} #607d8b;`,
      debug: `${baseStyle} #673ab7;`,
      info: `${baseStyle} #0d47a1;`,
      warn: `${baseStyle} #ff6f00;`,
      error: `${baseStyle} #C10015;`,
    }
  }

  print(message: any, ...args: any) {
    console.log(this.name, this.style.print, message, ...args)
  }

  debug(message: any, ...args: any) {
    console.log(this.name, this.style.debug, message, ...args)
  }

  info(message: any, ...args: any) {
    console.log(this.name, this.style.info, message, ...args)
  }

  warn(message: any, ...args: any) {
    console.warn(this.name, this.style.warn, message, ...args)
  }

  error(message: any, ...args: any) {
    console.error(this.name, this.style.error, message, ...args)
  }
}

/**
 * Preconfigured ApplicationLogger instance.
 */
const Logger = new ApplicationLogger(AppName)

export default Logger
