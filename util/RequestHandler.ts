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

export default class RequestHandler {
    name: string | null = null
    auth: string | null = null
    useSSL: boolean = false
    limit: string = '25'
    domain: string = 'e926.net'

    authcheck (): boolean {
        return !(!this.name || !this.auth)
    }

    constructHeader (): HeadersInit {
        if (this.authcheck()) {
            return {
                UserAgent: `e621-client/${version} (${this.name})`,
                Authorization: 'Basic ' + Buffer.from(`${this.name}:${this.auth}`).toString('base64')
            }
        } else {
            return { UserAgent: `e621-client/${version} (nli/definitely-not-furry)` }
        }
    }

    constructURL (path: string, parameter: string | null): string {
        return (`${this.useSSL ? 'https' : 'http'}://${this.domain}/${path}.json${parameter ? `?${parameter}` : ''}`)
    }

    async request (url: string): Promise<[number | null, any | null]> {
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

    async get (type: FetchType, filter: string): Promise<object | string> {
        let response: object
        let status: number
        console.log(`Fetching ${type} using parameter ${filter}`)
        switch (type) {
            case FetchType.Search_post:
                [status, response] = await this.request(this.constructURL('posts', `tags=${filter.split(' ').join('+')}&limit=${this.limit}`))
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
            return 'request failed'
        }
    }
}
