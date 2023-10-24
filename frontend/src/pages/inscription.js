// Inscription.js
import React, { useState } from 'react';
import axios from 'axios';

function Inscription() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setMsgErreur] = useState('');

    const handleLogin = () => {

        const userData = {
            username: username,
            password: password
        }

        axios.post('/api/connexion', userData)
            .then(response => {
                if (response.data.success) {
                    window.location.href = '/accueil.js';
                } else {
                    setMsgErreur("Nom d'utilisateur ou mot de passe incorrect.");
                }
            })
            .catch(error => {
                setMsgErreur("Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.");
            });
    };

    return (
        <div>
            <h1>Inscription</h1>
            <form>
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
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default Inscription;
