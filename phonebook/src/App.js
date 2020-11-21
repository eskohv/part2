import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import serverService from "./services/server.js"
import "./index.css"
import Notification from "./components/Notification";

const App = () => {

    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ filter, setFilter] = useState('')
    const [ notification, setNotification] = useState(null)
    const [ style, setStyle] = useState(true)

    useEffect(() => {
        serverService
            .getAll()
            .then(response => {
                setPersons(response)
            })
    }, [])

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setFilter(event.target.value)
    }

    const personsToShow = (filter.length === 0)
        ? persons
        : persons.filter(person => ((person.name).toUpperCase()).includes(filter.toUpperCase()))

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
        }

        if(
            (persons.map(person =>
            person.name))
            .includes(newName)
            &&
            (persons.map(person =>
                person.number))
                .includes(newNumber)
        ){
            window.alert(`${newName} ${newNumber} is already in the phonebook`)

        } else if (
            (persons.map(person =>
            person.name))
            .includes(newName)
            &&
            !(persons.map(person =>
                person.number))
                .includes(newNumber)
        ){
            const updatedPerson = persons.find(person => person.name === newName)
            if(window.confirm(`${newName} is already in the phone book, replace the number with a new one?`)){
                serverService
                    .update(updatedPerson.id,personObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.number !== updatedPerson.number ? person : returnedPerson ))
                        setNewName('')
                        setNewNumber('')
                    })
            }
        } else {
            serverService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setStyle(true)
                    setNotification(`${returnedPerson.name} was added to the phone book`)
                    setTimeout(() => {
                        setNotification(null)
                    },5000)

                })
        }
    }

    const handleDelete = (person) =>{
        console.log("deleting " + person.id)
        if(window.confirm(`Are you sure you want to delete ${person.name} ?`)) {
            serverService
                .deletePerson(person.id)
                .then(() => {
                    serverService
                        .getAll()
                        .then(response => {
                            setPersons(response)
                        }).catch(error => {
                            setNotification(`Could not retrieve data`)
                    })
                }).catch(error => {
                    setStyle(false)
                    setNotification(`Information of ${person.name} has already been removed from the server`)
                serverService
                    .getAll()
                    .then(response => {
                        setPersons(response)
                    })
                })
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} style={style}/>
            <Filter handler={handleFilterChange} filter={filter}/>
            <h3>Add a new entry</h3>

            <PersonForm addPerson={addPerson}
                        nameValue={newName}
                        nameHandler={handleNameChange}
                        numberValue={newNumber}
                        numberHandler={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} persons={persons} handle={handleDelete}/>
        </div>

    )
}

export default App