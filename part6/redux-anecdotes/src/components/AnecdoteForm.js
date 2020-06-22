import React from 'react'
import { connect } from 'react-redux'
import {createOne} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/messageReducer'

const AnecdoteForm = (props) => {

    const crea = async (event) => {
        event.preventDefault()
        const content = event.target.new.value
        event.target.new.value = ''
        props.createOne(content)
        props.setNotification(`you creat ${content}`,5000)
        //setTimeout(() => dispatch(cancle()),5000)
      }
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit = {crea}>
        <div><input name = 'new'/></div>
        <button>create</button>
        </form>
        </div>
    )
}
const mapDispatchToProps = {
    createOne,setNotification,
  }
const ConnectedAnecdoteForm = connect(null,mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm