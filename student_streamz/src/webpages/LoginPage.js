import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import "../Login&SignUpPage.css";

function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                console.log("*****Login Successful!*****");
                alert("*****Login Successful!*****");
                // Redirect to the home page
                navigate(`/${encodeURIComponent(username)}`); 
            } else {
                const data = await response.json();
                console.log(`There was an error logging in. ${data.error}`);
                alert("There was an error logging in.");
            }
        } catch (err) {
            console.error("There was an error during the login process. Please try again.");
            alert("There was an error during the login process. Please try again.");
        }
    };

    return (
        <>
            <br />
            <h2>Please Enter Username and Password if you already have an Account to Login</h2>
            <div className="login-container">
                <label id="username">Username:</label>
                <input id="usernameInput" type="Text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <br />
                <label id="password">Password:</label>
                <input id="passwordInput" type="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <br />
                <button onClick={handleLogin}>Sign In</button>
                <br />
                <br />
                <br />
                <br />
                <p><a href="#/sign_up">or Click Here to Sign Up</a></p>
            </div>
        </>
    );
}

export default LoginPage;