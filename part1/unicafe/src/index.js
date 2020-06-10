import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => (
  <div>
  <h1>{props.content}</h1>
  </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
  {props.text}
  </button>
)

const Statistic = (props) =>(
    <tr>
      <th>{props.name}</th>
      <td>{props.num}</td>
    </tr>
)
const Statistics = (props) => {
  
  let all = props.good + props.bad + props.neutral
  let average = (props.good - props.bad)/props.good + props.bad + props.neutral
  let positive = ((props.good / (props.good + props.bad + props.neutral))*100) +" %"

  if(all === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  else{
    return (<table>
      <tbody>
      <Statistic name = "good" num = {props.good}/>
      <Statistic name = "neutral" num = {props.neutral}/>
      <Statistic name = "bad" num = {props.bad}/>
      <Statistic name = "all" num = {all}/>
      <Statistic name = "average" num = {average}/>
      <Statistic name = "positive" num = {positive}/>
      </tbody>
    </table>)
  }
}

const App = () => {
  // save clicks of each button to own state

  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const goodClicked = () => {
    setFeedback({...feedback, good: feedback.good+1})
  }

  const neutralClicked = () => {
    setFeedback({...feedback, neutral: feedback.neutral+1})
  }

  const badClicked = () => {
    setFeedback({...feedback, bad: feedback.bad+1})
  }



  return (
    <div>
      <Display content = "give feedback"/>
      <div> 
        <Button handleClick = {goodClicked}  text = "good"/>
        <Button handleClick = {neutralClicked}  text = "neutral"/>
        <Button handleClick = {badClicked}  text = "bad"/>
      </div>
      <Display content = "statistics"/>
      <Statistics good = {feedback.good} neutral={feedback.neutral} bad = {feedback.bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
