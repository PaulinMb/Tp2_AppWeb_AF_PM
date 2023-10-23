// Inscription.js
import React, { useState } from 'react';

function Inscription() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Gérez la soumission du formulaire ici

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
