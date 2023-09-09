import React,{useState} from 'react';
import io from 'socket.io-client';// socket.io client to build connection server hmne console krawya na user jaise connect ho show ho ye connection is package ki wja se bna or io hi bnata connection 
import './App.css';
import Chat from './comonents/Chat';
 
const socket = io.connect("http://localhost:3001")// is mae hm frontend ko backend k sth connect kr rhy hmra server kaha run ho rha uska url diya server mae jaise backend ko frontend k sth jora tha 
function App() {
  const[userName,setUserName] = useState("");
  const[room,setRoom] = useState("");
  const[showChat,setShowChat] = useState(false);

  const joinRoom = () =>{
    if(userName !== "" && room !== ""){
      socket.emit("join_room", room); //yha room id hai jo backend ko hm pass kr rhy room k andr string aae ga jo b hai na wo dae rhy hm 
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      { !showChat ?(
       <div className="joinChatContainer">
       <h3>Join a Chat</h3>
       <input type="text" placeholder='userName...' onChange={(event) =>{setUserName(event.target.value)}}></input>
       <input type="text" placeholder='Room ID...' onChange={(event) =>{setRoom(event.target.value)}}></input>
       {/* //both user must on same room to talk with each other so write room id to enable communication */}
       <button onClick={joinRoom}>Join a room</button>  
       </div>
      )
       :(
       <Chat socket={socket} userName={userName} room={room}/>
       )
      }
          </div>
      
  );
}

export default App;
