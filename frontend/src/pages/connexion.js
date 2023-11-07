import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
import './css/styles.css';
import Axios from 'axios'; //npm install axios au tout premier dossier parent Tp2_App...M
import PropTypes from 'prop-types';
Axios.defaults.withCredentials = true;


    

function Connexion(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msgErreur, setMsgErreur] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        //eviter que le form refresh
        event.preventDefault();

        const userData = {
            username: username,
            password: password
        }

        Axios.post('https://cute-gold-horse-suit.cyclic.app/api/connexion', userData)
            .then(response => {
                if (response.data.token!==undefined) {
                    //set le token associé à cette session 
                    localStorage.setItem("token",response.data.token)
                    setUsername(userData.username);
                    setPassword(userData.password);
                    setMsgErreur("");
                    console.log("succes connexion")
                    remonterState();     
                } else {
                    setMsgErreur("Nom d'utilisateur ou mot de passe incorrect.");
                    console.log("Nom d'utilisateur ou mot de passe incorrect.")
                }
            })
            .catch(error => {
                console.log(error)
                if(error){
                    setMsgErreur("Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.");
                    console.log("Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.");
                }
                else{
                    console.log("Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.");
                }    
            });
    };

    const remonterState = ()=>{
        props.functionRemonteLeUser(username);
        props.functionRemonteLePass(password);
        
        console.log("navigate")
        navigate("/calendrier");
        //window.location.reload();

    }

    return (
        <div className="inscription-container">
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
            {msgErreur}
        </div>
    );
}

Connexion.propTypes = {
    functionRemonteLeUser: PropTypes.func,
    functionRemonteLePass: PropTypes.func,
  };

export default Connexion;
