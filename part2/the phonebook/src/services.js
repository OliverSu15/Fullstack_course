import axios from 'axios'

const baseURL = "http://localhost:3001/persons"

const addOne = newObject => {
    const request = axios.post(baseURL,newObject)
    return request.then(respone => respone.data)
}

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const deleteOne = id => {
    const request = axios.delete(baseURL+`/${id}`)
    return request.then(response => response.data)
}

const update = (id,newObject) =>{
    const request = axios.put(`${baseURL}/${id}`,newObject)
    return request.then(response => response.data)
}

export default {
    addOne,
    getAll,
    deleteOne,
    update
}