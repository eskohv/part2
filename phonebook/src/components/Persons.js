import React from "react";

const Persons = ({personsToShow,handle}) => {
    return (
        <div>
            <ul>
                {personsToShow.map((person) =>
                    <p
                        key={person.name}>{person.name} {person.number}
                        <button onClick={ () => handle(person)}>Delete</button>
                    </p>
                )}
            </ul>
        </div>
    )
}

export default Persons