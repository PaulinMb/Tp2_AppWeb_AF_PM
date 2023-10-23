import React, { useState } from 'react';

function Connexion() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Gérer la soumission du formulaire ici
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
