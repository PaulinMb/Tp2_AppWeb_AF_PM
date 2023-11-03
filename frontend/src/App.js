import React,{useState,useEffect} from 'react';
import Inscription from './pages/inscription';
import Accueil from './pages/accueil';
import Connexion from './pages/connexion';
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import Calendrier from "./pages/calendrier";
import Axios from 'axios'; //npm install axios au tout premier dossier parent Tp2_App...M
Axios.defaults.withCredentials = true;

function App() {
    let [username,setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [isConnected,setConnected] = useState(false)

    //lancer à chaque render pour valider le token du user (called whenever the component re-renders due to a change in state or props.)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          // envoi le token pour autentifié user
          authenticateUserWithToken();
        }
      }, []);

    const authenticateUserWithToken = () => {
        let tokenString = localStorage.getItem("token");
        const params  = {
            token : tokenString
        }
        Axios.get("http://localhost:5000/api/getToken",{ params: params }).then(response => {
            //console.log(response.data);
            setConnected(response.data.isConnected)
        }).catch(err=>{

        })
    };

    const handleLogout = () => {
        // Clear le token du localstorage
        localStorage.removeItem('token');
        //setUser(null);
    };

    return (
        <div>
            <BrowserRouter>
                <div style={{
                    display: "flex",
                    background: '#333',
                    padding: '5px 0 5px 5px',
                    fontSize: '15px',
                }}>
                    <div style={{margin: '15px'}}>
                        <NavLink to="/" style={({isActive}) => ({
                            color: isActive ? '#333' : '#999',
                            background: isActive ? 'white' : '#333',
                            padding: "15px",
                            textDecoration: 'none'
                        })}>
                            Accueil
                        </NavLink>
                    </div>
                    <div style={{margin: '15px'}}>
                        <NavLink to="/inscription" style={({isActive}) => ({
                            color: isActive ? '#333' : '#999',
                            background: isActive ? 'white' : '#333',
                            padding: "15px",
                            textDecoration: 'none'
                        })}>
                            Inscription
                        </NavLink>
                    </div>
                    <div style={{margin: '15px'}}>
                        <NavLink to="/connexion" style={({isActive}) => ({
                            color: isActive ? '#333' : '#999',
                            background: isActive ? 'white' : '#333',
                            padding: "15px",
                            textDecoration: 'none'
                        })}>
                            Connexion
                        </NavLink>
                    </div>
                    { isConnected ? 
                    (<div style={{margin: '15px'}}>
                        <NavLink to="/calendrier" style={({isActive}) => ({
                            color: isActive ? '#333' : '#999',
                            background: isActive ? 'white' : '#333',
                            padding: "15px",
                            textDecoration: 'none'
                        })}>
                            Calendrier
                        </NavLink>
                    </div>) : null
                    }
                </div>
                <Routes>
                    <Route exact path="/" element={<Accueil/>}/>
                    <Route exact path="/inscription" element={<Inscription/>}/>
                    <Route exact path="/connexion" element={<Connexion functionRemonteLeUser={setUsername} functionRemonteLePass={setPassword} />}/>  
                    <Route exact path="calendrier/" element={<Calendrier />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
