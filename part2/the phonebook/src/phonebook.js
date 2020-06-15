import React from 'react'

const Phonebook = ({persons,clickEvent}) => {
    return (
        <div>
        {
            persons.filter( (person) => person.display )
            .map((person)=> {
            return (<div key = {person.id}>
            <p > {person.name}  {person.number} </p> 
            <button onClick = {clickEvent(person.id)}>delete</button>
            </div>
                )}
                )
        }
        </div>
    )
}

export default Phonebook