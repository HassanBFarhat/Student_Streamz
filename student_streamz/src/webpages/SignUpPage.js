
function SignUpPage() {
    return (
        <>
            <h1>Sign Up Page</h1>
            <label>First Name:</label>
            <input type="Text"></input>
            <br />
            <label>Last Name:</label>
            <input type="Text"></input>
            <br />
            <label>Birthday:</label>
            <input type="Date"></input>
            <br />
            <label>Gender:</label>
            <select>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <br />
            <label>Username:</label>
            <input type="Text"></input>
            <br />
            <label>Password:</label>
            <input type="Password"></input>
            <br />
            <label>Re-Enter Password:</label>
            <input type="Password"></input>
            <br />
            <button>Create Account</button>
            <br />
            <p><a href="#/login">If you already have an account, please Click Here to Login</a></p>
        </>
    );
}

export default SignUpPage;