import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({socket,userName,room}) => {// yaha se hi message receive or send hona socket ko is liye props kiya connection build userneme or room o b tou track krna konsa user or konsa room hai jaha baat ho rhi
  const[currentMessage,setCurrentMessage] = useState("");
  const[messageList,setMessageList] = useState([]);
  

  const sendMessage = async () => {// we make it asyn taak hmri array currentmessge wli update ho jae properly jb b mesage send ho inshort  ye function perform hony k bd we have to wait for properly update before continue forward
    if (currentMessage !== ""){
      const messageData={//object which contains info about message tht users name time on which it send on later on we pass this obj to socket inshort it is tracker which tracks info about messge 
         room : room ,// room = to props room 
         author: userName,// username by props
         message: currentMessage,//message that contains our actual mssg
         time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      };
      await socket.emit("send_message",messageData)//this to send message to server with messge infor props messagedata
      setMessageList((list)=>[...list, messageData]);// hm message bhejty jo bhej rhy wo hmri screen pr b tou show ho k ye bheja isk bgair sender ko mssg chla jata pr hmri screen pr bheja huva messge show not k kya bheja 
      setCurrentMessage("");
    }
  };

  useEffect(() => {//now frontend is going to listen messages from bcknd
    socket.on("receive_message", (data) => {
    setMessageList((list)=>[...list,data]);//pehly hmne current message list ko grab kiya means previous lkn sth hmne data b lya means new messge b add 
    })
  },[socket])//jb socket mae change it listen from frontend

  
  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>Live Chats</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
        {messageList.map((messageContent) => {
          // return <h1>{messageContent.message}</h1>//object mae hmne message likha na bs get b wohi krein gae
          return <div className='message' id={userName === messageContent.author ? "you" : "other"}>
            <div>
              <div className='message-content'>
                <p>{messageContent.message}</p>
              </div>
              <div  className='message-meta'>
                <p id='time'>{messageContent.time}</p>
                <p id='author'>{messageContent.author}</p>
              </div>
            </div>
          </div>
        })}
      </ScrollToBottom>

      </div>
      <div className='chat-footer'>
        <input type="text"
         value={currentMessage}//technically it perform same as setcurrent wla kam bcz in setcurrent we equal to value or in it we do same value = to current it do same as we write input its chnge its value but here it does is bcz we have full control over input value when we have chnge the state in await we setcurrent to empty so when message ent it also clear up from inputbox
        placeholder='Hey...'
         onChange={(event)=>{
          setCurrentMessage(event.target.value);}}
          onKeyPress={(event) => {// when user press enter it send mssg
            event.key === "Enter" && sendMessage();
          }}
          />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
      </div>
  )
}

export default Chat