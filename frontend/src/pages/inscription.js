import React, { useState } from 'react';
import './css/styles.css';
import Axios from "axios";
Axios.defaults.withCredentials = true;


function Inscription() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message,setMessage] = useState('');

    const handleInscription = (event) => {
        event.preventDefault();

        const userData = {
            username: username,
            password: password
        }

        Axios.post('https://cute-gold-horse-suit.cyclic.app/api/inscription', userData)
            .then(response => {
                console.log(response.status)
                if(response.status===200){
                    console.log("succes inscription");
                    setMessage("Succes inscription");
                    setPassword("");
                    setUsername("");
                }else{
                    console.log("Erreur inscription");
                    setMessage("Erreur inscription");   
                }
            })
            .catch(error => {
                setMessage("Une erreur s'est produite lors de l'inscription.");
                console.error("Une erreur s'est produite lors de l'inscription.", error);
            });
    };

    return (
        <div className="inscription-container">
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
            {message}
        </div>
    );
}

export default Inscription;
