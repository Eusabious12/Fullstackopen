import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.find(person => person.name === newName)

    if (nameExists) {
      alert (`${newName} is already added to phonebook`)
    return 
    }
    const personObject = { name: newName, number: newNumber}
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase))
    
  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with: <input value={filter} onChange={(e) => setFilter(e.target.value)} /> </div>
      <h3> add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <p key={person.name}>{person.name}  {person.number}</p>
      )}
    </div>
  )
}

export default App