
function LoginPage() {
    return (
        <>
            <h1>Login Page</h1>
            <label>Username:</label>
            <input type="Text"></input>
            <br />
            <label>Password:</label>
            <input type="Password"></input>
            <br />
            <button>Sign In</button>
            <br />
            <p><a href="#/sign_up">or Click Here to Sign Up</a></p>
        </>
    );
}

export default LoginPage;