import AnecdoteService from '../service/anecdoteService'


// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }


const Anecdotereducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE': return state.map(a => a.id === action.data.id ? action.data.anecdote : a).sort((a, b) => b.votes - a.votes)
    case 'CREAT': return state.concat(action.data.anecdote).sort((a, b) => b.votes - a.votes)
    case 'INIT':return action.data
    default:
      return state
  }
}

export const voteOne = (old) => {
  return async dispatch => {
    const newOne = await AnecdoteService.update(old.id,{...old,votes : old.votes + 1})
    console.log(newOne)
    dispatch(  {
      type: 'VOTE',
      data: {id : newOne.id,anecdote:newOne}
    })
  }
  

}

export const createOne = (content) => {

  return async dispatch => {
    const Anecdote= await AnecdoteService.createOne(content)
    dispatch({
      type: 'CREAT',
      data: {anecdote:Anecdote}
    })
  }
}

export const initializeAnecdote = () => {
  return  async dispatch => {
    const Anecdote = await AnecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: Anecdote,
    })
  }
}

export default Anecdotereducer