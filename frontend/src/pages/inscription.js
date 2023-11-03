// Inscription.js
import React, { useState } from 'react';
import axios from 'axios';

function Inscription() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (event) => {
        event.preventDefault()

        const userData = {
            username: username,
            password: password
        }

        axios.post('/api/connexion', userData)
            .then(response => {
                if (response.data.success) {
                    window.location.href = '/accueil.js';
                } else {
                    const  message= "\"Nom d'utilisateur ou mot de passe incorrect.\"";
                    console.log(message)
                    //setMsgErreur();
                }
            })
            .catch(error => {
                const  message= "\"Nom d'utilisateur ou mot de passe incorrect.\"";
                console.log("Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.")
                //setMsgErreur("Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.");
            });
    };

    return (
        <div>
            <h1>Inscription</h1>
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button onClick={handleLogin} type="submit">S'inscrire</button>
        </div>
    );
}

export default Inscription;
