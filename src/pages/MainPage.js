import React, { useState } from 'react';

import AccoBox from '../components/AccoBox';

export default function MainPage() {

  const [roomList, setRoomList] = useState([
    <AccoBox no="1"/>,
    <AccoBox no="2"/>,
    <AccoBox no="3"/>,
    <AccoBox no="4"/>,
  ]);

  const addRoom = () => {
    let nextRoom = [...roomList, <AccoBox />]
    setRoomList(nextRoom)
  }
  return(
    <div>
      <div>
        <h1 class="title">Home Light Controller</h1>
      </div>
      <div>
        {roomList}
      </div>
      <div>
        <button style={{height:30, width:80, marginTop:60, background:'#fff'}} onClick={()=>addRoom()}>추가하기</button>
      </div>
    </div>
  );
}




