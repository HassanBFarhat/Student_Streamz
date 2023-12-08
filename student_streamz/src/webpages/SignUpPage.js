import "../Login&SignUpPage.css";

function SignUpPage() {
    return (
        <>
            <br />
            <h2>Please Enter All the Available Information in Order to Create an Account </h2>
            <div className="sign-up-container">
                <label id="first-name">First Name:</label>
                <input id="first-name-input"type="Text"></input>
                <br />
                <label id="last-name">Last Name:</label>
                <input id="last-name-input" type="Text"></input>
                <br />
                <label id="birthday">Birthday:</label>
                <input id="birthday-input" type="Date"></input>
                <br />
                <label id="gender">Gender:</label>
                <select id="gender-input">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <br />
                <label id="username2">Username:</label>
                <input id="username2-input" type="Text"></input>
                <br />
                <label id="password2">Password:</label>
                <input id="password2-input" type="Password"></input>
                <br />
                <label id="re-entered-password">Re-Type Password:</label>
                <input id="re-entered-password-input"type="Password"></input>
                <br />
                <button>Create Account</button>
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