import React, { useState } from "react";

export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleSubmit = (e) => {
    if (userType === "Admin" && secretKey !== "AdarshT") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();

      console.log(fname, lname, email, password);
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          email,
          lname,
          password,
          userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status === "ok") {
            alert("Registration Successful");
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  return (
    <div className="auth-wrapper" style={styles.authWrapper}>
      <div className="auth-inner" style={styles.authInner}>
        <form onSubmit={handleSubmit}>
          <h2 style={styles.heading}>Sign Up</h2>
          <div style={styles.radioContainer}>
            Register As
            <input
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
              style={styles.radioInput}
            />
            User
            <input
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
              style={styles.radioInput}
            />
            Admin
          </div>
          {userType === "Admin" ? (
            <div className="mb-3" style={styles.inputContainer}>
              <label style={styles.label}>Secret Key</label>
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
                style={styles.input}
              />
            </div>
          ) : null}

          <div className="mb-3" style={styles.inputContainer}>
            <label style={styles.label}>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
              style={styles.input}
            />
          </div>

          <div className="mb-3" style={styles.inputContainer}>
            <label style={styles.label}>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
              style={styles.input}
            />
          </div>

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
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" style={styles.submitButton}>
              Sign Up
            </button>
          </div>
          <p style={styles.forgotPassword}>
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}


const styles = {
  authWrapper: {
    fontFamily: "Poppins, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "hsl(218, 50%, 91%)",
    height: "140vh",
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
    marginTop: "10px", // Update the marginTop value here
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "0.5em",
    fontFamily: "Poppins, sans-serif",
  },
  radioContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1em",
    fontFamily: "Poppins, sans-serif",
  },
  radioInput: {
    marginLeft: "0.5em",
    marginRight: "1em",
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