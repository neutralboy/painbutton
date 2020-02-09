import React, { useState, useEffect } from 'react';
import moment from 'moment';
import uuidv4 from 'uuid/v4';

import './App.scss';


const Delete = () => <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    width="32" height="32"
    viewBox="0 0 128 128"
    style={{fill:'#000000'}}><path fill="#fff" d="M64 9A55 55 0 1 0 64 119A55 55 0 1 0 64 9Z" transform="rotate(-45.001 64 64.001)"></path><path fill="#ff5576" d="M64 24A40 40 0 1 0 64 104A40 40 0 1 0 64 24Z" transform="rotate(-45.001 64 64.001)"></path><path fill="#444b54" d="M64,122c-15.5,0-30.1-6-41-17C12,94.1,6,79.5,6,64s6-30.1,17-41c11-11,25.5-17,41-17s30.1,6,41,17l0,0l0,0 c11,11,17,25.5,17,41s-6,30.1-17,41C94.1,116,79.5,122,64,122z M64,12c-13.9,0-26.9,5.4-36.8,15.2S12,50.1,12,64 s5.4,26.9,15.2,36.8S50.1,116,64,116s26.9-5.4,36.8-15.2S116,77.9,116,64s-5.4-26.9-15.2-36.8l0,0C90.9,17.4,77.9,12,64,12z"></path><path fill="#fff" d="M68.2,64l11.3-11.3c1.2-1.2,1.2-3.1,0-4.2c-1.2-1.2-3.1-1.2-4.2,0L64,59.8L52.7,48.4c-1.2-1.2-3.1-1.2-4.2,0 c-1.2,1.2-1.2,3.1,0,4.2L59.8,64L48.4,75.3c-1.2,1.2-1.2,3.1,0,4.2c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9L64,68.2l11.3,11.3 c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9c1.2-1.2,1.2-3.1,0-4.2L68.2,64z"></path></svg>

const DataRow = ({ id, time, deleteItem }) => <div className="container" >
            <div className="row display-box">
              <div className="col-sm-11">
                <p>
                  {moment(time).format('llll')}
                </p>
              </div>
              <div className="col-sm-1">
                <button onClick={()=>deleteItem(id)} className="circular"><Delete /></button>
              </div>  
            </div>
          </div>

const App = () => {
  const [list, setList] = useState([]);
  const [fetched, setFetched] = useState(false)
  const addItem = () =>{
    console.log(list)
    let uuid = uuidv4();
    let time = moment().format();
    setList([ ...list, { id: uuid, time: time } ]);
    localStorage.setItem(uuid, time);
  }
  const deleteItem = (id) => {
    let newList = [...list];
    newList.forEach(i => {
      if(i.id == id){
        let index = newList.indexOf(i)
        newList.splice(index, 1)
        setList(newList)
        localStorage.removeItem(i.id)
      }
    })
  }
  const getAllItems = () => {
    let items = [];
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      const value = localStorage.getItem(key)
      items.push({ id: key, time: value })
    }
    return items;
  }
  useEffect(()=>{
    if(!fetched){
      try{
        let allItems = getAllItems();
        console.log(allItems)
        setList([...allItems]);
      }
      catch(e){
        console.log(e)
      }
      setFetched(true);
    }
  })
  return (
    <>
    <div className="responsive-padding">
      <br/>
      <div className="center">
        <div>
          <button onClick={addItem} className="round-button">
            <span>Pain</span>
          </button>
        </div>
      </div>
      <br/><br/>
      <h3>Previous </h3>
      <div>
      {
        list.length > 0 ? list.map(i=> <DataRow deleteItem={(id)=>deleteItem(id)} id={i.id} time={i.time} key={Math.random()} />) : <div className="display-box"><p>No items to display</p></div>
      }
      </div>
      <br/><br/>
      <div>
        <h2><b>Pain Button by Ray Dalio</b></h2>
        <p>
          This is an example of pain button as envisioned by Ray Dalio in the book <mark className="tertiary">Principles</mark>. You can use this app to record when you're in pain and reflect on it later. The app will work offline. Cheers!
        </p>
      </div>
    </div>
    <footer className="center">
      <p>Developed by <a target="_blank" rel="noopener noreferrer" href="https://github.com/neutralboy/painbutton.github.io"><mark>neutralboy</mark></a> </p>
    </footer>
    </>
  );
}

export default App;
