import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import "../Login&SignUpPage.css";

function SignUpPage() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const navigate = useNavigate();

    // Handles the response to user when trying to register with our website 
    const handleRegistration = async () => {
        try {
            const response = await fetch(`http://localhost:3001/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({firstName, lastName, birthday, gender, username, password}),
            });

            if (response.ok) {
                alert("*****Registration Successful!*****");
                // Redirect to the home page
                navigate(`/${encodeURIComponent(username)}`); 
            } else if (password !== reEnteredPassword) {
                alert("*****Passwords Dont match, please enter again correctly and submit once again.*****");
            } else {
                const data = await response.json();
                alert(`*****Registration Failed: ${data.error}*****`);
            }
        } catch (err) {
            alert("*****There was an error during the registration process. Please try again.*****");
        }
    };

    return (
        <>
            <br />
            <h2>Please Enter All the Available Information in Order to Create an Account </h2>
            <div className="sign-up-container">
                <label id="first-name">First Name:</label>
                <input id="first-name-input" type="Text" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                <br />
                <label id="last-name">Last Name:</label>
                <input id="last-name-input" type="Text" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                <br />
                <label id="birthday">Birthday:</label>
                <input id="birthday-input" type="Date" value={birthday} onChange={(e) => setBirthday(e.target.value)}></input>
                <br />
                <label id="gender">Gender:</label>
                <select id="gender-input" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <br />
                <label id="username2">Username:</label>
                <input id="username2-input" type="Text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <br />
                <label id="password2">Password:</label>
                <input id="password2-input" type="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <br />
                <label id="re-entered-password">Re-Type Password:</label>
                <input id="re-entered-password-input"type="Password" value={reEnteredPassword} onChange={(e) => setReEnteredPassword(e.target.value)}></input>
                <br />
                <button onClick={handleRegistration}>Create Account</button>
                <br />
                <br />
                <br />
                <br />
                <p><a href="#/login">If you already have an account, please Click Here to Login</a></p>
            </div>
        </>
    );
}

export default SignUpPage;