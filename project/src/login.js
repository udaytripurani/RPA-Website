import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          window.location.href = "./userDetails";
        }
      });
  }

  return (
    <div className="auth-wrapper" style={styles.authWrapper}>
      <div className="auth-inner" style={styles.authInner}>
        <h2 style={styles.heading}>RPA Core Members Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3" style={styles.inputContainer}>
            <label style={styles.label}>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div className="mb-3" style={styles.inputContainer}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordIcon}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" style={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>

        <p style={styles.forgotPassword}>
          Forgotten password? Please contact the club president.
        </p>
      </div>
    </div>
  );
}

// Inline styles object
const styles = {
  authWrapper: {
    fontFamily: "Poppins, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "hsl(218, 50%, 91%)",
    height: "100vh",
  },
  authInner: {
    background: "hsl(213, 85%, 97%)",
    padding: "1.5em",
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    boxShadow: "0 0 2em hsl(231, 62%, 94%)",
    gap: "1.5em",
    width: "80%",
    maxWidth: "400px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "0.5em",
    fontFamily: "Poppins, sans-serif",
  },
  inputContainer: {
    background: "hsl(0, 0%, 100%)",
    boxShadow: "0 0 2em hsl(231, 62%, 94%)",
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    borderRadius: "12px",
    color: "hsl(0, 0%, 30%)",
     marginTop: "1em",
  },
  passwordInputContainer: {
    position: "relative",
  },
  label: {
    marginBottom: "0.5em",
    fontFamily: "Poppins, sans-serif",
  },
  input: {
    outline: "none",
    border: "none",
    "&::placeholder": {
      color: "hsl(0, 0%, 0%)",
      fontSize: "0.9em",
    },
    padding: "0.8em",
    borderRadius: "8px",
    boxShadow: "0 0 2px hsl(231, 62%, 94%)",
    margin: "0.5em 0",
  },
  passwordIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "hsl(0, 0%, 30%)",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    fontSize: "0.9em",
    fontWeight: "600",
  },
  checkboxContainer: {
    marginBottom: "1em",
  },
  checkboxInput: {
    marginRight: "-5em",
  },
  checkboxLabel: {
    color: "hsl(0, 0%, 30%)",
  },
  submitButton: {
    padding: "1em",
    background: "hsl(233, 36%, 38%)",
    color: "hsl(0, 0%, 100%)",
    border: "none",
    borderRadius: "30px",
    fontWeight: "600",
    marginLeft: "150px",
    marginTop: "10px",
  },
  forgotPassword: {
    fontSize: "0.7em",
    color: "hsl(0, 0%, 37%)",
    paddingBottom: "1em",
    fontFamily: "Poppins, sans-serif",
  },
};
