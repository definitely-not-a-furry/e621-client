// This file is used to connect the application with e621's API more easily, currently it hasn't been fully implemented because some features need to be implemented

class Post {
    static getByID (ID) {
        fetch(`https://e621.net/posts/${ID}.json`)
            .then(response => response.json())
            .then(data => { return data })
            .catch(error => console.error(error))
    }

    static vote () {
        // Needs to be implemented after User authentication
    }

    static favorite () {
        // Needs to be implemented
    }

    static unfavorite () {
        // Needs to be implemented
    }
}

class Comment {
    static getFromPost (PostId) {
        fetch(`https://e621.net/comments.json?group_by=comment&search[post_id]=${PostId}`)
            .then(response => response.json())
            .then(data => { return data })
            .catch(error => console.error(error))
    }

    static post () {
        // Needs to be implemented
    }
}

class Tag {
    static autocomplete (string) {
        fetch(`https://e621.net/tags/autocomplete.json?search[name_matches]=*${string}*`)
            .then(response => response.json())
            .then(data => { return data })
            .catch(error => { console.error(error) })
    }
}

export { Post, Comment, Tag }
