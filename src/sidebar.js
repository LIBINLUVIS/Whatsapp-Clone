import React,{ useState,useEffect } from "react";
import './sidebar.css';
import Sidebarchat from './Sidebarchat.js'
import { Avatar,IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {SearchOutlined} from '@material-ui/icons';
import db from "./firebase.js";
import {useStateValue} from './StateProvider';


function Sidebar(){

    const [rooms,setRooms]=useState([]);
    const [{user},dispatch] = useStateValue();

    useEffect(() =>{

        const unsubscribe=db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => 
               
            ({
                id:doc.id,
                data:doc.data(),

            })
          ))
        ))
        return () =>{
            unsubscribe();
        }
    },[]);

   



    return (
        <div className="sidebar">
        <div className="sidebar-header">
        <Avatar src={user?.photoURL} />

        
        <div className="sidebar-headerRight">
        <IconButton>
        <DonutLargeIcon/>
        </IconButton>
        <IconButton>
        <ChatIcon/>
        </IconButton>
        <IconButton>
        <MoreVertIcon/>
        </IconButton>
        

        </div>
        </div>

        <div className="sidebar-search">

        <div className="sidebar__searchContainer">
          <SearchOutlined/>
        <input placeholder="Search or Start a new Chat" type="text">
        </input>

        </div>

        </div>

        <div className="sidebar-chat">
            <Sidebarchat addNewChat/>
           {rooms.map((room)=>(
               <Sidebarchat key={room.id} id={room.id}
               name={room.data.name}/>
           ))}
        </div>

        </div>
    );
}

export default Sidebar