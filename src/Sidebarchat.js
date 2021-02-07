import React,{useState,useEffect} from 'react'
import './Sidebarchat.css';
import { Avatar} from '@material-ui/core';
import db from "./firebase.js";
import {Link} from "react-router-dom";
function Sidebarchat({id,name,addNewChat}) {
const [messages,setMessages] = useState("");
    useEffect(()=>{
        if (id){

            db.collection('rooms').doc(id).collection('messages').orderBy("timestamp","desc").onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc)=>
            doc.data())));
        }
    },[id]);
const CreateChat=()=>{
    const roomName=prompt("Enter the name of your new chat room");
    if(roomName){
       db.collection('rooms').add({name:roomName});
    }
    
};

    return !addNewChat ?(
        <Link to={`/rooms/${id}`}>
        <div className="sidebarchat">
       <Avatar 
       />
       <div className="sidebarchat__info">
           <h2>{name}</h2>
           <p>{messages[0]?.message}</p>
       </div>
            
        </div>
        </Link>

    ):(
        <div onClick={CreateChat} className="sidebarchat">
            <h2>Add new chat room</h2>
        </div>
    );
}

export default Sidebarchat
