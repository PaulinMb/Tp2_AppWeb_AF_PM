import React, {useState} from 'react';
import useHistory, {Link} from 'use-history'
import axios from 'axios';

function Connexion() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const handleLogin = () => {

        const userData = {
            username: username,
            password: password
        }

        axios.post('/api/connexion', userData)
            .then(response => {
                if (response.data.success) {

                }
            })

    };

    const handleClick = () =>{
        history.push('/calendrier');
    }

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
                <button type="submit" onClick={handleClick}>Se connecter</button>
            </form>
        </div>
    );
}

export default Connexion;
