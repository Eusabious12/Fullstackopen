import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, setNewName, newNumber, setNewNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={(e) => setNewName(e.target.value)} /></div>
      <div>number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect (() => {
    axios.get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))


  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.find(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = { name: newName, number: newNumber }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App