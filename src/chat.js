import {Avatar,IconButton} from '@material-ui/core';
import {AttachFile,MoreVert,SearchOutlined} from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import React,{ useState,useEffect } from "react";
import {useParams} from "react-router-dom";
import db from './firebase.js';
import './chat.css';
import {useStateValue} from './StateProvider';
import firebase from 'firebase';
 

function Chat(){

    const [input,setInput] = useState("");
    const { roomId } = useParams();
    const [roomName,setRoomName] = useState();
    const [messages,setMessages] = useState([]);
    const [{user},dispatch] = useStateValue();

    useEffect(() =>{
       if(roomId){
           db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(setRoomName(snapshot.data().name)))
           db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp',
           'asc').onSnapshot(snapshot=>(setMessages(snapshot.docs.map(doc=>doc.data()))))
       }
    },[roomId]);
   

    const sendMessage = (e) =>{
     e.preventDefault();
     db.collection('rooms').doc(roomId).collection('messages').add(
         {
         message:input,
         name:user.displayName,
         timestamp:firebase.firestore.FieldValue.serverTimestamp(),
         
         });
     setInput("")
     
    };

    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar/>
            
            <div className="chat__headerinfo">
                <h2>{roomName}</h2>
                last seen  {""}
                {new Date(
                  messages[messages.length-1]?.timestamp?.toDate()
                ).toUTCString()}
                
            </div>

            <div className="chat__headerright">
            <IconButton>
           <AttachFile/>
           </IconButton>
            <IconButton>
           <MoreVert/>
           </IconButton>
            <IconButton>
           <SearchOutlined/>
           </IconButton>
            </div>

            </div>
            <div className="chat__body">
                {messages.map(message=>(
                               <p className={`chat__message
                               ${ message.name===user.displayName && 'chat__reciever'}`}>
                              <span className="chat__name">{message.name}</span>
                              {message.message}
                              <span className="chat__timestamp">
                              {new Date(message.timestamp?.toDate()).toUTCString()}
                              </span>
                              </p>
                ))}

            </div>
            <div className="chat__fotter">
            <IconButton>
            <InsertEmoticonIcon/>
            </IconButton>
            <form>
                <input  value={input}  onChange={(e)=>setInput(e.target.value)} placeholder="Type a message" type="text"/>
                <button onClick={sendMessage} type="submit"></button>
            </form>
            <IconButton>
            <MicIcon/>
            </IconButton>

            </div>
        </div>
    )
}

export default Chat;
