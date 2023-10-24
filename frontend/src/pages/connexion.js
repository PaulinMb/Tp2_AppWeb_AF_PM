import React, {useState} from 'react';
import Axios from 'axios'; //npm install axios au tout premier dossier parent Tp2_App...M
Axios.defaults.withCredentials = true;

function Connexion(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msgErreur, setMsgErreur] = useState('');

    const handleLogin = () => {

        const userData = {
            username: username,
            password: password
        }

        Axios.post('http://localhost:5000/api/connexion', userData)
            .then(response => {
                if (response.data.estLoggedIn==true) {
                    // changement vers calandrier // trouver un moyen
                    //window.location.href = '/calendrier.js';
                    props.functionRemonteLeState(response.data.estLoggedIn)
                    console.log("response.data")
                } else {
                    setMsgErreur("Nom d'utilisateur ou mot de passe incorrect.");
                    console.log("Nom d'utilisateur ou mot de passe incorrect.")
                }
            })
            .catch(error => {
                setMsgErreur("Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.");
                console.log("Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.")
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
            <button onClick={handleLogin}>api call</button> 
        </div>
    );
    //<button onClick={handleLogin}>api call</button> boutton temporaire pour tester éviter refresh react
}

export default Connexion;
