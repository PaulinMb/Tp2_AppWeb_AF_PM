import React, { useState } from 'react';
import Axios from "axios";
Axios.defaults.withCredentials = true;


function Inscription() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleInscription = (event) => {
        event.preventDefault();

        const userData = {
            username: username,
            password: password
        }

        Axios.post('http://localhost:5000/api/inscription', userData)
            .then(response => {
                setUsername(userData.username);
                setPassword(userData.password);
                console.log("succes inscription")
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de l'inscription.", error);
            });
    };

    return (
        <div>
            <h1>Inscription</h1>
            <form onSubmit={handleInscription}>
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                />
                <br />
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
                <br />
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default Inscription;
