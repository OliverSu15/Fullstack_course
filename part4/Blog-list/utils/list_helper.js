const lodash = require('lodash')

const totalLikes = (blogs) => {
    if(blogs.length === 0){
        return 0
    }
    else{
        return blogs.map(blog => blog.likes).reduce((count,cur) => count + cur)
    }    
}

const favoriteBlog = (blogs) => {
    let favorite = blogs[0]
    for(let i of blogs.values()){
        if(i.likes > favorite.likes){
            favorite = i
        }
    }
    return favorite
}

const mostBlogs = (blogs) => {
    let high = 0
    let au = ''
    const al = new Map()

    for(let i of blogs.values()){
        if(al.has(i.author)){
            let b = al.get(i.author) + 1
            if(b > high){
                high = b
                au = i.author
            }
            al.set(i.author,b)
        }
        else{
            al.set(i.author,1)
        }
    }

    return {
        author: au,
        blogs: high
    }
}

const mostlike = (blogs) => {
    let high = 0
    let au = ''
    const al = new Map()

    for(let i of blogs.values()){
        if(al.has(i.author)){
            let b = al.get(i.author) + i.likes
            if(b > high){
                high = b
                au = i.author
            }
            al.set(i.author,b)
        }
        else{
            al.set(i.author,i.likes)
        }
    }

    return {
        author: au,
        likes: high
    }
}


module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostlike
}