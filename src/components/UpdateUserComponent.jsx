import React, { Component } from "react";
import UserService from "../services/UserService"; // Make sure the path is correct

class UpdateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
      email: "",
    };

    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      let user = res.data;
      this.setState({
        name: user.name,
        email: user.email,
      });
    }).catch(error => {
      console.error("Error fetching user data:", error);
      alert("Could not retrieve user data");
    });
  }

  updateUser = (e) => {
    e.preventDefault();

    let user = {
      name: this.state.name,
      email: this.state.email,
    };
    console.log("user => " + JSON.stringify(user));

    UserService.updateUser(user, this.state.id).then((res) => {
      this.props.history.push("/users");
    }).catch(error => {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    });
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  cancel() {
    this.props.history.push("/users");
  }

  render() {
    return (
      <div>
        <br />
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3">
              <h3 className="text-center">Update User</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Name: </label>
                    <input
                      placeholder="Name"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.changeNameHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email: </label>
                    <input
                      placeholder="Email Address"
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                    />
                  </div>

                  <button className="btn btn-success" onClick={this.updateUser}>
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateUserComponent;
