import React from 'react'
import { connect } from 'react-redux'
import {voteOne} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/messageReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.Anecdote
    //const anecdotes = useSelector(state => state.Anecdote)
    // const filter = useSelector(state => state.Filter)
    // const dispatch = useDispatch()
  
    const vote = (anecdote) => {
      props.voteOne(anecdote)
      props.setNotification(`you vote ${anecdote.content}`,5000)
      //setTimeout(() => dispatch(cancle()),5000)
    }

    return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        </div>
    )
}

const f = ({ Anecdote, Filter }) => Anecdote.filter(anecdote => anecdote.content.toLowerCase().includes(Filter.toLowerCase())) 

const mapStateToProps = (state) => {
  console.log(state)
  return {
    Anecdote: f(state)
  }
}

const mapDispatchToProps = {
  voteOne,setNotification,
}

const ConnectedAnecdoteList = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList 