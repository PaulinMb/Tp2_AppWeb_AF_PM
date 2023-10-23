import React from 'react';
import Inscription from './pages/inscription';
import Accueil from './pages/accueil';
import Connexion from './pages/connexion';

import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";


function App() {
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
                </div>
                <Routes>
                    <Route exact path="/" element={<Accueil/>}/>
                    <Route exact path="/inscription" element={<Inscription/>}/>
                    <Route exact path="/connexion" element={<Connexion/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
