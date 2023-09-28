export default class RequestHandler {
    private readonly auth: string | null
    authcheck(func: string, error = true) {
        if(this.auth === null ) {
            return false
        } 
    }

    constructURL(path: string, parameter: string | null) {
        return(`https://e621.net/${path}.json${parameter ? `?${parameter}` : ''}`)
    }

    async request(url: string) {
        const response = await fetch(url, {headers:{
            'User-Agent': 'e621-client/alpha.0.1(github.com/definitely-not-a-furry)'
        }})
            .catch(error => {
                return [400, `Error occured: ${error}`]
            })
        if(response.status ==! undefined) {
            return [response.status, response.json()]
        } else {
            return [null, null]
        }
    }

    async get(type: string, filter: string) {
        var [response, status]: any = null
        switch(type){
            default: 
                break
            case 'SEARCH_POSTS':
                [status, response] = await this.request(this.constructURL(`posts`, `tags=${filter.split(' ').join('+')}`))
            case 'GET_POST':
                [status, response] = await this.request(this.constructURL(`posts/${filter}`, null))
            case 'GET_COMMENTS':
                [status, response] = await this.request(this.constructURL(`comments.json`, `group_by=comment&search[post_id]=${filter}`))
            case 'AUTOCOMPLETE_TAG':
                [status, response] = await this.request(this.constructURL(`tags/autocomplete`, `search[name_matches]=${filter}*`))
        }
        if(status.includes([200, 201, 202, 205, 207, 208])) {
            return response
        } else if(status == 203) {
            console.warn('Warning: HTTP status 203; the enclosed payload has been modified by a transforming proxy. Response may not be identical to the original source.')
            return response
        } else if( status == 404 || status == 400) {
            return 'request failed'
        }
    }
}