import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}

const Button = (props) => (
  <button onClick={props.handleClick}>
  {props.text}
  </button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points,setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const [high,setHigh] = useState(0)

  const next = () => {
    setSelected(getRandomIntInclusive(0,anecdotes.length-1))
  }

  const vote = () => {
    const temp = points
    temp[selected]+=1
    if(temp[selected] > high){
      setHigh(selected)
    }
    setPoints(temp)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>
      <Button handleClick={vote} text = "vote"/>
      <Button handleClick={next} text = "next anecdote"/>
      </div>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[high]}
    </div>
  )
}



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
