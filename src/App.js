import React,{ useState} from 'react';
import './App.css';
import Sidebar from './sidebar.js';
import Chat from './chat.js';
import Login from './Login.js';
import {BrowserRouter as  Router ,Switch,Route} from "react-router-dom";
import {useStateValue} from './StateProvider';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();
function App() { 
  const [{user},dispatch] = useStateValue();
  
  return (
    
    <div className="App">
      {!user ?(
        toast("Please Ensure you are using PC this whatsapp is designed for PC it is not responsive with mobile devices"),
        <Login/>
      ):(
        <div className="app__body">
        <Router>
        <Sidebar/>
          <Switch> 
            <Route path="/rooms/:roomId">
            
            
              <Chat/>
              
            </Route>
            <Route path="/">
              <Chat />
              
            </Route>
          </Switch>
        </Router>
      </div>
     )}

    </div>
  );
}


export default App;



