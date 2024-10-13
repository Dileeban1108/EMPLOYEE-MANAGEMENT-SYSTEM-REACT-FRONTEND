import React, { Component } from "react";
import UserService from "../services/UserService"; // Adjust the path if needed

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,  // Fetching 'id' from URL parameters
      user: {},  // User object that will store name and email
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id)
      .then((res) => {
        this.setState({ user: res.data });  // Storing the API response in the state
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        alert("Could not fetch user details");
      });
  }

  render() {
    const { user } = this.state;  // Destructuring for easier access

    return (
      <div>
        <br />
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center"> Individual User Details </h3>
          <div className="card-body">
            <div className="row">
              <label> <b>Name: </b> </label>
              <div> {user.name || "Name not available"} </div>  {/* Display user name */}
            </div>
            <div className="row">
              <label> <b>Email: </b> </label>
              <div> {user.email || "Email not available"} </div>  {/* Display user email */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUserComponent;
