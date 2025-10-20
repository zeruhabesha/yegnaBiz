declare module 'nodemailer' {
  export interface TransportOptions {
    host?: string
    port?: number
    secure?: boolean
    auth?: {
      user: string
      pass: string
    }
    [key: string]: any
  }

  export interface MailOptions {
    from?: string
    to?: string | string[]
    subject?: string
    text?: string
    html?: string
    [key: string]: any
  }

  export interface Transporter {
    sendMail: (mailOptions: MailOptions) => Promise<any>
    [key: string]: any
  }

  interface Transport {
    createTransport: (options: TransportOptions) => Transporter
    [key: string]: any
  }

  const nodemailer: {
    createTransport: (options: TransportOptions) => Transporter
    [key: string]: any
  }

  export = nodemailer
}
