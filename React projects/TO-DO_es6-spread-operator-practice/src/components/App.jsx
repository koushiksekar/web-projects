import React, { useState } from "react";

function App() {

const [change,setchange]= useState("");
const [newli,setNew]= useState([]);

function handleChange(event){
  setchange(event.target.value);
}

function handleClick(){
  setNew(prevalue =>{
    return[...prevalue,change];
  });
  setchange("");
};

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={change} />
        <button onClick={handleClick}>
          <span>Add </span>
        </button>
      </div>
      <div>
        <ul>
          {newli.map(Item =>{
            return <li> {Item} </li>
          })}
          
        </ul>
      </div>
    </div>
  );
}

export default App;
