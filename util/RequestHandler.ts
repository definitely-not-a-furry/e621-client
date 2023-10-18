//UPDATE ACCORDINGLY

const version: string = 'Development build'

export default class RequestHandler {
    name: string | null
    auth: string | null

    authcheck() {
        if(this.name == null || this.auth == null) {
            return false
        }
        return true
    }

    constructHeader() {
        if(this.authcheck()) {
            return { 
                'UserAgent': `e621-client/${version} (${this.name})`,
                'Authorization': 'Basic ' + Buffer.from(`${this.name}:${this.auth}`).toString('base64')
            }
        } else {
            return { 'UserAgent': `e621-client/${version} (nli/definitely-not-furry)` }
        }
    }

    constructURL(path: string, parameter: string | null) {
        return(`https://e621.net/${path}.json${parameter ? `?${parameter}` : ''}`)
    }

    async request(url: string): Promise<[number | null, any | null]> {
        try {
            const response = await fetch(url, {headers:this.constructHeader()})
                .catch(error => {
                    return [400, `Error occured: ${error}`]
                })
            if(response && 'status' in response) {
                let data = await response.json() 
                return [response.status, data]
            } else {
                return [null, null]
            }
        } catch(e) {
            return [ 400, 'an error occured' ]
        }
    }

    async get(type: string, filter: string) {
        var [response, status]: any = null
        switch(type){
            default: 
                break
            case 'SEARCH_POST':
                [status, response] = await this.request(this.constructURL(`posts`, `tags=${filter.split(' ').join('+')}`))
                break
            case 'GET_POST':
                [status, response] = await this.request(this.constructURL(`posts/${filter}`, null))
                break
            case 'GET_COMMENTS':
                [status, response] = await this.request(this.constructURL(`comments.json`, `group_by=comment&search[post_id]=${filter}`))
                break
            case 'AUTOCOMPLETE_TAG':
                [status, response] = await this.request(this.constructURL(`tags/autocomplete`, `search[name_matches]=${filter}*`))
                break
        }
        if(status.includes([200, 201, 202, 205, 207, 208])) {
            return response
        } else if(status == 203) {
            console.warn('Warning: HTTP status 203; the enclosed payload has been modified by a transforming proxy. Response may not be identical to the original source.')
            return response
        } else if( status == 404 || status == 400) {
            return 'request failed'
        } else {
            console.warn(`An unknown status occured while fetching content (${status})`)
            return 'request failed'
        }
    }
}