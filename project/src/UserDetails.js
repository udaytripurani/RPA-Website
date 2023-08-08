import React, { Component } from "react";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "", // Fix the CORS issue on the server-side
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }

logout=()=>{
  window.localStorage.clear();
  window.location.href="/";
};

  render() {
    return (
      <div>
        <h1>Name: {this.state.userData.fname}{this.state.userData.lname}</h1>
        <h1>Email: {this.state.userData.email}</h1>
        <h1>usertype:{this.state.userData.userType}</h1>
        <button onClick={this.logout}>logout</button>
      </div>
    );
  }
}
