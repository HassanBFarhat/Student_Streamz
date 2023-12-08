import "../Login&SignUpPage.css";

function LoginPage() {
    return (
        <>
            <br />
            <h2>Please Enter Username and Password if you already have an Account to Login</h2>
            <div className="login-container">
                <label id="username">Username:</label>
                <input id="usernameInput" type="Text"></input>
                <br />
                <label id="password">Password:</label>
                <input id="passwordInput" type="Password"></input>
                <br />
                <button>Sign In</button>
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