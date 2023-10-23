import React, {useState} from 'react';
import axios from 'axios'; //npm install axios au tout premier dossier parent Tp2_App...M

function Connexion() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msgErreur, setMsgErreur] = useState('');
    const handleLogin = () => {

        const userData = {
            username: username,
            password: password
        }

        axios.post('/api/connexion', userData)
            .then(response => {
                if (response.data.success) {
                    // changement vers calandrier // trouver un moyen
                    window.location.href = '/calendrier.js';
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
            <h1>Se connecter</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br/>
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br/>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Connexion;
