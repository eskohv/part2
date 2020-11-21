import React from "react";

const PersonForm = ({addPerson,nameHandler,numberHandler,numberValue,nameValue}) =>{
    return (
        <div>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={nameValue} onChange={nameHandler}/>
                    <br/>
                    number: <input value={numberValue} onChange={numberHandler}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm