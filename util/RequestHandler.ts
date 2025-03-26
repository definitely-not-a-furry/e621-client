// UPDATE ACCORDINGLY
const version: string = 'Development build'

export enum FetchType {
  Search_post = 'SEARCH_POST',
  Get_post = 'GET_POST',
  Get_comment = 'GET_COMMENTS',
  Autocomplete = 'AUTOCOMPLETE_TAG',
  Search_wiki = 'SEARCH_WIKI',
  Get_wiki = 'GET_WIKI'
}

export interface Parameter {
  key: string,
  value: string | string[]
}

export class NetworkError extends Error {
  constructor(message: string, cause: unknown | undefined) {
    super(message)
    this.name = 'NetworkError'
  }
}

export default class RequestHandler {
  name: string | null = null
  authenticationToken: string | null = null
  useSSL: boolean = false
  limit: number = 25
  domain: string = 'e926.net'

  constructor(name: string | null, auth: string | null, useSSL: boolean, limit: number, domain: string) {
    this.name = name
    this.authenticationToken = auth
    this.useSSL = useSSL
    this.limit = limit
    this.domain = domain
  }

  authCheck(): boolean {
    return !(!this.name || !this.authenticationToken)
  }

  constructHeader(): HeadersInit {
    if (this.authCheck()) {
      return {
        UserAgent: `e621-client/${version} (${this.name})`,
        Authorization: 'Basic ' + Buffer.from(`${this.name}:${this.authenticationToken}`).toString('base64'),
        Host: this.domain,
        Accept: "application/json",
        method: "GET"
      }
    } else {
      console.log("Warning: No authentication provided")
      return { 
        UserAgent: `e621-client/${version} (nli)`, 
        Host: this.domain,
        Accept: "application/json",
        method: "GET" 
      }
    }
  }

  constructURL(path: string, parameters: Parameter[] | undefined): string {
    const useParameters: boolean = parameters ? true : false
    if (useParameters) {
      const parameterQuery: string | null = parameters ? parameters.map((parameter) => {
        if (Array.isArray(parameter.value)) {
          return `${parameter.key}=${parameter.value.join('+')}`
        }
        return `${parameter.key}=${parameter.value}`
    })
    .join('&') : null
      return `${this.useSSL ? 'https' : 'http'}://${this.domain}/${path}?${parameterQuery}`
    } else {
      return `${this.useSSL ? 'https' : 'http'}://${this.domain}/${path}`
    }
  }

  async request(url: string): Promise<[number | null, any | null]> {
    try {
      const response = await fetch(url, { headers: this.constructHeader() })
        .catch(error => {
          return [400, `Error occured: ${error}`]
        })
      if ('status' in response) {
        return [response.status, await response.json()]
      } else {
        return [null, null]
      }
    } catch (e) {
      return [400, 'an error occured']
    }
  }

  async get(type: FetchType, filter: string): Promise<object | string> {
    let response: object
    let status: number
    console.log(`Fetching ${type} using parameter ${filter}`)
    switch (type) {
      case FetchType.Search_post:
        [status, response] = await this.request(this.constructURL('posts', [{key: 'tags', value: filter.split(' ')}, {key: 'limit', value: String(this.limit)}]))
        break
      case FetchType.Get_post:
        [status, response] = await this.request(this.constructURL(`posts/${filter}`, null))
        break
      case FetchType.Get_comment:
        [status, response] = await this.request(this.constructURL('comments', `group_by=comment&search[post_id]=${filter}`))
        break
      case FetchType.Autocomplete:
        if (filter.length <= 1) {
          [status, response] = [200, []]
          break
        }
        [status, response] = await this.request(this.constructURL('tags/autocomplete', `search[name_matches]=${filter}*&limit=6`))
        break
      case FetchType.Search_wiki:
        [status, response] = await this.request(this.constructURL('wiki_pages', `search[title]=*${filter}*`))
        break
      case FetchType.Get_wiki:
        [status, response] = await this.request(this.constructURL(`wiki_pages/${filter}`, null))
        break
      default:
        console.warn('FetchType Invalid')
        return {}
    }

    if ([200, 201, 202, 205, 207, 208].includes(status)) {
      return response
    } else if (status === 203) {
      console.log('Warning: HTTP status 203; the enclosed payload has been modified by a transforming proxy. Response may not be identical to the original source.')
      return response
    } else if (status === 404 || status === 400) {
      return 'request failed'
    } else {
      console.warn(`An unknown status occured while fetching content (${status})`)
      console.log(response)
      return 'request failed'
    }
  }
}
