import React, { useState, useEffect } from 'react'
import Searchbar from './searchbar'
import Addform from './addform'
import Phonebook from './phonebook'
import service from './services'

const Notification = ({ message,classname }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={classname}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ keyword, setKeyword] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [notifycationtype,setType] = useState('message')

  useEffect(() => {
    service.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })

  },[])


  const addPerson = (event) => {
    event.preventDefault()
    const temp = {name: newName,number: newNumber,display: newName.toLowerCase().includes(keyword.toLowerCase()) }
    const tempP = persons.filter(person => person.name === newName)
    if(tempP.length !== 0){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        service.update(tempP[0].id,temp)
        .then(returnPerson => {
          setPersons(persons.map(person => person.id === tempP[0].id ? returnPerson:person ))
          setSuccessMessage(`${newName} is added`)
          setType("message")
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setSuccessMessage(`${newName} is removed from server`)
          setType("error")
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      }
    }
    else{
      service.addOne(temp)
      .then(
        returnPerson => {
            setPersons(persons.concat(returnPerson))
            setNewName('')
            setNewNumber('')
        }
      )
      setSuccessMessage(`${newName} is added`)
      setType("message")
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleKeywordChange = (event) => {
    const kw = event.target.value

    if(kw === ''){
      setPersons(persons.map( (person) =>{
        return {...person,display : true}
      }) )
    }

    else{
      setPersons(persons.map((person) => {
        if(person.name.toLowerCase().includes(kw.toLowerCase()))
          return {...person,display : true}
        else
          return {...person, display : false}
        }
    ))
    }
    setKeyword(kw)
  }

  const deletePerson = (id) =>{
    service.deleteOne(id)
    .then(deleteone => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const deleteEvent = (id) => (event) => {
    event.preventDefault()
    if(window.confirm(`Delete ${persons[id-1].name}`)){
      deletePerson(id)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} classname = {notifycationtype} />
      <Searchbar name = {keyword} handleEvent = {handleKeywordChange}/>
      <h2>add a new</h2>
      <Addform addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Phonebook persons = {persons} clickEvent = {deleteEvent}/>
    </div>
  )
}

export default App