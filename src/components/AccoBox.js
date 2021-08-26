import React, { useState } from 'react';
import Light from '../light';

export default function AccoBox(props) {

  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("off");

  const [text, setText] = useState("방");
  const [editMode, setEditMode] = useState(false);

  const [no, setNo] = useState(0);

  setNo(props.no);
  if(props.text !== null | undefined) {
    setText(props.text); 
  }
  setState(Light.getStatus(props.no));

  const changeState = () => {
    if (state === "on") {
      setState("off")
      Light.turnOff(no);
    } else {
      setState("on")
      Light.turnOn(no);
    }
  }

  const handleChange = (e) => {
    let changeText = e.target.value
    setText(changeText)
  }

  const enterChange = (event) => {
    event.preventDefault();
    setEditMode(!editMode)
  }
  
// Refresh the status of the light each a minute.
  const refresh = () => {
    setState(Light.getStatus(no));
  }
  setInterval(refresh, 60000);

  return(
    <div >
      <div className="accordion-header" onClick={()=>setIsOpen(!isOpen)}>
        <div className="acco-header-inner">
          {console.log("스테이트 값?????", state)}
          {state === "on" ?
            <img className="acco-header-img" src="/img/light-on.svg" alt=""/>
            :
            <img className="acco-header-img" src="/img/light-off.svg" alt=""/>
          }
        
          <form onSubmit={enterChange}>
            <span style={{marginLeft:20, textAlign:'start' }}>
              {editMode === false ?
                <span>{text}</span>
                :
                <input className="room-name-style" type="text" maxLength="5" value={text} onChange={(e) => handleChange(e)} /> 
              }
            </span>
          </form>

            <span>
              {editMode === false ?
                <img className="acco-pen-img" src="/img/연필.png" onClick={()=>setEditMode(!editMode)} alt=""/>
              :
                <span className="acco-pen-img" onClick={()=>{setEditMode(!editMode)}}>저장</span>
              }
            </span>
          
          
          <span className="acco-header-icon"> {isOpen ? '∧' : '∨'} </span>
        </div>         
      </div>

      {isOpen && (
        <div className="accordion-body">
          {state === "on" ?
            <button className="buttonStyle" onClick={changeState}>
              <img className="toggle_icon" src="/img/toggle-on.svg" alt=""/>
              <span style={{marginLeft:15, fontSize:15, margin:10, flex:1, color:"blue"}}>ON</span> 
            </button>
          :
            <button className="buttonStyle" onClick={changeState}>
              <img className="toggle_icon" src="/img/toggle-off.svg" alt=""/>
              <span style={{marginLeft:15, fontSize:15, margin:10, flex:1 }}>OFF</span>
            </button>
          }
        </div>
      )}
    </div>

  );
}