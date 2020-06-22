import axios from 'axios'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createOne = async content => {
  const newObject = asObject(content)
  const response = await axios.post(baseUrl,newObject)
  return response.data
}

const update = async (id,newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`,newObject)
    return response.data
}

export default { getAll,createOne,update }