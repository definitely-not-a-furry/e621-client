// UPDATE ACCORDINGLY
const version: string = 'Development build'

export interface Parameter {
  key: string
  value: string | string[]
}

export class UserError extends Error {
  constructor (message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'UserError'
  }
}

export class NetworkError extends Error {
  status: number | undefined
  constructor (message: string, options?: ErrorOptions, status?: number) {
    super(message, options)
    this.name = 'NetworkError'
    this.status = status
  }
}

export default class RequestHandler {
  name: string | undefined = undefined
  authenticationToken: string | undefined = undefined
  useSSL: boolean = true
  domain: string = 'e926.net'

  constructor (domain?: string, useSSL?: boolean, name?: string, auth?: string) {
    this.name = name
    this.authenticationToken = auth
    if (useSSL != null) this.useSSL = useSSL
    if (domain != null) this.domain = domain
  }

  async get<T = unknown>(path: string, parameters?: Parameter[]): Promise<T | null> {
    return await new Promise<T | null>((resolve, reject) => {
      const requestParams = new Request(
        parameters != null
          ? `${this.useSSL ? 'https' : 'http'}://${this.domain}/${path}?${parameters.map((parameter) => `${parameter.key}=${
            typeof parameter.value === 'string'
              ? encodeURIComponent(parameter.value)
              : parameter.value.join('+')}`).join('&')}`
          : `${this.useSSL ? 'https' : 'http'}://${this.domain}/${path}`,
        {
          method: 'GET',
          headers: {
            UserAgent: `e621-client/${version}`,
            Host: this.domain
            // ...(!(this.name == null || this.authenticationToken == null)
            //   ? {}
            //   : {
            //     Authorization: `Basic ${btoa(`${this.name ?? ''}:${this.authenticationToken ?? ''}`)}`
            //   })
          }
        })
      const request = fetch(requestParams).then((response) => {
        if (response.status == null || response.statusText == null) reject(new NetworkError('No Status Information', { cause: 'nostatus' }))
        if (response.status === 204) resolve(null)
        else if (response.status === 200 || response.status === 201) {
          try {
            resolve(response.json() as Promise<T>)
          } catch {
            reject(new Error('Error while parsing', { cause: 'parseerror' }))
          }
        } else if (response.status === 400) reject(new NetworkError('The requested feature was not found', { cause: 'invalidfeature' }))
        else if (response.status === 401) reject(new UserError('Authorization invalid', { cause: 'authfail' }))
        else if (response.status === 403) reject(new UserError('Access denied', { cause: 'accessdenied' }))
        else if (response.status === 404) reject(new NetworkError('The requested content was not found', { cause: 'notfound' }))
        else if (response.status === 405) reject(new NetworkError('The method for the request was invalid', { cause: 'invalidmethod' }))
        else if (response.status === 406) reject(new UserError('The submitted format is invalid', { cause: 'invalidformat' }))
        else if (response.status === 429) reject(new NetworkError('You are requesting pages to fast!', { cause: 'ratelimited' }))
        else if (String(response.status)[0] === '5') reject(new NetworkError('Server or cloudflare error', { cause: 'servererror' }, response.status))
      })
    })
  }
}
